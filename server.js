/**
 * Серверная часть
 */
const express = require('express');
const path = require('path');
const {CLIENT_API_KEY} = require('./src/app/common/settings');
const {getLocalPlaces} = require('./src/app/common/data');
const googleMapsClient = require('@google/maps').createClient({
  key: CLIENT_API_KEY,
  timeout: 5000
});
const app = express();
const port = process.env.PORT || 7000;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
}

app.get('/maps/api/places/json', (req, res) => {
  if (req.query.mode != 1) { // is NOT for public mode, for TEST
    res.send(getLocalPlaces());
    console.log(req.query.mode + 'query: [' + req.query.value + '] | mode: [DEMO] | result: [OK]');
  } else { // is for public mode, NOT TEST
    googleMapsClient.placesQueryAutoComplete({
      input: req.query.value,
      language: 'ru'
    }, function (err, response) {
      if (!err) {
        res.send(response.json);
        console.log('query: [' + req.query.value + '] | mode: [PUBLIC] | result: [OK]');
      } else {
        res.send({
          status: 404,
          err: err
        });
        console.log('query: [' + req.query.value + '] | mode: [PUBLIC] | result: [ERROR] | response: ', err);
      }
    });
  }
});

app.listen(port, () => console.log(`Listening on port ${ port }`));