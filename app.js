const express = require('express');
const app = express();

//set up body parser
app.use(express.json());

const dotenv = require('dotenv');
dotenv.config({path: './config/config.env'});

//import database connection
const connectDatabase = require('./config/database');

//Connect to database
connectDatabase();

//importing all routes
const users = require('./routes/users');

app.use(users);

app.all('*', (req, res, next) => {
    next(console.log(`${req.originalUrl} route not found`));

});

//Listen to port
const PORT = process.env.PORT;

app.listen( PORT, () => {
    console.log(`Listening on port: ${process.env.PORT}`)
});

module.exports = app;

