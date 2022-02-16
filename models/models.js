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
    yearStudies: { type: Array, required: true },
  },
  { timestamps: true }
);

const syllabusSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    language: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail: { type: String, required: true },
    bookUrl: { type: String, required: true },
    yearStudy: { type: String, required: true },
    thumbnailMetadata: { type: Object, required: true },
    bookUrlMetadata: { type: Object, required: true },
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
