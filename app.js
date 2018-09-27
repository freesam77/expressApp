let express = require("express");
let app = express();
let bodyParser = require("body-parser");
var request = require('request');

// Global Variables

let campgrounds = [
    {name: "Fantasy Maiden", image: "https://pixabay.com/get/ea35b60821f6093ed1584d05fb1d4e97e07ee3d21cac104496f7c97aa2eab3b8_340.jpg"},
    {name: "Sunset Horizon", image: "https://pixabay.com/get/e83db7082afc043ed1584d05fb1d4e97e07ee3d21cac104496f7c97aa2eab3b8_340.jpg"},
    {name: "World Tree", image: "https://pixabay.com/get/ee36b70720f11c22d2524518b7444795ea76e5d004b0144292f8c27ca0ebb5_340.jpg"},
    {name: "Dawn on Beach", image: "https://pixabay.com/get/e832b40e2cf1043ed1584d05fb1d4e97e07ee3d21cac104496f7c97aa2eab3b8_340.jpg"}
];

// ==> The extended option allows to choose between parsing the URL-encoded data with the querystring library (when false) or the qs library (when true). 
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"))
app.set("view engine","ejs");

// Home page
app.get('/', function (req, res) {
    res.render("index")
})

// Campgrounds GET
app.get('/campgrounds', function (req, res) {
    res.render("campgrounds",{campgrounds: campgrounds})
})
// Campgrounds NEW ==> POST
app.get('/campgrounds/new', function (req, res) {
    res.render("newcamp")
  })
// Campgrounds POST
app.post('/campgrounds', function (req, res) {
    let name = req.body.name;
    let image = req.body.image;
    campgrounds.push({
        name: name,
        image: image
    })
    res.redirect('/campgrounds')
})



// Page not found for the rest of the route
app.get('*', function (req, res) {
    res.send('The Page you requested doesn\'t exist!')
})

app.listen(3000,function(req, res){
    console.log("server started!")
    console.log("server started!")
  })

