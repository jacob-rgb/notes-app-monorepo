const supertest = require('supertest');
const mongoose = require('../mongo');

const {app, server} = require('../index');
const Note = require('../models/Note.schema');
const User = require('../models/User.schema');
const { initialNotes } = require('./helpers');
const { hashPassword } = require('../utils/passwords');

const api = supertest(app);


describe('Tests on notes', () => {

    beforeEach(async () => {
        await Note.deleteMany({});

        for(const note of initialNotes) {
            const newNote = new Note(note);
            await newNote.save();
        }
    })

    afterAll(async () => {
        await User.deleteMany({});
        server.close();
        mongoose.connection.close();
    })

    beforeAll(async() => {
        await User.deleteMany({});

        const passwordHash = hashPassword('pass');
        const user = new User({username: 'testUser', name:'testName', password: passwordHash});
        await user.save();
    })

    test('notes are returned as a json', async () => {
        await api.get('/api/notes')
           .expect(200)
           .expect('Content-type', /application\/json/)
    });

    test('there are many notes', async() => {
        const response = await api.get('/api/notes');

        expect(response.body.data).toHaveLength(initialNotes.length);
    });

    test('The first note content property is content 1', async() => {
        const response = await api.get('/api/notes');

        const contents = response.body.data.map(note => note.content);

        expect(contents).toContain("Content 1");
    })

    test('A valid Note can be added', async() => {

        const [validUser] = await User.find({username: 'testUser'});
        const newNote = {
            content: 'Content 3',
            date: new Date(),
            important: false,
            userId: validUser.id || validUser._id
        }

        await api.post('/api/notes')
                 .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RqYWNvIiwiaWQiOiI2MmI2Y2RjNjc3NWZkMjA5NDEzNGE4MmQiLCJpYXQiOjE2NTY1MjU1ODgsImV4cCI6MTY1NjUzMjc4OH0.Nm9b8wUj_CaljFUC6J_HxEVNzHrmhh8LaPf9yTGq-fs')
                 .send(newNote)
                 .expect(200)
                 .expect('Content-type', /application\/json/)
        
        const response = await api.get('/api/notes');
        const mappedResponse = response.body.data.map(note => note.content)

        expect(response.body.data).toHaveLength(initialNotes.length + 1)
        expect(mappedResponse).toContain(newNote.content);
    })

    test("A invalid Note can't be added", async() => {
        const newNote = {}

        await api.post('/api/notes')
                 .send(newNote)
                 .expect(401)
                 .expect('Content-type', /application\/json/)
        
        const response = await api.get('/api/notes');

        expect(response.body.data.ok).toBeFalsy()
        expect(response.body.data).toHaveLength(initialNotes.length);
    })
});
