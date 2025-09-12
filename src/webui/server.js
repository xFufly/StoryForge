const express = require('express');
const app = express();

const { port, language } = require("../../config.json");
const translations = require(`../../translations/${language}.json`);

// Routes
const indexRoute = require("./routes/index");

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the views directory (where templates will be stored)
app.set('views', './src/webui/views');

// Set the public directory (where static files will be stored)
app.use(express.static('./src/webui/public'))

app.get('/', indexRoute);

app.listen(port, () => {
    console.log(`${translations.webui.listening} ${port}.`);
});