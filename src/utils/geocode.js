const request = require('request');

const geocode = (address, callback) => {
    const geocode_key =
        'pk.eyJ1IjoicGF0cmlja2Nhc3RybyIsImEiOiJjazh2cG00ZXMwbzh1M2ZudjN1eHN1dWF5In0.tMfptrlRDmN_kBtt9xs2oQ';

    const mp_url =
        'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
        encodeURIComponent(address) +
        '.json?access_token=' +
        encodeURIComponent(geocode_key);

    request({ url: mp_url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Error! Cannot connect to mapbox services.', undefined);
        } else if (body.features.length === 0) {
            callback('No results. Try again!', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name,
            });
        }
    });
};

module.exports = geocode;
