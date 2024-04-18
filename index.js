const express = require("express");
const app = express();
const axios = require("axios");
require("dotenv").config();
const cors = require("cors");

app.use(cors({ origin: true, credentials: true, methods: ["GET", "POST"] }));

const port = process.env.PORT;

const cronJob = (urls) => {
  if (!urls) return null;
  const requests = urls.map((url) =>
    axios.get(url, { withCredentials: true }).catch((err) => {
      console.error(`Error fetching ${url}: ${err.message}`);
      return null; // return null for failed requests
    })
  );

  setInterval(() => {
    Promise.all(requests)
      .then((responses) => {
        responses.forEach((response, index) => {
          if (response) {
            console.log(`Response from ${urls[index]}: ${response.data}`);
          }
        });
      })
      .catch((err) => {
        console.error(`Error in Promise.all: ${err.message}`);
      });
  }, 6000);
};

const urls = [
  // "https://bdslp.onrender.com/",
  "https://fleetology-auth.onrender.com",
  "https://muzzplayer-service.onrender.com",
];

app.listen(port, () => {
  console.log("server at→", port);
  cronJob(urls);
});
