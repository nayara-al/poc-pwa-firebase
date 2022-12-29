importScripts(
  "https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyD0m7YT6kbq-hQtynOQK7XVXekFCoaQkps",
  authDomain: "projeto-146e1.firebaseapp.com",
  projectId: "projeto-146e1",
  storageBucket: "projeto-146e1.appspot.com",
  messagingSenderId: "497379515223",
  appId: "1:497379515223:web:0cc97ac4bb7c10543afc12",
  measurementId: "G-NNQK4R22HW"
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
