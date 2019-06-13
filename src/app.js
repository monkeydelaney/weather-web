const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//Define paths for express.config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

//set up handlebars engine and views location
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//set up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: ' Alan Cracknell'
    });
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: ' Alan Cracknell'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        message: `Just enter a location and I'll tell you what the weather is like`,
        title: "Help",
        name: "Alan Cracknell"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide a location'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location}= {}) => {
        if (error) {
            return res.send({error});
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error});
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address             
            });

        })


    })

})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error',{
        message: 'help article not found. But you are in the right place ..ish'
    });
})

app.get('*', (req, res) => {
    res.render('error',{
        message: 'I think you have taken a wrong turn. Nothing to see here.'
    });
})

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});
