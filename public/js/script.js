//check if html element has className
function hasClass(element, clsName) {
  return (" " + element.className + " ").indexOf(" " + clsName + " ") > -1;
}

//change active nav link
function changeActiveNavItem(id) {
  const navList = document.getElementById("nav-routes");
  const navItems = navList.getElementsByTagName("a");
  for (let i = 0; i < navItems.length; i++) {
    const element = navItems[i];
    if (element.id === id) {
      element.classList.add("active");
    } else if (hasClass(element, "active")) {
      element.classList.remove("active");
    }
  }
}

// const firebaseConfig = {
//   apiKey: "AIzaSyA-qupn4cWUvOb9S2qs1SikLZPiS_cbT5g",
//   authDomain: "syllabustz-bd7fd.firebaseapp.com",
//   databaseURL:
//     "https://syllabustz-bd7fd-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "syllabustz-bd7fd",
//   storageBucket: "syllabustz-bd7fd.appspot.com",
//   messagingSenderId: "795922940723",
//   appId: "1:795922940723:web:0fce401b548b0ccb50b446",
//   measurementId: "G-RR9HHGF3TR",
// };
// firebase.initializeApp(firebaseConfig);

// function updateProgress(snapshot) {
//   var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//   var uploader = document.getElementById("uploader");
//   uploader.value = progress;
// }

// async function uploadFile(formData, file) {
//   try {
//     let self = this;
//     const storageRef = firebase.storage().ref();
//     const metadata = {
//       contentType: file["type"],
//     };
//     let category = "/" + formData.get("category") + "/";
//     const fileRef = storageRef.child(`${category}/` + Date.now() + file.name);
//     const uploadTaskSnapshot = await fileRef.put(file, metadata);
//     const downloadURL = await uploadTaskSnapshot.ref.getDownloadURL();
//     self = downloadURL;
//     return downloadURL;
//   } catch (error) {
//     console.log("ERR ===", error);
//     alert("Image uploading failed!");
//   }
// }

// document
//   .getElementById("submit-upload-form")
//   .addEventListener("submit", async function (event) {
//     event.preventDefault();
//     const formData = new FormData(document.getElementById("add-book-form"));
//     let posterUrl = await uploadFile(formData, formData.get("thumbnail"));
//     let bookUrl = await uploadFile(formData, formData.get("url"));
//     formData.delete("thumbnail");
//     formData.delete("url");
//     formData.append("posterUrl", posterUrl);
//     formData.append("bookUrl", bookUrl);
//     fetch("http://localhost:3000/upload-book", {
//       method: "POST",
//       body: formData,
//     });
//   });
