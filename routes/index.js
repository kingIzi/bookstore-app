const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const formidable = require("formidable");
const admin = require("../models/storage");
const handler = require("../models/mongoReq.js");
const { v4: uuidv4 } = require("uuid");
const Collections = require("../models/models");

router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
router.use(bodyParser.json());

const bucket = admin.storage().bucket("gs://syllabustz-bd7fd.appspot.com/");

// Get categories, available books and render index page
router.get("/", (req, res) => {
  const getProperties = async (req, res) => {
    const documents = new Collections();
    let categories = await documents.all_categories
      .find()
      .then((result) => {
        const data = result[0]["categories"];
        return data;
      })
      .catch((err) => {
        console.log("error occured...");
      });
    let books = await documents.all_syllabuses
      .find()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log("error occurred...");
      });
    const properties = {
      categories: categories,
      books: books,
      query: req.query,
    };
    res.render("index", properties);
  };
  getProperties(req, res);
});

router.post("/upload-book", (req, res) => {
  const upload = new formidable.IncomingForm().parse(
    req,
    async (err, fields, files) => {
      if (err) {
        console.error("Error", err);
        throw err;
      }
      var posterMetaData = null;
      var bookMetaData = null;
      const bucketConfig = {
        action: "read",
        expires: Date.now() + 1000 * 60 * 60,
      };

      for (const file of Object.entries(files)) {
        const name = `${fields["category"]}/${
          file[1].originalFilename + Date.now()
        }`;
        if (file[1].mimetype.includes("image")) {
          await bucket
            .upload(file[1].filepath, {
              contentType: file[1].mimetype,
              destination: name,
              metadata: {
                firebaseStorageDownloadTokens: uuidv4(),
              },
            })
            .then((snapshot) => {
              const metadata = snapshot[0]["metadata"];
              posterMetaData = metadata;
            });
        } else {
          await bucket
            .upload(file[1].filepath, {
              contentType: file[1].mimetype,
              destination: name,
              metadata: {
                firebaseStorageDownloadTokens: uuidv4(),
              },
            })
            .then((snapshot) => {
              const metadata = snapshot[0]["metadata"];
              bookMetaData = metadata;
            });
        }
      }
      const imgFileRef = bucket.file(posterMetaData.name);
      const [imgUrl] = await imgFileRef.getSignedUrl(bucketConfig);
      fields["imgUrl"] = imgUrl;

      const bookFileRef = bucket.file(bookMetaData.name);
      const [bookUrl] = await bookFileRef.getSignedUrl(bucketConfig);
      fields["bookUrl"] = bookUrl;
      const requests = new handler();
      requests.uplodSyllabus(posterMetaData, bookMetaData, fields).then(() => {
        res.redirect("/");
      });
    }
  );
});

module.exports = router;
