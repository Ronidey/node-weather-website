const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// Define paths for express config
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicPath));


app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Roni Dey"
  })
})

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Roni Dey"
  })
})

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    contact: 72113288,
    name: "Roni Dey"
  })
})

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: '404 Error',
    errMessage: 'Help article not found!',
    name: 'Roni Dey'
  })
})

app.get("/weather", (req, res) => {
  const address = req.query.address;

  if (!address) {
    return res.send({error: "You must provide an address!"})
  }

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast( latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error })
      }

      res.send({
        forecast: forecastData,
        location,
        address
      });
    })
  })
})

app.get("*", (req, res) => {
  res.render("404", {
    title: '404 Error',
    errMessage: 'Page not found!',
    name: 'Roni Dey'
  })
})

app.listen(8080, () => console.log("listening to port 8080"));