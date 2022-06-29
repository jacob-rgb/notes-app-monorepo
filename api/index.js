// const http = require('http');
require('dotenv').config();
require('./mongo');

const express = require('express');
const logger = require('./loggerMiddleware');
const cors = require('cors');
const Sentry = require('@sentry/node');
const Tracing = require('@sentry/tracing');


//Models;
const usersRouter = require('./routes/users.router');
const notesRouter = require('./routes/notes.router');
const authRouter = require('./routes/auth.routes');
const testingRouter = require('./routes/testing.router');

const app = express();
const PORT = 3001;

Sentry.init({
    dsn: "https://b0e5aabd3a764c1ebd5870dcda9f8b13@o1292253.ingest.sentry.io/6513722",
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      // enable Express.js middleware tracing
      new Tracing.Integrations.Express({ app }),
    ],
  
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });


app.use(express.json())

app.use(logger);

app.use(cors());

app.use('/images',express.static('images'));

app.use(express.static('../app/build'));

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

let  notes = [];

// const app = http.createServer((request, response) => {
//     response.writeHead(200, { 'Content-type' : 'text/plain'})
//     response.end(JSON.stringify(notes))
// });

app.get('/', async (req, res) => {
    res.status(200).contentType('.html').send('<h1>Hola Mundo desde el server</h1>');
});

// Routes
app.use('/api/auth', authRouter);
app.use('/api/notes', notesRouter);
app.use('/api/users', usersRouter);

if(process.env.NODE_ENV === 'test') {
  app.use('/api/test', testingRouter);
}


// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

app.use((req,res) => {
    res.status(404).end()
})

const server = app.listen( process.env.PORT, ()  => {
    console.log(`Server running on port ${PORT}`);
});

// app.listen(PORT);
// console.log(`Server running on port ${PORT}`)
module.exports = {app, server};