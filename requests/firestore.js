const firebaseInit = require("./firebaseInit");
const { doc, setDoc } = "firebase/firestore";

class FirestoreRequests {
  constructor() {
    this.firestore = firebaseInit.getFirebaseFirestore();
  }

  async setDocument(document, category, book) {
    await setDoc(doc(this.firestore, document, category), book);
  }
}

module.exports = FirestoreRequests;
