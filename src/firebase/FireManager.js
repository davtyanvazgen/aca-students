import { firestore } from "firebase";

export default class FireManager {
  //ADD NEW COURCE

  static getStudents() {
    const studentsRef = firestore().collection("students");
    return studentsRef.get();
  }



  static getCources() {
    const studentsRef = firestore().collection("cources");
    return studentsRef.get();
  }

  static getStatuses() {
    const studentsRef = firestore().collection("statuses");
    return studentsRef.get();
  }

  static addCource(cource) {
    return firestore()
      .collection("cources")
      .doc(cource.id)
      .set(cource);
  }

  static addStatus(status) {
    return firestore()
      .collection("statuses")
      .doc(status.id)
      .set(status);
  }
 
  static removeCource(cource) {
    return firestore()
      .collection("cources")
      .doc(cource.id)
      .delete();
  }

  static removeStatus(status) {
    return firestore()
      .collection("statuses")
      .doc(status.id)
      .delete();
  }
}
