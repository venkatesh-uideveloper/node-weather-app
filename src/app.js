const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const foreCate = require('./utils/forecast');

const app = express();

// Define Path for express config
const publicDirPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', function (req, res) {
	res.render('index', {
		title: 'Weather',
		name: 'Venkatesh Patnam',
	});
});
app.get('/about', function (req, res) {
	res.render('about', {
		title: 'About',
		name: 'Venkatesh Patnam',
	});
});
app.get('/help', function (req, res) {
	res.render('help', {
		title: 'Help',
		name: 'Venkatesh Patnam',
	});
});

app.get('/weather', function (req, res) {
	if (!req.query.address) {
		return res.send({
			error: 'you must provide an address!',
		});
	}
	geoCode(
		req.query.address,
		(error, { latitude, longitude, location } = {}) => {
			if (error) {
				return res.send({ error });
			}
			foreCate(latitude, longitude, (error, foreCatedData) => {
				if (error) {
					return res.send({ error });
				}
				res.send({
					foreCate: foreCatedData,
					location,
					address: req.query.address,
				});
			});
		}
	);
});

app.get('*', function (req, res) {
	res.send('My 404 page');
});

app.listen(3000, () => {
	console.log('web server is running on 3000 port.');
});
