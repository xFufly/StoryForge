// Route handler for deleting a project
const { language } = require("../../../../../config.json");
const translations = require(`../../../../../translations/${language}.json`);
const fs = require('fs');
const path = require('path');

function route(req, res) {
    const projectName = req.query.project;
    
    if (!projectName) {
        return res.status(400).json({ error: translations.api.errors.missingParameters });
    }

    const dataFilePath = path.join(__dirname, '../../../../../data.json');
    
    if (!fs.existsSync(dataFilePath)) {
        return res.status(404).json({ error: translations.api.errors.projectNotFound });
    }

    const fileContent = fs.readFileSync(dataFilePath);
    const data = JSON.parse(fileContent);

    const projectIndex = data.projects.findIndex(p => p.name === projectName);
    
    if (projectIndex === -1) {
        return res.status(404).json({ error: translations.api.errors.projectNotFound });
    }

    // Remove the project from the array
    data.projects.splice(projectIndex, 1);
    
    // Save the updated data
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));

    // Redirect to home page or send success response
    if (req.headers.accept && req.headers.accept.includes('application/json')) {
        res.status(200).json({ message: translations.api.successes.projectDeleted });
    } else {
        res.redirect('/');
    }
}

module.exports = route;