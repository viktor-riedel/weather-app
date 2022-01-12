const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast')

const index = express();
const port = process.env.PORT || 3000;

//define paths fro express
const public_path = path.join(__dirname, '../public');
const views_path = path.join(__dirname, '../templates/views');
const partials_path = path.join(__dirname, '../templates/partials');

//hbs settings
index.set('view engine', 'hbs');
index.set('views', views_path);
hbs.registerPartials(partials_path);
index.use(express.static(public_path))


index.get('', function(req, res) {
    res.render('index', {
        title: 'Weather',
        name: 'Viktor',
    });
});

index.get('', function(req, res) {
    res.render('index', {
        title: 'There is a weather main index page',
        name: null,
    });
});

index.get('/help', (req, res) => {
    res.render('index', {
        title: 'Help',
        name: 'Viktor',
    });
})

index.get('/help/*', (req, res) => {
    res.render('404', {
        name: 'Viktor',
        error_message: 'This help article not found'
    });
})


index.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Viktor',
    });
})

index.get('/weather', (req, res) => {
    const address = req.query.address;
    if (!address) {
        return res.send({
            error: 'no address provided'
        })
    }

    forecast(address).then(resp => {
        res.render('weather', {
            title: 'Check weather',
            name: 'Viktor',
            city: req.query.address,
            weather: resp,
        });
    });
})

index.get('/get-weather', (req, res) => {
    const address = req.query.address;
    if (!address) {
        return res.send({
            error: 'no address provided'
        })
    }

    forecast(address).then(resp => {
        res.send(resp);
    });
})


//404 pages
index.get('*', (req, resp) => {
    resp.render('404', {
        title: '404 page not found',
        name: 'Viktor'
    })
});


index.listen(port, () => {
    console.log('Server started at port ' + port)
});
