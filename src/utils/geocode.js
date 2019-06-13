const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibW9ua2V5ZGVsYW5leSIsImEiOiJjandtYjVtZXMxMzB2M3luc3k4cDg1bGR3In0.82ZSRp6Dmk8WnNipV-z-YQ&limit=1';
    request({ url, json: true }, (error, {body}) =>{
        if (error) {
            callback('Unable to connect to location services');
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search')
        } else {
            callback(undefined, {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    
})}

module.exports = geocode;