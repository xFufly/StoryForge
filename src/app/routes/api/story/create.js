// Route handler for creating a new user story
const UserStory = require('../../../../objects/UserStory');
const { language } = require("../../../../../config.json");
const translations = require(`../../../../../translations/${language}.json`);
const fs = require('fs');
const path = require('path');


function route(req, res) {
    const projectName = req.query.project;
    if (!projectName) {
        return res.status(400).send('Project query parameter is required');
    }

    const { title, description, priority, points, status } = req.body;
    const validStatuses = ['TODO', 'PROGRESS', 'TESTING', 'DONE'];

    if (!title || !priority || !points || !status) {
        return res.status(400).send({ error: translations.api.errors.missingParameters });
    }
    
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ 
            error: translations.api.errors.invalidData,
            message: `Status must be one of: ${validStatuses.join(', ')}`
        });
    }

    const dataPath = path.join(__dirname, '../../../../../data.json');
    const content = fs.readFileSync(dataPath, 'utf8');
    const localdata = JSON.parse(content);

    let projects = localdata.projects || [];

    const projectIndex = projects.findIndex(p => p.name === projectName);

    if (projectIndex === -1) {
        return res.status(404).send({ error: translations.api.errors.projectNotFound });
    }

    const newStory = new UserStory(projects[projectIndex].backlog.userStories.length, title, description || '', priority, parseInt(points), status);
    projects[projectIndex].backlog.userStories.push(newStory.toJSON());

    fs.writeFileSync(dataPath, JSON.stringify(localdata, null, 2));

    res.redirect(`/stories?project=${projectName}`);
}

module.exports = route;
