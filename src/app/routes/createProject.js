const { language } = require("../../../config.json");
const translations = require(`../../../translations/${language}.json`);

function route(req, res) {
    const data = {
        title: translations.webui.widgets.projects.create.title,
        form: {
            desc: translations.webui.widgets.projects.create.desc,
            action: '/api/projects/create',
            submitLabel: translations.webui.widgets.projects.create.button,
            fields: [
                { name: translations.webui.widgets.projects.create.fields.name.name, type: 'text', placeholder: translations.webui.widgets.projects.create.fields.name.placeholder, id: 'name' },
                { name: translations.webui.widgets.projects.create.fields.description.name, type: 'test', placeholder: translations.webui.widgets.projects.create.fields.description.placeholder, id: 'description' }
            ]
        }
    };
    
    res.render('pages/form', data);
}

module.exports = route;