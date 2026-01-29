import json
import os
import traceback
from http.server import BaseHTTPRequestHandler
import gspread
from google.oauth2.service_account import Credentials

SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
SHEET_ID = '1i_FLokJ1SIj6kUJLKOuoZq654HHvha7F2d9U8PI2hSg'

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))

            # Parse Cal.com webhook data
            payload = data.get('payload', {})
            responses = payload.get('responses', {})
            attendees = payload.get('attendees', [{}])

            # Get email to find the row
            email = responses.get('email', {}).get('value') or attendees[0].get('email', '')

            if not email:
                raise Exception('No email found in webhook payload')

            # Authenticate with Google Sheets
            creds_json = os.environ.get('GOOGLE_CREDENTIALS')
            if not creds_json:
                raise Exception('GOOGLE_CREDENTIALS environment variable not set')

            creds_dict = json.loads(creds_json)
            creds = Credentials.from_service_account_info(creds_dict, scopes=SCOPES)
            client = gspread.authorize(creds)

            # Find and update the row
            spreadsheet = client.open_by_key(SHEET_ID)
            sheet = spreadsheet.sheet1

            # Find the row with this email (column B)
            cell = sheet.find(email, in_column=2)

            if cell:
                # Update status column (F) to "No-Show"
                sheet.update_cell(cell.row, 6, 'No-Show')
                result = f'Updated row {cell.row} to No-Show'
            else:
                result = f'No row found for email: {email}'

            # Success response
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            response = {
                'success': True,
                'email': email,
                'result': result
            }
            self.wfile.write(json.dumps(response).encode())

        except Exception as e:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            error_msg = f'{type(e).__name__}: {str(e)}\n{traceback.format_exc()}'
            self.wfile.write(json.dumps({'error': error_msg}).encode())

    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps({
            'status': 'Cal.com no-show webhook endpoint ready'
        }).encode())
