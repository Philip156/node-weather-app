const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url =`https://api.darksky.net/forecast/cc2a3515c441bf4919a1b287bd93bbbd/${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}`
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to forecast')
        } else if (body.error) {
            callback('Unable to find the location')
        } else {
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. Daily high is ${body.daily.data[0].temperatureHigh} with a low of ${body.daily.data[0].temperatureLow}. There is a ${body.currently.precipProbability}% chance of rain.`)
        }
    })
}

module.exports = forecast