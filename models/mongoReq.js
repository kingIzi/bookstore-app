const mongoose = require("mongoose");
const Collections = require("./models");

class Requests {
  constructor() {}
  async uplodSyllabus(posterMetadata, bookMetadata, fields) {
    const data = {
      title: fields["title"],
      author: fields["author"],
      subject: fields["subject"],
      category: fields["category"],
      english: fields["english"],
      french: fields["french"],
      swahili: fields["swahili"],
      imgUrl: fields["imgUrl"],
      bookUrl: fields["bookUrl"],
      description: fields[["description"]],
      thumbnail: posterMetadata,
      file: bookMetadata,
    };
    const syllabus = new Collections();
    syllabus.all_syllabuses.create(data);
  }
}

module.exports = Requests;
