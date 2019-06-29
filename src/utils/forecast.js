const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/ab7fa1161fe5a0f17b5ec1d74e94f4a7/${latitude},${longitude}?units=si`;

  request({ url, json: true }, (err, response, { error, currently }) => {
    if (err) {
      callback("Unable to connect to weather service!");
    } else if (error) {
      callback("Unable to find location!");
    } else {
      callback(
        undefined,
        `It is currently ${currently.temperature} degrees out. There is ${
          currently.precipProbability
        }% chance of rain.`
      );
    }
  });
};

module.exports = forecast;
