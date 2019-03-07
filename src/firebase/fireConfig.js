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

const initFirebase = () => {
  firebase.initializeApp(config);
};

export default initFirebase;
