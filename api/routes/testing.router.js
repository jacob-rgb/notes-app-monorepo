const { Router } = require('express');
const testingRouter = Router();
const Note = require('../models/note.schema');

testingRouter.post('/reset', async(req, res) => {
    await Note.deleteMany({});
    res.status(204).end();
})

module.exports = testingRouter;