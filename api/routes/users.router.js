const { Router } = require('express');
const { createUser, getUsers } = require('../controllers/users.controller');

const usersRouter = Router();

usersRouter.get('/', getUsers )

usersRouter.post('/', createUser)


module.exports = usersRouter;