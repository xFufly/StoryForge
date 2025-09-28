// Route handler for the delete story page
const { language } = require("../../../config.json");
const translations = require(`../../../translations/${language}.json`);

function route(req, res) {
    const projectName = req.query.project;
    const storyId = req.query.id;
    
    if (!projectName || !storyId) {
        return res.status(400).send('Missing project or story ID');
    }

    // For now, directly call the delete API
    // In a real application, you might want to show a confirmation page
    const deleteHandler = require('./api/story/delete');
    deleteHandler(req, res);
}

module.exports = route;