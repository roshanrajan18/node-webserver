const request = require('request')
const forecastForLocation = (lattitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/5dfb29bcdae6e6b378851119a280b12b/` + lattitude + `,` + longitude

    request({url: url, json:true}, (error, response) => {
        if (error) {
            console.log("Received Low Level error", error)
            callback(error)
        }
        if (response.body.error) {
            const error = {
                errorCode : response.body.code,
                errorMessage : response.body.error
            }
            callback(error)
        } else if (response) {
            const forecast = {
                currently: response.body.currently.summary,
                daily: response.body.daily.summary,
            }
            callback(undefined, forecast)
        }
    })
}

module.exports = {getForecastForGivenCoordinates : forecastForLocation}