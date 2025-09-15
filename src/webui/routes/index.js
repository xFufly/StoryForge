const { language } = require("../../../config.json");
const translations = require(`../../../translations/${language}.json`);

function route(req, res) {
    const data = {
        widgetTitle: translations.webui.widgets.projects.title
    };
    
    // Render the 'index' view and pass data to it
    res.render('pages/index', data);
}

module.exports = route;