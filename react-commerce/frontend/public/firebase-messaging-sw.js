// Import Firebase SDK
import { initializeApp } from "firebase/app";
import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhhU4YqNgosWdtuX4OICTWnH-7oTFeSvM",
  authDomain: "e-com-fd0b7.firebaseapp.com",
  projectId: "e-com-fd0b7",
  storageBucket: "e-com-fd0b7.appspot.com",
  messagingSenderId: "715990574128",
  appId: "1:715990574128:web:8c0fdab49b7f37bb5179f5",
  measurementId: "G-CKZEHD5NZ8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Handle background messages
onBackgroundMessage(messaging, (payload) => {
  console.log("📩 Background Message:", payload);

  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/logo192.png", // Change this to your app icon
  });
});
