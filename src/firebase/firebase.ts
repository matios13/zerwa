import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAQBOlgI52F-gSubPxgxEjs5f9M1lznmQs",
  authDomain: "zerwa-wow.firebaseapp.com",
  projectId: "zerwa-wow",
  storageBucket: "zerwa-wow.appspot.com",
  messagingSenderId: "176572537108",
  appId: "1:176572537108:web:82ffede55bcb3a425b0a01",
  measurementId: "G-2080DXRR2D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);