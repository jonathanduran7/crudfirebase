import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyD03ysaHNax3YdTvl5Wb9FMGp4rEp1GkUQ",
    authDomain: "crud-react-udemy-76a4c.firebaseapp.com",
    projectId: "crud-react-udemy-76a4c",
    storageBucket: "crud-react-udemy-76a4c.appspot.com",
    messagingSenderId: "342964863045",
    appId: "1:342964863045:web:2b67d6119c183a6e2de32c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export {firebase}