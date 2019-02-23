import { firestore } from "firebase";

export default class FireManager {
  static getStudent(studentId) {
    const ref = firestore()
      .collection("students")
      .doc(studentId);

    return ref
      .get()
      .then(doc => {
        if (doc.exists) {
          return doc.data();
        } else {
          console.error("No such student!");
        }
      })
      .catch(function(error) {
        console.error("Error getting student:", error);
      });
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
