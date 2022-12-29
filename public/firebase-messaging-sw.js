importScripts(
  "https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyC90rjibiu_J1ur7_fbIPE2AcdFiKSpNcc",
  authDomain: "poc-pwa-teste.firebaseapp.com",
  projectId: "poc-pwa-teste",
  storageBucket: "poc-pwa-teste.appspot.com",
  messagingSenderId: "1011874177220",
  appId: "1:1011874177220:web:b05c2893d9e2660ac62991",
  measurementId: "G-GYSDCQ92W1",
})

const messaging = firebase.messaging();

messaging.onBackgroundMessage(({ notification }) => {
  const notificationTitle = notification?.title ?? "";
  const notificationOptions = {
    body: notification?.body ?? "É só um exemplo",
    icon: notification?.image ?? "src/assets/favicon-32x32.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
