const express = require('express');
const app = express();

const fs = require('fs');
const path = require('path');

const { port, language } = require("../../config.json");
const translations = require(`../../translations/${language}.json`);

// Create data.json if it doesn't exist
const dataFilePath = path.join(__dirname, '../../data.json');
if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify({ projects: [] }, null, 2));
}

// Routes
const indexRoute = require("./routes/index");
const createProjectRoute = require("./routes/createProject");
const projectRoute = require("./routes/project");
const storiesRoute = require("./routes/stories");
const createStoryRoute = require("./routes/createStory");
const editStoryRoute = require("./routes/editStory");

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
const createProjectApiRoute = require("./routes/api/project/create");
const createStoryApiRoute = require("./routes/api/story/create");

app.use('/api/projects/create', createProjectApiRoute);
app.use('/api/story/create', createStoryApiRoute);

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the views directory (where templates will be stored)
app.set('views', './src/app/views');

// Set the public directory (where static files will be stored)
app.use(express.static('./src/app/public'))

// Define routes
app.get('/', indexRoute);
app.get('/createProject', createProjectRoute);
app.get('/project', projectRoute);
app.get('/stories', storiesRoute);
app.get('/createStory', createStoryRoute);
app.get('/editStory', editStoryRoute);

// Start the server

app.listen(port, () => {
    console.log(`${translations.webui.listening} ${port}.`);
});