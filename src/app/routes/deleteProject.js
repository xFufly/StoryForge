// Route handler for the delete project page  
const { language } = require("../../../config.json");
const translations = require(`../../../translations/${language}.json`);

function route(req, res) {
    const projectName = req.query.project;
    
    if (!projectName) {
        return res.status(400).send('Missing project name');
    }

    // For now, directly call the delete API
    // In a real application, you might want to show a confirmation page
    const deleteHandler = require('./api/project/delete');
    deleteHandler(req, res);
}

module.exports = route;