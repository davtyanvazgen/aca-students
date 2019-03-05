import { firestore,  } from "firebase";
import firebase from 'firebase'


export default class FireManager {
  //ADD NEW COURCE
  static addCource(cource) {
    return firestore()
      .collection("cources")
      .doc(cource.id)
      .set(cource);
  }

  //REMOVE COURCES
  static removeCource(cource) {
    return firestore()
      .collection("cources")
      .doc(cource.id)
      .delete();
  }

  //GET ALL COURCES
  static getCources() {
    const studentsRef = firestore().collection("cources");
    return studentsRef.get();
  }

  /////////////////////////////////////////////////////////////////////////////////

  //ADD NEW STATUSE
  static addStatuse(statuse) {
    return firestore()
      .collection("statuses")
      .doc(statuse.id)
      .set(statuse);
  }

  //REMOVE STATUSE
  static removeStatuse(statuse) {
    return firestore()
      .collection("statuses")
      .doc(statuse.id)
      .delete();
  }

  //GET ALL STATUSES
  static getStatuses() {
    const studentsRef = firestore().collection("statuses");
    return studentsRef.get();
  }

  /////////////////////////////////////////////////////////////////////////////////

  //EDIT STATUS
  static editStatuse(statuse) {
    return firestore()
      .collection("statuses")
      .doc(statuse.id)
      .update({ ...statuse });
  }

//EDIT STUDENT iNFORMATION
static editStudentInformation(student) {
  return firestore()
    .collection("students")
    .doc(student.id)
    .update({ ...student });
}
  static  changeCources(obj) {
    return firestore()
      .collection("students")
      .doc(obj.id)
      .update({ ...obj});
  }
  ////////////change status//////////
  static  changeStatuses(obj) {
    return firestore()
      .collection("statuses")
      .doc(obj.id)
      .update({ ...obj});
  }
  /////////////////////////////////////////////////////////////////////////////////
  static getStudents() {
    const studentsRef = firestore()
    .collection("students");
    return studentsRef.get();
  }

  ////////////////add student///////////




//////////login/////////////////
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