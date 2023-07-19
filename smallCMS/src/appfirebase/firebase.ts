// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    limit,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
    updateDoc,
    where,
  } from 'firebase/firestore';
  import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
  import {
    getAuth, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
  } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDn_d-1Hpqtu_WmxnXzTENOBZ1GiN0m3UM",
  authDomain: "small-and-simple.firebaseapp.com",
  projectId: "small-and-simple",
  storageBucket: "small-and-simple.appspot.com",
  messagingSenderId: "585388648153",
  appId: "1:585388648153:web:c8ff8b1ca24950398a40c8",
  measurementId: "G-8G7T5QV2B8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export {
    auth,
    db,
    storage,
    serverTimestamp,
    addDoc,
    collection,
    doc,
    getDocs,
    setDoc,
    getFirestore,
    updateDoc,
    limit,
    orderBy,
    query,
    where,
    getDoc,
    deleteDoc,
    ref,
    uploadBytes, 
    getDownloadURL,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
  };
  