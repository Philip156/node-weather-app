const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Set up handlebars (hbs) engine and paths to views
app.set('view engine', 'hbs')

// Set up static directory to serve
app.use(express.static(path.join(__dirname, '../public')))
// app.set('views', path.join(__dirname, '../templates'))  => exapmle of changing the default directory for views
hbs.registerPartials(path.join(__dirname, '../views/partials'))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Welcome to the Weather App!',
        name: 'Phil Savenok'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About me',
        name: 'Phil Savenok'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'Help center',
        name: 'Phil Savnok',
        helpMessage: 'This is a welcome page to help you with Express'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({
            error: 'Please provide an address and try again'
        })
    } else {
        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if (error) {
                return res.send({error})
            }
        
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({error})
                }
                
                res.send({
                    address: req.query.address,
                    location: location,
                    forecast: forecastData
                })
            })
        })
    }
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'you must provide a search term'
        })
    } else {
        console.log(req.query.search)
        res.send({
            products: []
        })
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Phil Savnok',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 404,
        name: 'Phil Savnok',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up and running...')
})