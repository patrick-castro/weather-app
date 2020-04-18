const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const path = require('path');

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs'); // Tells express to use hbs
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Assigns the public folder to contain static files
app.use(express.static(publicDirectoryPath));

// Index page
// req(uest) = Incoming request.
// res(ponse) = Customize what we want to send back to the requester.
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Patrick Antonio N. Castro',
    });
});

// About page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Patrick Antonio N. Castro',
    });
});

// Help page
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Patrick Antonio N. Castro',
        helpText: 'This is some helpful text.',
    });
});

// API for getting weather data to be displayed in the index page
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        // Prompts an error if there is no address query string
        return res.send({ error: 'You must provide an address' });
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }
        forecast(latitude, longitude, (error, { message, status }) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                location,
                message,
                status,
            });
        });
    });
});

// Redirects to the 404 page if the user type in an extension to '/help/'
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Patrick Antonio N. Castro',
        errorMessage: 'Help article not found!',
    });
});

// Redirects the 404 page if the page doesn't exist
// This must be last in the routing
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Patrick Antonio N. Castro',
        errorMessage: 'Page not found!',
    });
});

// Starts the server
app.listen(3000, () => {
    console.log('Server is running!');
});
