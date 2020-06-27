const request = require("postman-request");

const getTemp = (lat, lon, callback) => {
    const uri = `http://api.weatherstack.com/current?access_key=d42fa53376091da2d99b1e38a4eafdae&query=${lat},${lon}`;
  
    request({ uri: uri }, (error, response, body) => {
      //console.log(uri);
      if (error) {
        callback({ error: "unable to connect" }, null);
      } else if (response.body.error) {
        callback({ error: "verify provided location" }, null);
      } else {
        var current = JSON.parse(body).current;
        //console.log(error);
        callback(
          null,
          `It us currently ${current.temperature} degree out. There is a ${current.precip}% chance of rain.`
        );
      }
  
      //console.log(body);
      // console.log(
      //   `It us currently ${current.temperature} degree out. There is a ${current.precip}% chance of rain.`
      // );
    });
  };
  
  const getGeoCode = (address, callback) => {
    const geoURI = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      address
    )}.json?access_token=pk.eyJ1IjoibWFjay0xMyIsImEiOiJja2I3eTFrZHMwYWN0MnpucTM1NzVxYjBhIn0.M05C6iCaeXi3i_c2LlCHsQ`;
    // console.log(geoURI);
    request({ uri: geoURI }, (error, response, body) => {
      let data = "";
      if (!error) {
        data = JSON.parse(body);
      }
  
      if (error) {
        callback({ error: "unable to connect" }, []);
      } else if (data.features.length === 0) {
        callback({ error: "location not found" }, []);
      } else {
        callback(null, data.features[0].center);
      }
    });
  };

  const getForcast=(city, callback)=>{

    getGeoCode(city, (error, result) => {
        if (error) {
         return callback(error);
        }
        getTemp(result[1], result[0], (error, message) => {
          if (error) {
           return callback(error);
          }
          return callback(message);
        });
      });
  }

module.exports= {getForcast};