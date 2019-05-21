const request = require('request');

const geoCode = (address, callback) => {
    const geourl = `https://api.mapbox.com/geocoding/v5/mapbox.places/` + encodeURIComponent(address) +  `.json?access_token=pk.eyJ1IjoidGFueTA5IiwiYSI6ImNqdndoNXFydjFqbGo0M21rcDV4enp4bmoifQ.rD0QI52qdqhVWpTJHE8Pvw&limit=1`

    request({url: geourl, json: true}, (error, response) => {
        if(error) {
            callback('Unable to connect to geolocation server', undefined);
        } else if(response.body.features.length === 0) {
            callback('Unable to find search location', undefined);
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                name: response.body.features[0].place_name
            });
        }
    });
}

module.exports = geoCode;