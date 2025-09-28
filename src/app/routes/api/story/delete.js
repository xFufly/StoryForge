// Route handler for deleting a user story
const { language } = require("../../../../../config.json");
const translations = require(`../../../../../translations/${language}.json`);
const fs = require('fs');
const path = require('path');

function route(req, res) {
    const projectName = req.query.project;
    const storyId = req.params.id || req.query.id;
    
    if (!projectName || storyId === undefined) {
        return res.status(400).json({ error: translations.api.errors.missingParameters });
    }

    const dataPath = path.join(__dirname, '../../../../../data.json');
    
    if (!fs.existsSync(dataPath)) {
        return res.status(404).json({ error: translations.api.errors.projectNotFound });
    }

    const content = fs.readFileSync(dataPath, 'utf8');
    const data = JSON.parse(content);

    const projectIndex = data.projects.findIndex(p => p.name === projectName);
    
    if (projectIndex === -1) {
        return res.status(404).json({ error: translations.api.errors.projectNotFound });
    }

    const project = data.projects[projectIndex];
    const storyIndex = project.backlog.userStories.findIndex(s => s.id == storyId);
    
    if (storyIndex === -1) {
        return res.status(404).json({ error: translations.api.errors.storyNotFound });
    }

    // Remove the story from the array
    project.backlog.userStories.splice(storyIndex, 1);
    
    // Re-index the remaining stories to maintain sequential IDs
    project.backlog.userStories.forEach((story, index) => {
        story.id = index;
    });
    
    // Save the updated data
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

    // Redirect back to stories page or send success response
    if (req.headers.accept && req.headers.accept.includes('application/json')) {
        res.status(200).json({ message: translations.api.successes.storyDeleted });
    } else {
        res.redirect(`/stories?project=${projectName}`);
    }
}

module.exports = route;