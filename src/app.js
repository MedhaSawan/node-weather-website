const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

// Setup handlerbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Medha Sawan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Medha Sawan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        body: 'This page will provide help. Contact Us: 123@gmail.com.',
        name: 'Medha Sawan'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {} ) => {
        if (error){
            return res.send(error)
        }

        forecast (latitude,longitude, (error, forecastData) => {
            if (error) {
                return res.send(error)
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })

        })
        //console.log(data.location)
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must product a search term'
        })

    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error',{
        title: '404 Error',
        errorMsg: 'Help article not found.',
        name: 'Medha Sawan'
    })
})
app.get('*', (req, res) => {
    res.render('error', {
        title: '404 Error',
        errorMsg: 'Page not found.',
        name: 'Medha Sawan'
    })

})

app.listen(port, () => {
    console.log('Server is up on post ' + port)
})