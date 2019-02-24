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
}
