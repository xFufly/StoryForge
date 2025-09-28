// API endpoint for getting board data in JSON format
const { language } = require("../../../../../config.json");
const translations = require(`../../../../../translations/${language}.json`);
const fs = require('fs');
const path = require('path');

function route(req, res) {
    const projectName = req.query.project;

    if (!projectName) {
        return res.status(400).json({ 
            error: translations.api.errors.missingParameters,
            required: ['project']
        });
    }

    const dataPath = path.join(__dirname, '../../../../../data.json');
    
    if (!fs.existsSync(dataPath)) {
        return res.status(404).json({ error: translations.api.errors.projectNotFound });
    }

    try {
        const content = fs.readFileSync(dataPath, 'utf8');
        const data = JSON.parse(content);

        const project = data.projects.find(p => p.name === projectName);
        
        if (!project) {
            return res.status(404).json({ error: translations.api.errors.projectNotFound });
        }

        const stories = project.backlog.userStories || [];

        // Group stories by priority then by status
        const grouped = {};
        stories.forEach(story => {
            if (!grouped[story.priority]) grouped[story.priority] = {};
            if (!grouped[story.priority][story.status]) grouped[story.priority][story.status] = [];
            grouped[story.priority][story.status].push(story);
        });

        // Sort priorities descending
        const sortedPriorities = Object.keys(grouped).sort((a,b) => b - a);

        res.status(200).json({
            project: {
                name: project.name,
                description: project.description
            },
            stories: stories,
            grouped: grouped,
            sortedPriorities: sortedPriorities,
            backlog: project.backlog
        });

    } catch (error) {
        console.error('Error getting board data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = route;