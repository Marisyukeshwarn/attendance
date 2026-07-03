const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const cron = require('node-cron');
const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Simple web server for PaaS health checks
app.get('/', (req, res) => res.send('WhatsApp Bot is Alive!'));
app.listen(PORT, () => console.log(`🌍 Health check server running on port ${PORT}`));

const TARGET_GROUP_NAME = process.env.TARGET_GROUP_NAME;
const ATTENDANCE_MESSAGE = process.env.ATTENDANCE_MESSAGE || "maris yukeshwaran present mam";
const CRON_SCHEDULE = process.env.CRON_SCHEDULE || "0 8 * * *";

// Initialize WhatsApp Client with LocalAuth to persist session
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        executablePath: process.env.CHROME_BIN || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
    }
});

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    console.log('QR RECEIVED! Please scan the QR code below with your WhatsApp:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('✅ WhatsApp Client is ready!');
    
    // Schedule the cron job once the client is ready
    console.log(`🕒 Scheduling daily attendance at: ${CRON_SCHEDULE}`);
    
    cron.schedule(CRON_SCHEDULE, async () => {
        try {
            console.log(`[${new Date().toLocaleString()}] Executing scheduled attendance...`);
            
            // Get all chats
            const chats = await client.getChats();
            
            // Find the specific group
            const targetGroup = chats.find(chat => chat.isGroup && chat.name === TARGET_GROUP_NAME);
            
            if (targetGroup) {
                await targetGroup.sendMessage(ATTENDANCE_MESSAGE);
                console.log(`✅ Successfully sent attendance to group: ${TARGET_GROUP_NAME}`);
            } else {
                console.error(`❌ Could not find group with name: ${TARGET_GROUP_NAME}. Please check the exact group name in .env`);
            }
        } catch (error) {
            console.error('❌ Error sending scheduled message:', error);
        }
    }, {
        scheduled: true,
        timezone: "Asia/Kolkata" // Set this to your local timezone
    });
});

client.on('disconnected', (reason) => {
    console.log('❌ WhatsApp Client was disconnected. Reason:', reason);
});

// Start the client
client.initialize();
