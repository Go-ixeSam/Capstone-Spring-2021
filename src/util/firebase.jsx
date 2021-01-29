// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/8.2.4/firebase-app.js"></script>
// import

// <script src="https://www.gstatic.com/firebasejs/8.2.4/firebase-analytics.js"></script>

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyD9zDHilHeT31nFkWpqt5YnvpCAQM_PO88",
  authDomain: "sharing-vegetable-system.firebaseapp.com",
  databaseURL: "https://sharing-vegetable-system-default-rtdb.firebaseio.com",
  projectId: "sharing-vegetable-system",
  storageBucket: "sharing-vegetable-system.appspot.com",
  messagingSenderId: "621828109384",
  appId: "1:621828109384:web:030ee1583c58ad3825147d",
  measurementId: "G-V7MT52KKGM",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;
