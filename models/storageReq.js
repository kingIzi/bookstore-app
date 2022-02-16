const firebaseInit = require("./firebaseInit");
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");

class Storage {
  constructor() {
    this.firebase = new firebaseInit();
  }

  uploadFile(file, destination) {
    const metadata = {
      contentType: file.mimetype,
    };
    const storageRef = ref(this.firebase.getFirebaseStorage(), destination);
    return uploadBytes(storageRef, file.data, metadata);
  }

  async upload(file, destination) {
    const snapshot = await this.uploadFile(file, destination).then(
      (snapshot) => {
        return snapshot;
      }
    );
    const url = await getDownloadURL(snapshot.ref).then((downloadURL) => {
      return downloadURL;
    });
    return {
      metadata: snapshot["metadata"],
      url: url,
    };
  }
}

module.exports = Storage;
