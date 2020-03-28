import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDJr47YNKZqsUULByUblQiKM02BlyhyYQM",
  authDomain: "tenedores-c8c53.firebaseapp.com",
  databaseURL: "https://tenedores-c8c53.firebaseio.com",
  projectId: "tenedores-c8c53",
  storageBucket: "tenedores-c8c53.appspot.com",
  messagingSenderId: "1002756100418",
  appId: "1:1002756100418:web:861812ddb716a1a33c78db"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
