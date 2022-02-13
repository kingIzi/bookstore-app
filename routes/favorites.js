const express = require('express')
const router = express.Router();
const Collections = require('../models/models')

router.get('/',(req,res) => {
    const documents = new Collections()
    documents.all_categories.find()
    .then((result) => {
        const data = result[0]['categories']
        res.render('favorites',{"categories": data,"qu": req.query})
    })
    .catch((err) => {
        console.error(err)
    })
});


module.exports = router;