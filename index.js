const express = require("express");
const handleBars = require("express-handlebars");
const bodyParser = require("body-parser");

const DB = [];

require("dotenv").config();
const app = express();
const key = process.env.API_KEY;
const PORT = process.env.PORT;

// Template Engine
app.engine("hbs", handleBars.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");

// imports SerpApi
const SerpApi = require("google-search-results-nodejs");
const search = new SerpApi.GoogleSearch(key);

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { DB });
});

app.post("/api", (req, res) => {
  // console.log(req.body);
  //  SerpApi takes in two arguments. Fist are the parameters of your search criteria eg. q: query, tbm: data type, safe: safe search.
  // The second argument is the callback function which is where you define what to do with that data.
  const params = {
    q: `${req.body.results[0].name} toy`,
    tbm: "isch",
    ijn: 0,
    safe: "active",
    star: 1,
    num: 1,
  };
  console.log(req.body.results[0].name)
  //   For the callback function, I just intialized a variable as the data and congole logged it. Follow the link of the logged data and it should bring you to a picure of what you searched for on the frontend.
  const callback = (data) => {
    const IMAGE = {
      id: Math.floor(Math.random() * 200) + 1,
      url: data["images_results"][Math.floor(Math.random() * 20)]["original"],
    };
    console.log(IMAGE);
    DB.push(IMAGE);
    // console.log(DB);
  };
  search.json(params, callback);
  res.json({
    message: "ITS A TRAP",
  });
});

app.listen(PORT, () => {
  console.log("On port 3000");
});
