const request = require('request');

let geocodeAddress = (address, callback) => {
    let encodedAddress = decodeURIComponent(address);
    
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to Google servers.');
        } else if (body.status === 'INVALID_REQUEST' || body.status === 'ZERO_RESULTS') {
            callback('Unable to find that address.');
        } else if (body.status === 'OK') {
            callback(undefined, {
                Address: body.results[0].formatted_address,
                Latitud: body.results[0].geometry.location.lat,
                Longitud: body.results[0].geometry.location.lng
            });
        }
    });
}

module.exports = {
    geocodeAddress
}