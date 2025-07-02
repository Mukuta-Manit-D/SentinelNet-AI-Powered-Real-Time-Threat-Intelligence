// backend/src/utils/notification.js

const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://<YOUR_PROJECT_ID>.firebaseio.com' // Replace with your Firebase project ID
});

const sendNotification = async (token, title, body) => {
    const message = {
        notification: {
            title: title,
            body: body,
        },
        token: token,
    };

    try {
        const response = await admin.messaging().send(message);
        console.log('Notification sent successfully:', response);
        return response;
    } catch (error) {
        console.error('Error sending notification:', error);
        throw new Error('Notification not sent');
    }
};

module.exports = {
    sendNotification,
};