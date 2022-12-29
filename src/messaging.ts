// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getMessaging, getToken, onMessage } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC90rjibiu_J1ur7_fbIPE2AcdFiKSpNcc",
  authDomain: "poc-pwa-teste.firebaseapp.com",
  projectId: "poc-pwa-teste",
  storageBucket: "poc-pwa-teste.appspot.com",
  messagingSenderId: "1011874177220",
  appId: "1:1011874177220:web:b05c2893d9e2660ac62991",
  measurementId: "G-GYSDCQ92W1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const messaging = getMessaging(app)

function requestPermission() {
  console.log("Requesting permission...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");

      getToken(messaging, {
        vapidKey:
        "BN1VwFqGIDSKX0QZu0afbIrKt2AyxThRTt-BaSocHmSz3fRBe6uo2CP53Zsd1hnO07ai30CyFikhYWgaLspEELk",
      }).then((currentToken) => {
        if (currentToken) {
          console.log("currentToken:", currentToken);
        } else {
          // Show permission request UI
          console.log(
            "No registration token available. Request permission to generate one."
          );
          // ...
        }
      });
      onMessage(messaging, ({ notification }) => {
        const notificationTitle = notification?.title ?? "";
        const notificationOptions = {
          body: notification?.body ?? "É só um exemplo",
          icon: notification?.image ?? "src/assets/favicon-32x32.png",
        };
        navigator.serviceWorker.getRegistration().then((registration) => {
          registration?.showNotification(
            notificationTitle,
            notificationOptions
          );
        });
      });
    } else {
      console.log("Do not have permission.");
    }
  });
}

requestPermission();
