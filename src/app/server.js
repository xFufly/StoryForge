const express = require('express');
const app = express();

const { port, language } = require("../../config.json");
const translations = require(`../../translations/${language}.json`);

// Routes
const indexRoute = require("./routes/index");
const createProjectRoute = require("./routes/createProject");
const projectRoute = require("./routes/project");

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
const createProjectApiRoute = require("./routes/api/project/create");
app.use('/api/projects/create', createProjectApiRoute);

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the views directory (where templates will be stored)
app.set('views', './src/app/views');

// Set the public directory (where static files will be stored)
app.use(express.static('./src/app/public'))

app.get('/', indexRoute);
app.get('/createProject', createProjectRoute);
app.get('/project', projectRoute);

// Start the server

app.listen(port, () => {
    console.log(`${translations.webui.listening} ${port}.`);
});