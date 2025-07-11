# Testing Instructions for GLAM BY RAMDIAH Backend

## Prerequisites
- Node.js installed
- Dependencies installed (`npm install`)
- `.env` file configured with Twilio credentials
- Backend server running (`npm start` or `npm run start-ngrok`)

## 1. Critical-Path Testing

### Test POST /api/order with valid data
```bash
curl -X POST http://localhost:3001/api/order \
-H "Content-Type: application/json" \
-d '{
  "name": "Test User",
  "email": "test@example.com",
  "phone": "+1234567890",
  "service": "Makeup",
  "region": "Jakarta",
  "date": "2025-07-15",
  "message": "Please confirm availability."
}'
```
- Expect HTTP 200 response with message confirming order received.
- Check orders.json file for the new order entry.
- Verify WhatsApp notifications sent to configured recipients.

### Test POST /api/order with missing required fields
```bash
curl -X POST http://localhost:3001/api/order \
-H "Content-Type: application/json" \
-d '{}'
```
- Expect HTTP 400 response with error about missing required fields.

## 2. Thorough Testing

### Test edge cases
- Invalid phone number format
- Empty strings for required fields
- Large payloads
- Special characters in message

### Test Twilio failure handling
- Temporarily set invalid Twilio credentials in `.env`
- Send order and verify HTTP 500 response with error message

## 3. Environment Variable Verification

- Confirm `TWILIO_ACCOUNT_SID` and `TWILIO_AUTH_TOKEN` are loaded by the server.
- Check logs for any errors related to Twilio client initialization.

## 4. Ngrok Exposure

- Run `npm run start-ngrok`
- Note the public URL provided by ngrok
- Use the public URL to send POST requests to `/api/order`
- Verify the backend behaves as expected via the public URL

## 5. Dynamic Port Listening

- Set environment variable `PORT` to a custom value (e.g., 4000)
- Start the server and confirm it listens on the specified port
- Send requests to the custom port and verify functionality

---

Please run these tests and let me know if you encounter any issues or need further assistance.
