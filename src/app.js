const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

const appServer = express()
const port = process.env.PORT || 3000

// Paths to specific folders
const publicDirPath = path.join(__dirname, "../public")
const viewDirPath = path.join(__dirname, "../templates/views")
const partialsDirPath = path.join(__dirname, "../templates/partials")

console.log(path.join(__dirname, "../public"))

// Setting properties for handlebars
appServer.set('view engine', 'hbs')
appServer.set('views', viewDirPath)

hbs.registerPartials(partialsDirPath)

// Setting up directory for static content
appServer.use(express.static(publicDirPath))

appServer.get('', (request, response) => {
    console.log("Received request for home page, from host =", request.host.toString())
    response.render('index', {
        title: "Never too late to start",
        name: "Created with love, by Recoil18"
    })
})

appServer.get('/about', (request, response) => {
    console.log("Received request for about page, from host =", request.host.toString())
    response.render('about', {
        title: "Never forget why or for who you do what you do!!!!",
        name: "Created with love, by Recoil18"
    })
})

appServer.get('/help', (request, response) => {
    console.log("Received request for about page, from host =", request.host.toString())
    response.render('help', {
        title: "Welcome to the help page",
        name: "Created with love, by Recoil18"
    })

})

appServer.get('/weather', (request, response) => {
    console.log("Received request for weather page, from host =", request.host.toString())

    const address = request.query.address
    
    if (!address) {
        return response.send({
            error: "No address provided in query string"
        })
    }

    geoCode(address, (error, {lattitude, longitude, location}) => {
        if (error) {
            return response.send({
                error: error
            })
        }

        console.log('Response', lattitude, longitude)

        if (lattitude !== null && longitude !== null) {
            forecast.getForecastForGivenCoordinates(lattitude, longitude, (error, {currently, daily, temperature, feelsLike} = {}) => {

                if (error) {
                    return response.send({
                        error: error
                    })
                } else {
                    response.send({
                        Location: location,
                        Current_Forecast: currently,
                        Daily_Forecast: daily,
                        Temperature: temperature,
                        Feels_Like : feelsLike
                    })
                }
            })
        }
    })
})

appServer.get('/products', (request, response) => {
    if (!request.query.search) {
        return response.send( {
            error: "No search query string provided"
        })
    }
    console.log("Product searched for", request.query.search)

    response.send({
        products:[]
    })
})


appServer.get('/help/*', (request, response) => {
    response.render('404', {
        title: "Opps, looks like your down a rabbit hole",
        message: "Help page not found",
        name: "Created with love, by Recoil18"
    })
})

appServer.get('*', (request, response) => {
    response.render('404', {
        title: "Opps, looks like your down a rabbit hole",
        message: "Page not found",
        name: "Created with love, by Recoil18"
    })
})

appServer.listen(port, () => {
    console.log("Server is up and running on port" , port)
})