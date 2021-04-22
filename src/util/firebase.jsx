import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyCJhxike3V11N-S4t2cUvJO7KhkTOSR4x8",
  authDomain: "vegetable-6cd92.firebaseapp.com",
  projectId: "vegetable-6cd92",
  storageBucket: "vegetable-6cd92.appspot.com",
  messagingSenderId: "429894392196",
  appId: "1:429894392196:web:ef20d0d8290d42b87065d1",
  measurementId: "G-LRXQX12XD9",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const message = firebase.messaging();

export default message;
