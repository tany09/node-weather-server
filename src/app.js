const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');

const port = process.env.PORT || 3000;

const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

//Define path for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsDirPath = path.join(__dirname, '../templates/views');
const partialsDirPath = path.join(__dirname, '../templates/partials');

//Set handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsDirPath);
hbs.registerPartials(partialsDirPath);

//Set static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Tany'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Tany'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Tany'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide a search term'
        });
    }
    const address = req.query.address;
    geoCode(address, (error, data) => {
        if(error) {
            return res.send({error});
        }
        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if(error) {
                return res.send({error});
            }
            res.send({
                location: data.name,
                forecast: forecastData.currently
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404help', {
        title: 'Help article Not Found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found'
    });
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});

