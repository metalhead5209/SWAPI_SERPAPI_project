const express = require("express");
require("dotenv").config();
const app = express(); 
const key = process.env.API_KEY;

// imports SerpApi
const SerpApi = require("google-search-results-nodejs");
const search = new SerpApi.GoogleSearch(key);

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

app.post("/api", (req, res) => {
  console.log(req.body);
//  SerpApi takes in two arguments. Fist are the parameters of your search criteria eg. q: query, tbm: data type, safe: safe search.
// The second argument is the callback function which is where you define what to do with that data.
  const params = {
    q: `${req.body.name} toy`,
    tbm: "isch",
    ijn: 0,
    safe: "active",
    star: 1,
    num: 1,
  };
//   For the callback function, I just intialized a variable as the data and congole logged it. Follow the link of the logged data and it should bring you to a picure of what you searched for on the frontend. 
  const callback = (data) => {
    const IMAGE = data["images_results"][0]["original"];
    console.log(IMAGE);
  };
  search.json(params, callback);
  res.json({
    message: "Data Recieved!",
  });
});

app.listen(PORT, () => {
  console.log("On port 3000");
});
