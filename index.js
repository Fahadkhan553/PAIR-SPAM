const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const pino = require('pino');
const readline = require("readline");

// Colors for terminal output
const color = [
    '\x1b[31m',  // Red
    '\x1b[32m',  // Green
    '\x1b[33m',  // Yellow
    '\x1b[34m',  // Blue
    '\x1b[35m',  // Magenta
    '\x1b[36m'   // Cyan
];
const wColor = color[Math.floor(Math.random() * color.length)];
const xColor = '\x1b[0m';

// Function to ask questions in the terminal
const question = (text) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise((resolve) => { rl.question(text, resolve) });
};

// Function to send notifications
async function sendNotifications() {
    const { state } = await useMultiFileAuthState('./session');
    const bot = makeWASocket({
        logger: pino({ level: "silent" }),
        printQRInTerminal: true,
        auth: state,
        connectTimeoutMs: 60000,
        defaultQueryTimeoutMs: 0,
        keepAliveIntervalMs: 10000,
        emitOwnEvents: true,
        fireInitQueries: true,
        generateHighQualityLinkPreview: true,
        syncFullHistory: true,
        markOnlineOnConnect: true,
        browser: ["Ubuntu", "Chrome", "20.0.04"],
    });

    try {
        // Ask for the message to send
        const message = await question(color + 'Enter the message to send: ' + xColor);

        // Ask for the list of phone numbers (comma-separated)
        const phoneNumbers = await question(color + 'Enter the phone numbers (comma-separated): ' + xColor);
        const numbers = phoneNumbers.split(',').map(num => num.trim());

        // Send the message to each contact
        for (const number of numbers) {
            try {
                await bot.sendMessage(number + '@s.whatsapp.net', { text: message });
                console.log(color + `Message sent to: ${number}` + xColor);
            } catch (error) {
                console.error(color + `Error sending message to ${number}: ${error.message}` + xColor);
            }
        }
    } catch (error) {
        console.error(color + 'Error: ' + error.message + xColor);
    } finally {
        // Disconnect the bot
        await bot.end();
    }
}

// Function to send the channel link
async function sendChannelLink() {
    const { state } = await useMultiFileAuthState('./session');
    const bot = makeWASocket({
        logger: pino({ level: "silent" }),
        printQRInTerminal: true,
        auth: state,
        connectTimeoutMs: 60000,
        defaultQueryTimeoutMs: 0,
        keepAliveIntervalMs: 10000,
        emitOwnEvents: true,
        fireInitQueries: true,
        generateHighQualityLinkPreview: true,
        syncFullHistory: true,
        markOnlineOnConnect: true,
        browser: ["Ubuntu", "Chrome", "20.0.04"],
    });

    try {
        // Ask for the list of phone numbers (comma-separated)
        const phoneNumbers = await question(color + 'Enter the phone numbers (comma-separated): ' + xColor);
        const numbers = phoneNumbers.split(',').map(num => num.trim());

        // Send the channel link to each contact
        for (const number of numbers) {
            try {
                const channelLink = 'https://whatsapp.com/channel/0029VavHzv259PwTIz1XxJ09';
                await bot.sendMessage(number + '@s.whatsapp.net', { text: `Please follow our channel: ${channelLink}` });
                console.log(color + `Channel link sent to: ${number}` + xColor);
            } catch (error) {
                console.error(color + `Error sending channel link to ${number}: ${error.message}` + xColor);
            }
        }
    } catch (error) {
        console.error(color + 'Error: ' + error.message + xColor);
    } finally {
        // Disconnect the bot
        await bot.end();
    }
}

async function main() {
    while (true) {
        console.log(color + `Running... Notification Bot
=========================
 • SEND NOTIFICATIONS
=========================
┏❐
┃ [ FOLLOW THE INSTRUCTIONS BELOW, TO SEND NOTIFICATIONS ]
┃
┃⭔ Enter the message to send
┃⭔ Enter the phone numbers (comma-separated)
┃
┗❐
=========================` + xColor);

        // Send the channel link first
        await sendChannelLink();

        // Send the notifications
        await sendNotifications();

        // Ask if the user wants to send more notifications
        const continueSending = await question(color + 'Do you want to send more notifications? (yes/no): ' + xColor);
        if (continueSending.toLowerCase() !== 'yes') {
            break;
        }
    }
}

main();
