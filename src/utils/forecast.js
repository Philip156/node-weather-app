const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url =`https://api.darksky.net/forecast/cc2a3515c441bf4919a1b287bd93bbbd/${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}`
    request({url, json: true}, (error, {body}) => {
        console.log(body)
        if (error) {
            callback('Unable to connect to forecast')
        } else if (body.error) {
            callback('Unable to find the location')
        } else {
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain. Daily high: ${body.daily.data[0].temperatureHigh} and low: ${body.daily.data[0].temperatureLow}`)
        }
    })
}

module.exports = forecast