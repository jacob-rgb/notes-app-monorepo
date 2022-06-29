const supertest = require("supertest");

const User = require("../models/User.schema");
const {app, server} = require('../index');
const { hashPassword } = require("../utils/passwords");
const mongoose = require('../mongo');
const { getUsers } = require("../utils/for_testing");

const api = supertest(app);

describe('creating a new user', () => {
    beforeEach(async () => {
        await User.deleteMany({});

        const passwordHash = hashPassword('pass');
        const user = new User({username: 'testUser', name:'testName', password: passwordHash});
        await user.save();
    });

    
    afterAll(() => {
        server.close();
        mongoose.connection.close();
    })

    test('Works as expected creating a fresh username', async () => {
        const usersAtStart = await getUsers();

        const newUser = {
            username: 'jaco',
            name: 'jacoTest',
            password: '12345'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-type', /application\/json/);

        const usersAtEnd = await getUsers();
        const usernames = usersAtEnd.map(user => user.username);

        expect(usersAtStart).toHaveLength(1);
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
        expect(usernames).toContain(newUser.username);
    });

    test('Creation fails with proper statuscode and message if username is already taken', async () => {
        const usersAtStart = await getUsers();
        const newUser = {username: 'testUser', name:'whoever', password: '12345'};

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(500)
            .expect('Content-type', /application\/json/);
        
        const usersAtEnd = await getUsers();
        
        expect(usersAtStart).toHaveLength(1);
        expect(usersAtEnd).toHaveLength(1);
        expect(result.body.ok).toBeFalsy();
    })
})