import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBye4Pe8Ey_UwN6Kp-rzHj2FWWlR2GSMWs",
  authDomain: "fantastic-92bb2.firebaseapp.com",
  projectId: "fantastic-92bb2",
  storageBucket: "fantastic-92bb2.appspot.com",
  messagingSenderId: "277115985941",
  appId: "1:277115985941:web:ebb46fa5e70a169ea92e1c",
  measurementId: "G-SEBG7LR4CP",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
