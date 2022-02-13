const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const universitiesSchema = new Schema(
  {
    rank: { type: String, required: false },
    french_name: { type: String, required: true },
    location: { type: String, required: true },
    faculties: { type: Array, required: false },
    postal_code: { type: String, required: false },
    telephone: { type: String, required: false },
    description: { type: String, required: true },
    name: { type: String, required: true },
    acronym: { type: String, required: true },
    founded: { type: String, required: false },
  },
  { timestamps: true }
);

const categoriesSchema = new Schema(
  {
    categories: { type: Array, required: true },
  },
  { timestamps: true }
);

const syllabusSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    subject: { type: String, required: true },
    category: { type: String, required: true },
    english: { type: String, required: false },
    french: { type: String, required: false },
    swahili: { type: String, required: false },
    description: { type: String, required: true },
    thumbnail: { type: Object, required: false },
    file: { type: Object, required: true },
    imgUrl: { type: String, required: true },
    bookUrl: { type: String, required: true },
  },
  { timestamps: true }
);

function CategoriesModel() {
  this.all_categories = mongoose.model("all_categories", categoriesSchema);
  this.all_universities = mongoose.model(
    "all_universities",
    universitiesSchema
  );
  this.all_syllabuses = mongoose.model("all_syllabuses", syllabusSchema);
}
module.exports = CategoriesModel;
