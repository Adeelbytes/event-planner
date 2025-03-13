const cron = require('node-cron');
const nodemailer = require('nodemailer');
const Event = require('../models/Event');

// Configure nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com', // Replace with your email
        pass: 'your-email-password', // Replace with your email password
    },
});

// Function to send reminder email
const sendReminderEmail = async (event) => {
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'user-email@example.com', // Replace with the user's email
        subject: `Reminder: ${event.name}`,
        text: `Don't forget about your event: ${event.name} on ${event.date}.`,
    };

    await transporter.sendMail(mailOptions);
};

// Schedule reminders
cron.schedule('* * * * *', async () => { // Runs every minute (adjust as needed)
    const now = new Date();
    const events = await Event.find({ reminder: true, date: { $gt: now } });

    events.forEach((event) => {
        const timeDifference = event.date - now;
        if (timeDifference <= 60000) { // Remind 1 minute before the event
            sendReminderEmail(event);
        }
    });
});

module.exports = { sendReminderEmail };