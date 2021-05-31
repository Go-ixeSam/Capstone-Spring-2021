importScripts("https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.4.1/firebase-messaging.js");
firebase.initializeApp({
  apiKey: "AIzaSyCJhxike3V11N-S4t2cUvJO7KhkTOSR4x8",
  authDomain: "vegetable-6cd92.firebaseapp.com",
  projectId: "vegetable-6cd92",
  storageBucket: "vegetable-6cd92.appspot.com",
  messagingSenderId: "429894392196",
  appId: "1:429894392196:web:ef20d0d8290d42b87065d1",
  measurementId: "G-LRXQX12XD9",
});
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
  console.log("background message ha ha", payload);
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    // body: "Background Message body.",
    // icon: "/icon_app.png",
    // {
    // message: {
    // "token":"bk3RNwTe3H0:CI2k_HHwgIpoDKCIZvvDMExUdFQ3P1...",
    // data: {
    //   body: "great match!",
    //   icon: "/icon_app.png",
    // },
    // },
    // }
  };
  // self.registration.showNotification(notificationTitle, notificationOptions);
});
