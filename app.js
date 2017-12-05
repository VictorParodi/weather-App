const request = require('request');
const yargs = require('yargs');

request({
    url: 'https://maps.googleapis.com/maps/api/geocode/json?address=1301%20lombard%20street%20philadelphia',
    json: true
}, (error, response, body) => {
    console.log(`Address: ${body.results[0].formatted_address}`);
    console.log(`Latitud: ${body.results[0].geometry.location.lat}`);
    console.log(`Longitud: ${body.results[0].geometry.location.lng}`);
});