const { language } = require("../../../config.json");
const translations = require(`../../../translations/${language}.json`);
const fs = require('fs');
const path = require('path');

function route(req, res) {

    const projectName = req.query.project;
    const storyId = req.query.id;
    if (!projectName) {
        return res.status(400).send('Project query parameter is required');
    }
    if (!storyId) {
        return res.status(400).send('Story ID query parameter is required');
    }

    const dataPath = path.join(__dirname, '../../../data.json');
    const content = fs.readFileSync(dataPath, 'utf8');
    const localdata = JSON.parse(content);

    let projects = localdata.projects || [];

    const projectIndex = projects.findIndex(p => p.name === projectName);

    if (projectIndex === -1) {
        return res.status(404).send('Project not found');
    }

    const storyIndex = projects[projectIndex].backlog.userStories.findIndex(s => s.id === parseInt(storyId));

    if (storyIndex === -1) {
        return res.status(404).send('Story not found');
    }

    // Get the current story data
    const currentStory = projects[projectIndex].backlog.userStories[storyIndex];

    // Get the current story test instructions data
    const currentInstructions = currentStory.testInstructions || { given: '', when: '', and: [], but: '', then: '', andThen: [] };

    const data = {
        "projectName": projectName,
        "storyId": storyId,
        "title": projectName + " | " + translations.webui.widgets.userstories.editTests.title,
        "lang": translations.webui.widgets,
        "currentTests": currentInstructions
    }
    res.render('pages/editStoryTests', data);
}

module.exports = route;