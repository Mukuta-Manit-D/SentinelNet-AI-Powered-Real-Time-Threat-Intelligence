// This file contains utility functions for integrating Firebase Cloud Messaging in the frontend.

import firebase from 'firebase/app';
import 'firebase/messaging';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVFX38gIPRaO1OF8_ApGfPowi97Dln3CU",
  authDomain: "sentinelnet-d32d1.firebaseapp.com",
  projectId: "sentinelnet-d32d1",
  storageBucket: "sentinelnet-d32d1.firebasestorage.app",
  messagingSenderId: "679048674532",
  appId: "1:679048674532:web:895cbddd67b9065d5540f1",
  measurementId: "G-P5X57HEPFY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
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