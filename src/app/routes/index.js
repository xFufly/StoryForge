const { language } = require("../../../config.json");
const translations = require(`../../../translations/${language}.json`);
const localdata = require("../../../data.json");

function route(req, res) {

    let projects = localdata.projects || [];

    const data = {
        lang: translations.webui.widgets.projects,
        projects: projects
    };
    
    // Render the 'index' view and pass data to it
    res.render('pages/index', data);
}

module.exports = route;