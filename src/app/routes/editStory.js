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

    const data = {
        title: projectName + " | " + translations.webui.widgets.userstories.edit.title,
        back: `/stories?project=${projectName}`,
        form: {
            desc: translations.webui.widgets.userstories.edit.desc,
            action: `/api/story/infoEdit?project=${projectName}&id=${storyId}`,
            submitLabel: translations.webui.widgets.userstories.edit.next,
            // Set the fields value by default to the current story values
            fields: [
                { name: translations.webui.widgets.userstories.edit.fields.title.name, id: "title", type: "text", required: true, value: currentStory.title },
                { name: translations.webui.widgets.userstories.edit.fields.description.name, id: "description", type: "textarea", required: false, value: currentStory.description },
                { name: translations.webui.widgets.userstories.edit.fields.priority.name, id: "priority", type: "number", required: true, value: currentStory.priority },
                { name: translations.webui.widgets.userstories.edit.fields.points.name, id: "points", type: "number", required: true, value: currentStory.storyPoints },
                { 
                    name: translations.webui.widgets.userstories.edit.fields.status.name, 
                    id: "status", 
                    type: "select", 
                    required: true, 
                    value: currentStory.status,
                    placeholder: translations.webui.widgets.userstories.edit.fields.status.placeholder,
                    options: translations.statuses
                }
            ]
        }
    };
    
    res.render('pages/form', data);
}

module.exports = route;