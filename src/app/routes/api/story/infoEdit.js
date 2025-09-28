// Route handler for editing a user story's information
const UserStory = require('../../../../objects/UserStory');
const { language } = require("../../../../../config.json");
const translations = require(`../../../../../translations/${language}.json`);
const fs = require('fs');
const path = require('path');
const StoryInstructions = require('../../../../objects/StoryInstructions');
const TestInstructions = require('../../../../objects/TestInstructions');

function route(req, res) {
    const projectName = req.query.project;
    const storyId = parseInt(req.query.id, 10);
    if (!projectName) {
        return res.status(400).send('Project query parameter is required');
    }
    if (isNaN(storyId)) {
        return res.status(400).send('Valid Story ID query parameter is required');
    }

    const { title, description, priority, points, status } = req.body;
    const validStatuses = ['TODO', 'PROGRESS', 'TESTING', 'DONE'];

    if (!title || !priority || !points || !status) {
        return res.status(400).send('Missing required fields: title, priority, points, status');
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
        return res.status(404).send('Project not found');
    }

    const storyIndex = projects[projectIndex].backlog.userStories.findIndex(s => s.id === storyId);

    if (storyIndex === -1) {
        return res.status(404).send('Story not found');
    }

    // Update the story with new values
    const updatedStory = new UserStory(
        storyId,
        title,
        description || '',
        priority,
        parseInt(points, 10),
        status,
        projects[projectIndex].backlog.userStories[storyIndex].creationDate,
        projects[projectIndex].backlog.userStories[storyIndex].baseInstructions ? StoryInstructions.fromJSON(projects[projectIndex].backlog.userStories[storyIndex].baseInstructions) : null,
        projects[projectIndex].backlog.userStories[storyIndex].testInstructions ? TestInstructions.fromJSON(projects[projectIndex].backlog.userStories[storyIndex].testInstructions) : null
    );

    projects[projectIndex].backlog.userStories[storyIndex] = updatedStory.toJSON();

    fs.writeFileSync(dataPath, JSON.stringify(localdata, null, 2));

    res.redirect(`/editStoryDesc?project=${projectName}&id=${storyId}`);
}

module.exports = route;