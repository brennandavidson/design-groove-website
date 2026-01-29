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

            name = responses.get('name', {}).get('value') or attendees[0].get('name', '')
            email = responses.get('email', {}).get('value') or attendees[0].get('email', '')
            phone = responses.get('smsReminderNumber', {}).get('value', '')
            booking_time = payload.get('startTime', '')
            booked_at = data.get('createdAt', '')
            status = 'Booked'

            # Authenticate with Google Sheets
            creds_json = os.environ.get('GOOGLE_CREDENTIALS')
            if not creds_json:
                raise Exception('GOOGLE_CREDENTIALS environment variable not set')

            try:
                creds_dict = json.loads(creds_json)
            except json.JSONDecodeError as e:
                raise Exception(f'Invalid JSON in GOOGLE_CREDENTIALS: {str(e)}')

            creds = Credentials.from_service_account_info(creds_dict, scopes=SCOPES)
            client = gspread.authorize(creds)

            # Append to sheet
            spreadsheet = client.open_by_key(SHEET_ID)
            sheet = spreadsheet.sheet1
            result = sheet.append_row([name, email, phone, booking_time, booked_at, status])

            # Success response
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            response = {
                'success': True,
                'data': {'name': name, 'email': email},
                'sheet_title': spreadsheet.title,
                'sheet_url': spreadsheet.url,
                'append_result': str(result)
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
        # Check if credentials are set
        creds_set = bool(os.environ.get('GOOGLE_CREDENTIALS'))
        self.wfile.write(json.dumps({
            'status': 'Cal.com webhook endpoint ready',
            'credentials_configured': creds_set
        }).encode())
