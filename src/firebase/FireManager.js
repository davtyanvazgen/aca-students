import { firestore } from "firebase";

export default class FireManager {
  //ADD NEW COURCE
  static addCource(cource) {
    return firestore()
      .collection("cources")
      .doc(cource.id)
      .set(cource);
  }

  //REMOVE COURCE
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

  //ADD NEW COURCE
  static addStatuse(statuse) {
    return firestore()
      .collection("statuses")
      .doc(statuse.id)
      .set(statuse);
  }

  //REMOVE COURCE
  static removeStatuse(statuse) {
    return firestore()
      .collection("statuses")
      .doc(statuse.id)
      .delete();
  }

  //GET ALL COURCES
  static getStatuses() {
    const studentsRef = firestore().collection("statuses");
    return studentsRef.get();
  }

  // static getStatuses() {
  //   const studentsRef = firestore().collection("statuses");
  //   return studentsRef.get();
  // }

  static getStudents() {
    const studentsRef = firestore().collection("students");
    return studentsRef.get();
  }
}
