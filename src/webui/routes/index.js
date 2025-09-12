function route(req, res) {
    const data = {
        title: 'Home Page',
        user: 'John Doe'
    };
    
    // Render the 'index' view and pass data to it
    res.render('index', data);
}

module.exports = route;