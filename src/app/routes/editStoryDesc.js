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

    // Get the current story instructions data
    const currentInstructions = currentStory.baseInstructions || { role: '', goal: '', benefit: '' };

    const data = {
        title: projectName + " | " + translations.webui.widgets.userstories.edit.title,
        back: `/stories?project=${projectName}`,
        form: {
            desc: translations.webui.widgets.userstories.edit.desc,
            action: `/api/story/descEdit?project=${projectName}&id=${storyId}`,
            submitLabel: translations.webui.widgets.userstories.edit.next,
            // Set the fields value by default to the current story instructions values
            fields: [
                { name: translations.webui.widgets.userstories.edit.fields.as.name, id: "as", type: "text", required: true, value: currentInstructions.role },
                { name: translations.webui.widgets.userstories.edit.fields.IWantsTo.name, id: "IWantsTo", type: "text", required: true, value: currentInstructions.goal },
                { name: translations.webui.widgets.userstories.edit.fields.SoThat.name, id: "SoThat", type: "text", required: false, value: currentInstructions.benefit }
            ]
        }
    };
    
    res.render('pages/form', data);
}

module.exports = route;