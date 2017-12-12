const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

let encodedAddress = encodeURIComponent(argv.address);
let geocodeAddress = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeAddress).then((response) => {
    if (response.data.status === 'ZERO_RESULTS' || response.status === 'INVALID_REQUEST') {
        throw new Error('Unable to find that address.');
    }

    const {formatted_address, geometry} = response.data.results[0];

    let lat = geometry.location.lat;
    let lng = geometry.location.lng;
    let weatherUrl = `https://api.darksky.net/forecast/329e710df28069686ea5a69bea3581c0/${lat},${lng}`;

    console.log(formatted_address);

    return axios.get(weatherUrl);

}).then((response) => {
    const {temperature, apparentTemperature} = response.data.currently;
    console.log(`It's currntly ${temperature}. It feel ${apparentTemperature}`);
}).catch((error) => {
    if (error.code === 'ENOTFOUND') {
        console.log('Unable to connect API servers');
    }

    console.log(error.message);
});



