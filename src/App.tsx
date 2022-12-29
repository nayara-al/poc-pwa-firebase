import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Button from "./components/Button";


import { initializeApp } from "firebase/app";

import { getMessaging, getToken, onMessage } from "firebase/messaging";


function App() {
  const [count, setCount] = useState(0);

  const [token, setToken] = useState('');
  useEffect(() => {
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
  
    function requestPermission() {
      console.log("Requesting permission...");
      let token
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted.");
          
          getToken(messaging, {
            vapidKey:
            "BJtepweGBqKfSTKImWUYd9U-Ukg0ORnCJnMcFs4wmGI1z6Q3wJFB1IJPxK3QogSmRsh6WRnBkDoGBBk3Rpr_eZM",
          }).then((currentToken) => {
            if (currentToken) {
              console.log("currentToken:", currentToken);
              setToken(currentToken);
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
  });

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <p>{token}</p>
      <Button/>
    </div>
  );
}

export default App;
