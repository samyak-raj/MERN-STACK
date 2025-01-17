import Book from "../models/Book.js";
import mongoose from "mongoose";

const createBook = async (req, res) => {
  const newBook = {
    title: req.body.title,
    author: req.body.author,
    publishYear: req.body.publishYear,
  };

  const book = await Book.create(newBook);
  res.status(201).json({ book });
};

const getAllBooks = async (req, res) => {
  const books = await Book.find({});
  res.status(200).json({ count: books.length, books });
};

const getBook = async (req, res) => {
  const { id: bookId } = req.params;
  const book = await Book.findById(bookId);

  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return res.status(400).json({ msg: "Invalid book ID format" });
  }

  if (!book) {
    // Book not found: return simple error message
    return res.status(404).json({ msg: "Book not found" });
  }

  res.status(201).json({ book });
};

const updateBook = async (req, res) => {
  const { id: bookId } = req.params;

  const book = await Book.findByIdAndUpdate(bookId, req.body, {
    new: true,
    runValidators: true
  });

  if (!book) {
    // Book not found: return simple error message
    return res.status(404).json({ msg: "Book not found" });
  }

  res.status(201).json({ book });
};

const deleteBook = async (req, res) => {
  const { id: bookId } = req.params;
  const book = await Book.findByIdAndDelete(bookId);

  if (!book) {
    // Book not found: return simple error message
    return res.status(404).json({ msg: "Book not found" });
  }
  res.status(200).json({ msg: "Book deleted succesfully" });
};

export { createBook, getAllBooks, getBook, updateBook, deleteBook };
