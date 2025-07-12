import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserSessionPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // make sure this is here

const firebaseConfig = {
  apiKey: "AIzaSyCfjSeeImKenjna2LuYdii7aW1P0b9EuKg",
  authDomain: "trading-site-811b5.firebaseapp.com",
  projectId: "trading-site-811b5",
  storageBucket: "trading-site-811b5.firebasestorage.app",
  messagingSenderId: "700058413989",
  appId: "1:700058413989:web:835a4d99151cf78e33164c",
  measurementId: "G-X8TQP5CDR8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ✅ This line makes user logout when they close or refresh the tab
setPersistence(auth, browserSessionPersistence);

export const db = getFirestore(app);
export { auth };
