// Route handler for editing a user story's tests
const UserStory = require('../../../../objects/UserStory');
const { language } = require("../../../../../config.json");
const translations = require(`../../../../../translations/${language}.json`);
const fs = require('fs');
const path = require('path');

function route(req, res) {
    const projectName = req.query.project;
    const storyId = parseInt(req.query.id, 10);

    if (!projectName || isNaN(storyId)) {
        return res.status(400).send('Project and valid storyId query parameters are required');
    }

    const { tests } = req.body;

    if (!tests) {
        return res.status(400).send('Missing required field: tests');
    }

    const dataPath = path.join(__dirname, '../../../../../data.json');
    const content = fs.readFileSync(dataPath, 'utf8');
    const localdata = JSON.parse(content);

    let projects = localdata.projects || [];

    const projectIndex = projects.findIndex(p => p.name === projectName);

    if (projectIndex === -1) {
        return res.status(404).send('Project not found');
    }

    const storyIndex = projects[projectIndex].backlog.userStories.findIndex(s => s.id === storyId);

    if (storyIndex === -1) {
        return res.status(404).send('User story not found');
    }

    // TODO : Get tests from req.body

    fs.writeFileSync(dataPath, JSON.stringify(localdata, null, 2));

    res.redirect(`/stories?project=${projectName}`);
}

module.exports = route;