const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibHljbGV2ZXIiLCJhIjoiY2pqcmV1MGNmMGd5MTNxbXNyaDA5bmVrZSJ9.nSzvB4fdrUjzCm2mCgcsQw&limit=1`
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to Geolocation')
        } else if (body.features.length === 0) {
            callback('Unable to find the location')
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1], 
                longitude: body.features[0].center[0], 
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode