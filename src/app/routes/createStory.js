const { language } = require("../../../config.json");
const translations = require(`../../../translations/${language}.json`);

function route(req, res) {

    const projectName = req.query.project;
    if (!projectName) {
        return res.status(400).send('Project query parameter is required');
    }

    const data = {
        title: projectName + " | " + translations.webui.widgets.userstories.create.title,
        back: `/stories?project=${projectName}`,
        form: {
            desc: translations.webui.widgets.userstories.create.desc,
            action: `/api/story/create?project=${projectName}`,
            submitLabel: translations.webui.widgets.userstories.create.button,
            fields: [
                { name: translations.webui.widgets.userstories.create.fields.title.name, id: "title", type: "text", required: true },
                { name: translations.webui.widgets.userstories.create.fields.description.name, id: "description", type: "textarea", required: false },
                { name: translations.webui.widgets.userstories.create.fields.priority.name, id: "priority", type: "number", required: true },
                { name: translations.webui.widgets.userstories.create.fields.points.name, id: "points", type: "number", required: true },
                { name: translations.webui.widgets.userstories.create.fields.status.name, id: "status", type: "text", required: true }
            ]
        }
    };
    
    res.render('pages/form', data);
}

module.exports = route;