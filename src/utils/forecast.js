const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/3de8fc9643268245bc2de57775466a68/' + latitude + ',' + longitude + '?units=uk2&lang=en';
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to the weather service', undefined)
        }
        else if (body.error){
            callback("Unable to find location");
        }
        else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain. ' + body.daily.summary);
        }
    })

}

module.exports = forecast;

