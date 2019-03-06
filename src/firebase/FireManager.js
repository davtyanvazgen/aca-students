import firebase from 'firebase'


export default class FireManager {

static adminLogIn(email, password){
  return  firebase.auth().signInWithEmailAndPassword(email,password);
}

static onAuthStateChanged(){
  return firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      debugger;
      window.location = '/'
      // ...
    } else {
      debugger;
      // User is signed out.
      // ...
    }
  });
}

}