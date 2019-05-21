const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/1ea50b2e7219c574f94fa2f66738f4c4/` + `${latitude},` + `${longitude}` + `?units=si`;
    request({url: url, json: true}, (error, response) => {
        if(error) {
            callback('Unable to connect to weather api', undefined);
        } else if(response.body.error) {
            callback(response.body.error, undefined);
        } else {
            callback(undefined, response.body);
        }
    })
}

module.exports = forecast;