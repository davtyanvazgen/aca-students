import firebase from "firebase";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyBeHc7nH2J4ZJykUeEfSnWcFOghyI8tHGc",
  authDomain: "aca-students.firebaseapp.com",
  databaseURL: "https://aca-students.firebaseio.com",
  projectId: "aca-students",
  storageBucket: "aca-students.appspot.com",
  messagingSenderId: "15753998893"
};

export function initFirebase() {
  // Initialize Firebase
  firebase.initializeApp(config);

  // Initialize Cloud Firestore through Firebase
  // firebase.firestore().settings({timestampsInSnapshots: true});
}
export default { initFirebase };
