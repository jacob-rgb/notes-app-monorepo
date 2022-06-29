require('dotenv').config();
const mongoose = require('mongoose');

const {MONGODB_URI, MONGODB_URI_TEST, NODE_ENV, PORT } = process.env;

const connectionString = NODE_ENV === 'test'
? MONGODB_URI_TEST
: MONGODB_URI

 mongoose.connect(connectionString , {
    useNewUrlParser: true,
}).then(() => {
    console.log('DB Connected');
}).catch(err => console.log(err));

module.exports = mongoose;