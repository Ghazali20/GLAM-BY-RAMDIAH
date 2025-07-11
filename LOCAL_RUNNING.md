# Running Backend Locally Without Ngrok

If you prefer to run the backend server locally without exposing it via ngrok, follow these steps:

1. Ensure Node.js is installed.
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with your Twilio credentials:
   ```
   TWILIO_ACCOUNT_SID=your_account_sid
   TWILIO_AUTH_TOKEN=your_auth_token
   ```
4. Start the backend server:
   ```
   npm start
   ```
5. The server will run on port 3001 (or the port specified in the `PORT` environment variable).
6. Access the backend API at `http://localhost:3001/api/order`.

---

# Using Ngrok with Configuration File

To run ngrok with the configuration file (`ngrok.yml`) for multiple tunnels:

1. Start your backend server:
   ```
   npm start
   ```
2. In a separate terminal, start ngrok with the config file:
   ```
   ngrok start --all --config ngrok.yml
   ```
3. Ngrok will provide public URLs for the tunnels defined in `ngrok.yml`.

This setup allows multiple tunnels without hitting the simultaneous session limit.
