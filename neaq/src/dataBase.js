import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/firebase-storage'

const firebaseConfig = {
    apiKey: "AIzaSyAWMFxwne8beNz5Tg89pDW2XOGr2XDHXes",
    authDomain: "neaq-platform.firebaseapp.com",
    projectId: "neaq-platform",
    storageBucket: "neaq-platform.appspot.com",
    messagingSenderId: "467531412758",
    appId: "1:467531412758:web:b25ec7520bfaee585b4c37",
    measurementId: "G-WVDF5PS6R7"
};

// Initialize Firebase
const data = firebase.initializeApp(firebaseConfig);
const auth = data.auth()
const store = data.firestore()
const galery = data.storage()

export {auth}
export {store}
export {galery}