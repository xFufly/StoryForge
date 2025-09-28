// API endpoint for updating story status
const { language } = require("../../../../../config.json");
const translations = require(`../../../../../translations/${language}.json`);
const fs = require('fs');
const path = require('path');

function route(req, res) {
    const projectName = req.query.project || req.body.project;
    const storyId = req.params.id || req.body.id;
    const newStatus = req.body.status;
    
    const validStatuses = ['TODO', 'PROGRESS', 'TESTING', 'DONE'];

    if (!projectName || storyId === undefined || !newStatus) {
        return res.status(400).json({ 
            error: translations.api.errors.missingParameters,
            required: ['project', 'id', 'status']
        });
    }
    
    if (!validStatuses.includes(newStatus)) {
        return res.status(400).json({ 
            error: translations.api.errors.invalidData,
            message: `Status must be one of: ${validStatuses.join(', ')}`
        });
    }

    const dataPath = path.join(__dirname, '../../../../../data.json');
    
    if (!fs.existsSync(dataPath)) {
        return res.status(404).json({ error: translations.api.errors.projectNotFound });
    }

    try {
        const content = fs.readFileSync(dataPath, 'utf8');
        const data = JSON.parse(content);

        const projectIndex = data.projects.findIndex(p => p.name === projectName);
        
        if (projectIndex === -1) {
            return res.status(404).json({ error: translations.api.errors.projectNotFound });
        }

        const project = data.projects[projectIndex];
        const storyIndex = project.backlog.userStories.findIndex(s => s.id == storyId);
        
        if (storyIndex === -1) {
            return res.status(404).json({ error: 'Story not found' });
        }

        // Update the story status
        project.backlog.userStories[storyIndex].status = newStatus;
        
        // Save the updated data
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

        res.status(200).json({ 
            message: 'Story status updated successfully',
            story: project.backlog.userStories[storyIndex]
        });

    } catch (error) {
        console.error('Error updating story status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = route;