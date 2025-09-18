const { language } = require("../../../config.json");
const translations = require(`../../../translations/${language}.json`);
const fs = require("fs");

function route(req, res) {
    const content = fs.readFileSync('./data.json', 'utf8')
    const localdata = JSON.parse(content)

    let projects = localdata.projects || [];

    projects = projects.filter(p => p.name === req.query.project);

    if (projects.length === 0) {
        return res.status(404).send('Project not found');
    }

    const data = {
        lang: translations.webui.widgets.projects,
        stories: projects[0].userstories
    };
    
    res.render('pages/project', data);
}

module.exports = route;