import json
import os
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
                raise Exception('GOOGLE_CREDENTIALS not set')

            creds_dict = json.loads(creds_json)
            creds = Credentials.from_service_account_info(creds_dict, scopes=SCOPES)
            client = gspread.authorize(creds)

            # Append to sheet
            sheet = client.open_by_key(SHEET_ID).sheet1
            sheet.append_row([name, email, phone, booking_time, booked_at, status])

            # Success response
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'success': True}).encode())

        except Exception as e:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'error': str(e)}).encode())

    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps({'status': 'Cal.com webhook endpoint ready'}).encode())
