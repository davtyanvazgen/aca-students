import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import firebase from "firebase/app";
import "firebase/app";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyBeHc7nH2J4ZJykUeEfSnWcFOghyI8tHGc",
  authDomain: "aca-students.firebaseapp.com",
  databaseURL: "https://aca-students.firebaseio.com",
  projectId: "aca-students",
  storageBucket: "aca-students.appspot.com",
  messagingSenderId: "15753998893"
};

firebase.initializeApp(config);
ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
