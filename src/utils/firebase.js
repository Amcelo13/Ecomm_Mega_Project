import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAtGHQvuk8146k3-wiUGSyocF9We4EfZnM",
  authDomain: "ecomm-2ab38.firebaseapp.com",
  projectId: "ecomm-2ab38",
  storageBucket: "ecomm-2ab38.appspot.com",
  messagingSenderId: "234626477933",
  appId: "1:234626477933:web:da9ebabcff40ea4ad9b464",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

//Database initialization
export const db = getFirestore(app);

//Storage initialization
export const storage = getStorage(app);
