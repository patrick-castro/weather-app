const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const weather_key = '597ee7d575e19d6214e2573496a5b6d3';
    const owm_url =
        'http://api.openweathermap.org/data/2.5/weather?lat=' +
        encodeURIComponent(latitude) +
        '&lon=' +
        encodeURIComponent(longitude) +
        '&appid=' +
        encodeURIComponent(weather_key);

    request({ url: owm_url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Error! Cannot connect to openweathermap services.', undefined);
        } else if (body.cod === '400') {
            callback(body.message, undefined);
        } else {
            callback(undefined, {
                message:
                    'It is ' +
                    body.main.temp +
                    ' degrees out with a temperature high of ' +
                    body.main.temp_max +
                    ' degrees and temperature low of ' +
                    body.main.temp_min +
                    ' degrees.',
                status: capitalizeFLetter(body.weather[0].description),
            });
        }
    });
};

const capitalizeFLetter = (word) => word[0].toUpperCase() + word.slice(1, word.length);

// temp: body.main.temp,
// feels_like: body.main.feels_like,
// temp_max: body.main.temp_max, // temperature high
// temp_min: body.main.temp_min, // temperature low

module.exports = forecast;
