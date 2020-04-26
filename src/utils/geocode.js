const request = require('request');

const geoCode = (address, callback) => {
	const url =
		'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
		address +
		'.json?access_token=pk.eyJ1IjoidmVua2F0ZXNocGF0bmFtIiwiYSI6ImNrOWZ1MG9zaTA5dmMzbmtjaHN2eWtud3cifQ.G-PXADEIe1Np5gfwgPS-XA&limit=1';

	request({ url: url, json: true }, (err, { body }) => {
		if (err) {
			callback('unable to connect to location service!', undefined);
		} else if (body.features.length === 0) {
			callback('Unable to find location. Try another search.', undefined);
		} else {
			callback(undefined, {
				latitude: body.features[0].center[1],
				longitude: body.features[0].center[0],
				location: body.features[0].place_name,
			});
		}
	});
};

module.exports = geoCode;
