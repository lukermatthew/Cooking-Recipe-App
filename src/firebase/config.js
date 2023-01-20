import firebase from "firebase/app";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWhlx6DWXcsfacfwGsgD65kI_6dltjEmo",
  authDomain: "cooking-recipe-e62e5.firebaseapp.com",
  projectId: "cooking-recipe-e62e5",
  storageBucket: "cooking-recipe-e62e5.appspot.com",
  messagingSenderId: "410459530682",
  appId: "1:410459530682:web:4f13a6b00be30a2fcb6983",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const projectFireStore = firebase.firestore();

export { projectFireStore };
