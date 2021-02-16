import firebase from 'firebase/app';
import 'firebase/firestore';


  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyDEoiNgZjF9r1mxnr-ERLsp2zaC81EBR-U",
    authDomain: "wily-app-e96c3.firebaseapp.com",
    projectId: "wily-app-e96c3",
    storageBucket: "wily-app-e96c3.appspot.com",
    messagingSenderId: "94355700074",
    appId: "1:94355700074:web:466200d021030221b60d13",
    measurementId: "G-SG6XLF6E39"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  export default db;