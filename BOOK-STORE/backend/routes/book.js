import express from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBook,
  updateBook,
} from "../controllers/book.js";

const Router = express.Router();

Router.route("/books").get(getAllBooks).post(createBook);
Router.route("/books/:id").get(getBook).patch(updateBook).delete(deleteBook);

export { Router as BookRouter };
