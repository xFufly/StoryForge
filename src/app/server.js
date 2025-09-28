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
const editStoryDescRoute = require("./routes/editStoryDesc");
const editStoryTestsRoute = require("./routes/editStoryTests");
const whiteBoardProductBacklogRoute = require("./routes/whiteBoardProductBacklog");
const deleteProjectRoute = require("./routes/deleteProject");
const deleteStoryRoute = require("./routes/deleteStory");

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
const createProjectApiRoute = require("./routes/api/project/create");
const createStoryApiRoute = require("./routes/api/story/create");
const editStoryInfoApiRoute = require("./routes/api/story/infoEdit");
const editStoryDescApiRoute = require("./routes/api/story/descEdit");
const editStoryTestsApiRoute = require("./routes/api/story/testsEdit");
const deleteProjectApiRoute = require("./routes/api/project/delete");
const deleteStoryApiRoute = require("./routes/api/story/delete");
const updateStoryStatusApiRoute = require("./routes/api/story/updateStatus");
const updateStoryPriorityApiRoute = require("./routes/api/story/updatePriority");
const getBoardDataApiRoute = require("./routes/api/board/getData");

app.use('/api/projects/create', createProjectApiRoute);
app.use('/api/story/create', createStoryApiRoute);
app.use('/api/story/infoEdit', editStoryInfoApiRoute);
app.use('/api/story/descEdit', editStoryDescApiRoute);
app.use('/api/story/testsEdit', editStoryTestsApiRoute);
app.use('/api/projects/delete', deleteProjectApiRoute);
app.use('/api/story/delete', deleteStoryApiRoute);
app.use('/api/story/updateStatus', updateStoryStatusApiRoute);
app.use('/api/story/updatePriority', updateStoryPriorityApiRoute);
app.use('/api/board/getData', getBoardDataApiRoute);

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
app.get('/editStoryDesc', editStoryDescRoute);
app.get('/editStoryTests', editStoryTestsRoute);
app.get('/whiteBoardProductBacklog', whiteBoardProductBacklogRoute);
app.get('/deleteProject', deleteProjectRoute);
app.get('/deleteStory', deleteStoryRoute);

// Start the server

app.listen(port, () => {
    console.log(`${translations.webui.listening} ${port}.`);
});