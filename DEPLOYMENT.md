# Deployment Instructions for GLAM BY RAMDIAH Backend

## Temporary Online Access Using Ngrok

1. Ensure you have Node.js installed.
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with your Twilio credentials:
   ```
   TWILIO_ACCOUNT_SID=your_account_sid
   TWILIO_AUTH_TOKEN=your_auth_token
   ```
4. Start the backend server and expose it using ngrok:
   ```
   npm run start-ngrok
   ```
5. Ngrok will provide a public URL forwarding to your local server. Use this URL to access the backend online temporarily.

## Permanent Deployment on Cloud Hosting

You can deploy the backend to cloud platforms like Heroku, Render, or Vercel.

### Example: Deploying to Heroku

1. Create a Heroku account and install the Heroku CLI.
2. Login to Heroku:
   ```
   heroku login
   ```
3. Create a new Heroku app:
   ```
   heroku create your-app-name
   ```
4. Set environment variables on Heroku:
   ```
   heroku config:set TWILIO_ACCOUNT_SID=your_account_sid
   heroku config:set TWILIO_AUTH_TOKEN=your_auth_token
   ```
5. Push your code to Heroku:
   ```
   git init
   git add .
   git commit -m "Initial commit"
   heroku git:remote -a your-app-name
   git push heroku master
   ```
6. Your backend will be available at `https://your-app-name.herokuapp.com`.

### Notes

- Replace `your_account_sid` and `your_auth_token` with your actual Twilio credentials.
- For other cloud providers, follow their respective deployment guides.
- Ensure your backend server listens on the port provided by the environment variable `PORT` for cloud deployment. You may need to update `server.js` accordingly.

## Updating server.js for Cloud Deployment

Modify the `PORT` variable in `server.js` to use the environment variable or default to 3001:

```js
const PORT = process.env.PORT || 3001;
```

This allows the cloud platform to assign the port dynamically.
