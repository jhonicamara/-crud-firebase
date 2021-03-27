import firebase from "firebase";
import "firebase/firestore";

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBbGRHDeP5GDEqhmcVxni3k74wuKBowrIY",
    authDomain: "crud-firebase-e2955.firebaseapp.com",
    projectId: "crud-firebase-e2955",
    storageBucket: "crud-firebase-e2955.appspot.com",
    messagingSenderId: "219960061551",
    appId: "1:219960061551:web:05a004452aad1adba2a79a"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//export default firebase;

/*
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  console.log('FNF - firebase.initializeApp(firebaseConfig);')
}else {
  firebase.app(); // if already initialized, use that one
  console.log('FNF - firebase.app();')
}
*/

const db = firebase.firestore();

export default {
  firebase,
  db
};

