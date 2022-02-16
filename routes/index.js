const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const handler = require("../models/mongoReq.js");
const storage = require("..//models/storageReq");
const { check, validationResult } = require("express-validator");
const fileUpload = require("express-fileupload");

router.use(fileUpload());

// Get categories, available books and render index page
// router.get("/", (req, res) => {
//   const requests = new handler();
//   const getProperties = async (req, res) => {
//     const properties = {
//       categories: await requests.getAllCategories(),
//       books: await requests.getPopularBooksInCategory(),
//       query: req.query,
//     };
//     res.render("index", properties);
//   };
//   getProperties(req, res);
// });

router.get("/", async (req, res) => {
  const requests = new handler();
  const all_categories = await requests.getAllCategoriesCollection();
  const properties = {
    query: req.query,
    categories: all_categories[0]["categories"],
    yearStudies: all_categories[0]["yearStudies"],
    syllabuses: await requests.getAllBooks(),
  };
  res.render("index", properties);
});

router.post(
  "/upload-book",
  [
    check("title")
      .trim()
      .notEmpty()
      .withMessage("Please provide a title")
      .isLength({ min: 3 })
      .withMessage("Title must be at least 3 characters long"),
    check("author")
      .trim()
      .notEmpty()
      .withMessage("Please provide the author's full name")
      .isLength({ min: 3 })
      .withMessage("Full name must be at least 3 characters long"),
  ],
  async (req, res) => {
    const fieldsErrors = validationResult(req);
    if (!fieldsErrors.isEmpty()) {
      res.status(400).json({ errors: fieldsErrors.array() });
    }
    const { body, files } = req;
    const store = new storage();
    for (const file of Object.entries(files)) {
      const destination = `${body["category"]}/${Date.now() + file[1].name}`;
      const upload = await store.upload(file[1], destination);
      body[`${file[0]}Metadata`] = upload["metadata"];
      body[file[0]] = upload["url"];
    }
    const requests = new handler();
    await requests.insertNewBook(body);
    res.redirect("/");
  }
);

// router.post(
//   "/upload-book",
// [
//   check("title")
//     .trim()
//     .notEmpty()
//     .withMessage("Please provide a title")
//     .isLength({ min: 8 })
//     .withMessage("Title must be at least 8 characters long"),
//   check("author")
//     .trim()
//     .notEmpty()
//     .withMessage("Please provide the author's full name")
//     .isLength({ min: 8 })
//     .withMessage("Full name must be at least 8 characters long"),
// ],
//   (req, res) => {
//     // const upload = new formidable.IncomingForm().parse(
//     //   req,
//     //   async (err, fields, files) => {
//     //     if (err) {
//     //       throw err;
//     //     }
//     const fieldsErrors = validationResult(req);
//     if (!fieldsErrors.isEmpty()) {
//       res.status(400).json({ errors: fieldsErrors.array() });
//     }
//     //     console.log(files);
//     //     res.send(files["thumbnail"]);
//     //   }
//     // );
//   }
// );

// router.post("/upload-book", (req, res) => {
//   const upload = new formidable.IncomingForm().parse(
//     req,
//     async (err, fields, files) => {
//       if (err) {
//         console.error("Error", err);
//         throw err;
//       }
//       var posterMetaData = null;
//       var bookMetaData = null;

//       for (const file of Object.entries(files)) {
//         const name = `${fields["category"]}/${
//           file[1].originalFilename + Date.now()
//         }`;
//         if (file[1].mimetype.includes("image")) {
//           await bucket
//             .upload(file[1].filepath, {
//               public: true,
//               contentType: file[1].mimetype,
//               destination: name,
//               metadata: {
//                 firebaseStorageDownloadTokens: uuidv4(),
//               },
//             })
//             .then((snapshot) => {
//               const metadata = snapshot[0]["metadata"];
//               posterMetaData = metadata;
//             });
//         } else {
//           await bucket
//             .upload(file[1].filepath, {
//               contentType: file[1].mimetype,
//               destination: name,
//               metadata: {
//                 firebaseStorageDownloadTokens: uuidv4(),
//               },
//             })
//             .then((snapshot) => {
//               const metadata = snapshot[0]["metadata"];
//               bookMetaData = metadata;
//             });
//         }
//       }
//       const requests = new handler();
//       requests.uplodSyllabus(posterMetaData, bookMetaData, fields).then(() => {
//         res.redirect("/");
//       });
//     }
//   );
// });

module.exports = router;
