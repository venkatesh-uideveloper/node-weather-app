const request = require('request');

const foreCate = (lat, log, callback) => {
	const url =
		'http://api.weatherstack.com/current?access_key=e9ad83756a1af49e7244292161df2396&query=' +
		lat +
		',' +
		log +
		'&units=f';

	request({ url: url, json: true }, (err, res) => {
		if (err) {
			callback('unable to connect to weather service!', undefined);
		} else {
			callback(
				undefined,
				res.body.current.weather_descriptions[0] +
					'. It is currently ' +
					res.body.current.temperature +
					' degree out. it feels like ' +
					res.body.current.feelslike +
					' degree out.'
			);
		}
	});
};

module.exports = foreCate;
