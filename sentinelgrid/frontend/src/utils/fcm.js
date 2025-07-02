// This file contains utility functions for integrating Firebase Cloud Messaging in the frontend.

import firebase from 'firebase/app';
import 'firebase/messaging';

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

export const requestFirebaseNotificationPermission = async () => {
    try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            console.log('Notification permission granted.');
            const token = await messaging.getToken();
            console.log('FCM Token:', token);
            return token;
        } else {
            console.error('Unable to get permission to notify.');
        }
    } catch (error) {
        console.error('Error requesting notification permission:', error);
    }
};

export const onMessageListener = () => 
    new Promise((resolve) => {
        messaging.onMessage((payload) => {
            console.log('Message received. ', payload);
            resolve(payload);
        });
    });