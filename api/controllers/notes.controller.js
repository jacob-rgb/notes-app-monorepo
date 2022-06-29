const Note = require("../models/note.schema");
const User = require("../models/User.schema");
const { deleteNoteinUser } = require("../utils/notes");


const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({}).populate('userId');
        if(!notes.length) return res.status(404).json({ok: false, msg: 'No se han encontrado elementos'});

        res.status(200).json({
            ok: true,
            data: notes
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Internal server error'
        })
    }
}

const getNoteById = async (req, res) => {
    const { id } = req.params;
    try {
        const note = await Note.findById(id);
        if(!note) return res.status(404).json({ok: false, msg: 'No se han encontrado elementos'});

        res.status(200).json({
            ok: true,
            data: note
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Internal server error'
        })
    }
}

const saveNote = async (req,res) => {
    const { content, important = false, userId} = req.body;
    console.log('request body', req.body);
    try {
        const user = await User.findById(userId);
        const newNote = new Note({
            content,
            important,
            date: new Date(),
            userId: user._id
        });

        const savedNote = await newNote.save();
        user.notes = user.notes.concat(savedNote._id);
        await user.save();
        res.status(200).json({ok: true, data: savedNote });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ok:false, msg:'Internal server error'});
    }
}

const deleteNote = async (req,res) => {
    const {id} = req.params;
    try {
        const noteToDelete = await Note.findById(id);
        const noteDeleted = await Note.findByIdAndDelete(id);
        await deleteNoteinUser(noteToDelete.userId, id)
        if(!noteDeleted) return res.status(204).json( {ok: true, msg: 'No elements founded'})
        res.status(202).json({
            ok: true,
            msg: `Elemento con id ${id} eliminado`
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Internal server error',
            log: error
        })
    }
}

const updateNote = async (req,res) => {
    const {id} = req.params;
    const newNoteInfo = req.body;
    const {userId, ...data} = newNoteInfo;

    try {
        const updatedNoted = await Note.findByIdAndUpdate(id, data, {new: true});
        if(!updatedNoted) return res.status(404).json({ok: false, msg: 'Not element founded'});

        res.status(200).json({
            ok: true,
            data: updatedNoted
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: true,
            msg: error
        })
    }
}


module.exports = {
    getNotes,
    getNoteById,
    saveNote,
    deleteNote,
    updateNote
}