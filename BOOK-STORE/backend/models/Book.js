import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a book name"],
    },
    author: {
      type: String,
      required: [true, "Please provide the book author"],
    },
    publishYear: {
      type: Number,
      required: [true, "Please provide the publish year"],
    },
  },
  { timestamps: true }
);

const Book = mongoose.model('Book', BookSchema);

export default Book;

// module.exports = mongoose.model('Book', BookSchema)
