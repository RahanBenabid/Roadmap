const express = require("express");
const axios = require("axios");

const PORT = 3000;
const app = express();
app.use(express.json());

function performRequest(country) {
  // country = "London";

  axios
    .get(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${country}`,
      {
        params: {
          unitGroup: "metric",
          key: "EHWTCRYZPUDMH7H4W8J9HFXVT",
          contentType: "json",
        },
      },
    )
    .then(function (response) {
      console.log(response.data.latitude, response.data.longitude);
    })
    .catch(function (error) {
      if (error.status === 401)
        console.error("something wrong with the server:", error.status);
      else console.error(`Error ${error.status}, Bad request`);
    });
}

function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  const country = command;
  performRequest(country);
}

main();
