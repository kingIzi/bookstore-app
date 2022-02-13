const express = require("express");
const router = express.Router();
const Collections = require("../models/models");

// router.get('/',(req,res) => {
//     const documents = new Collections()
//     documents.all_categories.find()
//     .then((result) => {
//         const data = result[0]['categories']
//         res.render('categories',{"categories": data,"qu": req.query})
//     })
//     .catch((err) => {
//         console.error(err)
//     })
// });

router.get("/:category", (req, res) => {
  const documents = new Collections();
  const getProperties = async (req, res) => {
    let categories = await documents.all_categories
      .find()
      .then((result) => {
        return result[0]["categories"];
      })
      .catch((err) => {
        console.error(err);
      });
    let books = await documents.all_syllabuses
      .find({ category: req.params.category })
      .then((result) => {
        return result;
      });
    const properties = {
      categories: categories,
      books: books,
      query: req.query,
    };
    res.render("categories", properties);
  };
  getProperties(req, res);
  // let books = documents.all_syllabuses.find({'category': req.params.})
});

module.exports = router;
