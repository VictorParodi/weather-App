const request = require('request');

let getWeather = (lat, lng, callback) => {
    request(
        {
            url: `https://api.darksky.net/forecast/329e710df28069686ea5a69bea3581c0/${lat},${lng}`,
            json: true
        }, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                callback(undefined, {
                    temperature: body.currently.temperature,
                    apparentTemperature: body.currently.apparentTemperature
                });
            } else {
                callback('Unable to connect Dark Sky.');
            }
        });
} 

module.exports = {
    getWeather
}