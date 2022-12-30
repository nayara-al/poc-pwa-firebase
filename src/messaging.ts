// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getMessaging, getToken, onMessage } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0m7YT6kbq-hQtynOQK7XVXekFCoaQkps",
  authDomain: "projeto-146e1.firebaseapp.com",
  projectId: "projeto-146e1",
  storageBucket: "projeto-146e1.appspot.com",
  messagingSenderId: "497379515223",
  appId: "1:497379515223:web:0cc97ac4bb7c10543afc12",
  measurementId: "G-NNQK4R22HW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const messaging = getMessaging(app)

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

async function requestPermission(): Promise<string>{
  console.log("Requesting permission...");
  const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("Notification permission granted.");
      const token = await getToken(messaging, {
        vapidKey:
        "BJtepweGBqKfSTKImWUYd9U-Ukg0ORnCJnMcFs4wmGI1z6Q3wJFB1IJPxK3QogSmRsh6WRnBkDoGBBk3Rpr_eZM",
      });
      if (token) {
          return Promise.resolve(token)
        } else {
          return Promise.reject(
            "No registration token available. Request permission to generate one."
          );
        }
      }
    return Promise.reject('Do not have permission') 
}

export {requestPermission}