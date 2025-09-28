// Route handler for creating a new project
const Product = require("../../../../objects/Product");
const { language } = require("../../../../../config.json");
const translations = require(`../../../../../translations/${language}.json`);
const fs = require('fs');
const path = require('path');


function route(req, res) {
    const { name, description } = req.body;
    
    if (!name || !description) {
        return res.status(400).send({ error: translations.api.errors.missingParameters });
    }

    // Saving the new project to data.json (create it if it does not exist)

    const dataFilePath = path.join(__dirname, '../../../../../data.json');
    let data = { projects: [] };
    
    if (fs.existsSync(dataFilePath)) {
        const fileContent = fs.readFileSync(dataFilePath);
        data = JSON.parse(fileContent);
    }

    // Check if project with this name already exists
    const existingProject = data.projects.find(p => p.name === name);
    if (existingProject) {
        return res.status(400).send({ error: translations.api.errors.projectExists });
    }

    const newProject = new Product(name, description, "PO Name", "SM Name");
    data.projects.push(newProject.toJSON());
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));

    // Redirect to the project list

    res.status(201).redirect('/');
}

module.exports = route;
