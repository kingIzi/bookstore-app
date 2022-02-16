const Collections = require("./models");

class Requests {
  constructor() {
    this.collections = new Collections();
  }

  insertNewBook(book) {
    return this.collections.all_syllabuses
      .create(book)
      .then(() => {
        console.log("New book added to all_syllabus collection");
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  getAllCategoriesCollection() {
    return this.collections.all_categories
      .find()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });
  }

  getAllBooks() {
    return this.collections.all_syllabuses
      .find(
        {},
        {
          title: 1,
          author: 1,
          category: 1,
          language: 1,
          description: 1,
          thumbnail: 1,
          bookUrl: 1,
        }
      )
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });
  }

  // getPopularBooksInCategory() {
  //   return this.collections.all_syllabuses
  //     .find()
  //     .then((result) => {
  //       return result;
  //     })
  //     .catch((err) => {
  //       console.log("error occurred...");
  //     });
  // }
}

module.exports = Requests;
