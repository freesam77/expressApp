var request = require('request');
let address = "https://query.yahooapis.com/v1/public/yql?q=select%20astronomy.sunset%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22maui%2C%20hi%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"

request(address, function (error, response, body) {

  let parsedBody = JSON.parse(body)
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

  console.log('body:', parsedBody); // Print the HTML for the Google homepage.
  console.log('Sunset at Hawai is at.. ' + parsedBody.query.results.channel.astronomy.sunset);
});

// Movie Api uses &apikey=thewdb