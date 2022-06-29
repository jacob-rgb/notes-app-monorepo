const { login } = require('../controllers/auth.controller');
const { getUserAndIdByToken } = require('../middlewares/getToken');

const authRouter = require('express').Router();

authRouter.post('/login', login)

module.exports = authRouter;