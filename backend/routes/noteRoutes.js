import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { createNote, deleteNote, getNotes } from "../controllers/noteController.js";

const noteRouter = express.Router();

noteRouter.post("/", protect, createNote);
noteRouter.get("/", protect, getNotes);
noteRouter.delete("/:id", protect, deleteNote);

export default noteRouter;
