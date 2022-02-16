const express = require("express");
const router = express.Router();
const Collections = require("../models/models");
const admin = require("../models/storage");

const bucket = admin.storage().bucket("gs://syllabustz-bd7fd.appspot.com/");

router.get("/:openBook", (req, res) => {
  const documents = new Collections();
  const getProperties = async (req, res) => {
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
      .findById(req.params.openBook)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.error(err);
      });

    const bucketConfig = {
      action: "read",
      expires: Date.now() + 1000 * 60 * 60,
    };
    const pdfFileRef = bucket.file(books.file.name);
    const [pdfUrl] = await pdfFileRef.getSignedUrl(bucketConfig);
    books["bookUrl"] = pdfUrl;
    res.redirect(pdfUrl);
  };
  getProperties(req, res);
});

module.exports = router;
