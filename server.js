const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// Middleware
app.use(cors({
    origin: '*',
    methods: ['POST', 'GET', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
}));
app.use(bodyParser.json());

// Endpoint to receive order data
app.post('/api/order', (req, res) => {
    const orderData = req.body;

    console.log('Received order data:', orderData); // Log order data for debugging

    // Validate required fields including phone
    if (!orderData.name || !orderData.email || !orderData.phone || !orderData.service || !orderData.region || !orderData.date) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Store order data in a JSON file
    const ordersFile = path.join(__dirname, 'orders.json');
    let orders = [];
    if (fs.existsSync(ordersFile)) {
        const data = fs.readFileSync(ordersFile);
        orders = JSON.parse(data);
    }
    orders.push(orderData);
    fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));

    // Send WhatsApp notification via Twilio including phone number in single line
    const messageBody = `New order received: Name: ${orderData.name}, Phone: ${orderData.phone || 'N/A'}, Email: ${orderData.email}, Service: ${orderData.service}, Region: ${orderData.region}, Date: ${orderData.date}, Message: ${orderData.message || 'N/A'}`;

    const recipients = [
        'whatsapp:+6282128598690',
        'whatsapp:+6281917375241'
    ];

    Promise.all(recipients.map(toNumber => {
        return client.messages.create({
            from: 'whatsapp:+14155238886', // Twilio sandbox WhatsApp number
            to: toNumber,
            body: messageBody,
        });
    }))
    .then(messages => {
        messages.forEach(message => {
            console.log('WhatsApp message sent:', message.sid);
        });
        res.status(200).json({ message: 'Order received and notifications sent' });
    })
    .catch(error => {
        console.error('Error sending WhatsApp messages:', error);
        res.status(500).json({ error: 'Failed to send WhatsApp notifications' });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
