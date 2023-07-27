import Firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const config = {
    apiKey: "AIzaSyDs4QYLDcysKXtawlNmUhdWLOG-_05V00g",
    authDomain: "instagram-e0ddf.firebaseapp.com",
    projectId: "instagram-e0ddf",
    storageBucket: "instagram-e0ddf.appspot.com",
    messagingSenderId: "472214549567",
    appId: "1:472214549567:web:e9a07b599c5e314c3bf48a",
    measurementId: "G-SCXL0QD7B7"}

const firebase = Firebase.initializeApp(config)
const { FieldValue } = Firebase.firestore

export {firebase, FieldValue}