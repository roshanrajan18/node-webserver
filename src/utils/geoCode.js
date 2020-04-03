const request = require('request')

const geoCode = (address, callBack) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoicm9zaGFucmFqYW4yMiIsImEiOiJjazVicm0yMTkxYWN2M2ZwbnR1ZHo3cmRqIn0.GRPyovyiUNAwAdb82iXszA&limit=1'

    request({url:url, json:true}, (error, response) => {
        if (error) {
            callBack('Unable to connect to MapBox', undefined)
        } else if (response.body.features.length === 0) {
            callBack('Location not found', undefined)
        } else {
            callBack(undefined, {
                lattitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })

}

module.exports = geoCode