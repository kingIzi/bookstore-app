const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");
const { getFirestore } = require("firebase/firestore");

class FirebaseConfig {
  constructor() {
    this.firebaseConfig = {
      apiKey: "AIzaSyA-qupn4cWUvOb9S2qs1SikLZPiS_cbT5g",
      authDomain: "syllabustz-bd7fd.firebaseapp.com",
      databaseURL:
        "https://syllabustz-bd7fd-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "syllabustz-bd7fd",
      storageBucket: "syllabustz-bd7fd.appspot.com",
      messagingSenderId: "795922940723",
      appId: "1:795922940723:web:0fce401b548b0ccb50b446",
      measurementId: "G-RR9HHGF3TR",
    };
    this.firebaseApp = initializeApp(this.firebaseConfig);
  }
  getFirebaseStorage() {
    return getStorage(this.firebaseApp);
  }
  getFirebaseFirestore() {
    return getFirestore(this.firebaseApp);
  }
}
module.exports = FirebaseConfig;
