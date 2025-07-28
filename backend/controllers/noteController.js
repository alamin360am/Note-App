import Note from "../models/note.model.js";


export const createNote = async (req, res) => {
  const { content } = req.body;

  if (!content) return res.status(400).json({ message: "Content is required" });

  try {
    const note = await Note.create({ user: req.user._id, content });
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: "Failed to create note" });
  }
};

export const getNotes = async (req, res) => {}

export const deleteNote = async (req, res) => {}
