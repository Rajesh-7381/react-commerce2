// Import Firebase SDK
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

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
export const messaging = getMessaging(app);

// Function to request permission and get FCM token
export const generateToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: "BCqkxJvqHkS3xDVl3ZvBv3aEdZtUJ4HpItmgIh1f6SK93P_HL-L0aL-wdUNs2Asx0IYvMLqSS7ssx1xluOwQXn0",
      });
      console.log("FCM Token:", token);
      return token;
    } else {
      console.warn("Notification permission denied.");
      return null;
    }
  } catch (error) {
    console.error("Error generating FCM token:", error);
  }
};

// Listen for foreground messages
onMessage(messaging, (payload) => {
  console.log("📩 Foreground Message:", payload);
  alert(`New Notification: ${payload.notification.title}\n${payload.notification.body}`);
});
