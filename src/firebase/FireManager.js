import { firestore } from "firebase";

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

  /////////////////////////////////////////////////////////////////////////////////
  static getStudents() {
    const studentsRef = firestore().collection("students");
    return studentsRef.get();
  }
}
