import firebase from "firebase";
import "firebase/messaging";
function getInit() {
  if (!firebase.apps.length) {
    return firebase.initializeApp({
      messagingSenderId: "429894392196",
    });
  } else {
    return firebase.app(); // if already initialized, use that one
  }
}

const messaging = getInit().messaging();
export { messaging };
