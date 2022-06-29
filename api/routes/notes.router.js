const { Router } = require('express');
const { getNotes, getNoteById, saveNote, deleteNote, updateNote } = require('../controllers/notes.controller');
const Note = require('../models/note.schema');
const { getUserAndIdByToken } = require('../middlewares/getToken');

const notesRouter = Router();

notesRouter.get('/', getNotes);

notesRouter.get('/:id', getNoteById);

notesRouter.post('/',[getUserAndIdByToken], saveNote);

notesRouter.delete('/:id', [getUserAndIdByToken], deleteNote);

notesRouter.put('/:id', [getUserAndIdByToken], updateNote);



module.exports = notesRouter;