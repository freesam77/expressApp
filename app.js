let express = require("express");
let app = express();
let bodyParser = require("body-parser");
var request = require('request');

// Global Variables

let data = [
    {magic: "Fire Element", desc: "Fire, Fira, Firaga"},
    {magic: "Blizzard Element", desc: "Blizzard, Blizzara, Blizzaga"},
    {magic: "Thunder Element", desc: "Thunder, Thundara, Thundaga"},
    {magic: "Cure Element", desc: "Cure, Cura, Curaga"},
    {magic: "Gravity Element", desc: "Gravity, Gravira, Graviga"},
    {magic: "Time Element", desc: "Stop, Stopra, Stopga"},
    {magic: "Wind Element", desc: "Aero, Aerora, Aeroga"}
];

// ==> The extended option allows to choose between parsing the URL-encoded data with the querystring library (when false) or the qs library (when true). 
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"))
app.set("view engine","ejs");

// Home page
app.get('/', function (req, res) {
    res.send('Welcome to the Home Page!')
  })

app.get('/bye', function (req, res) {
    console.log("Request to /bye")
    res.send('Bye bye!!')
})

// GET and POST data library
app.get('/kh', function (req, res) {
    res.render("kh",{data: data});
})

app.post('/newpost', function (req, res){
    let newPost = req.body;
    data.push({
        magic: newPost.magic + " Element",
        desc: newPost.desc
    });
    res.redirect("/kh");
})

// Display matching string according to set of data
app.get('/speak/:animal', function (req, res) {
    let animal = req.params.animal;
    let speakLibrary = {
        monkey: "oo oo aa aa!",
        cow: "moo...",
        bird: "chirp..."
    }
    let speaking = speakLibrary[animal];
    if (!speaking){
        speaking = "What does the " + animal +" say?"
    }
    res.send("<h2>The " +  animal + " says</h2><h1>" + speaking + "</h1>");
})

// Repeat as many times as "num" entered.
app.get('/repeat/:subsection/:number', function (req, res) {
    let subname = req.params.subsection;
    let num = parseInt(req.params.number);
    let finalword = ""
    for(i=1;i<=num;i++){
        finalword += subname + " " + i + " times.</br>" 
    }
    res.send("You have entered the page of <strong>" + subname + "</strong> " + num + " times.</br>" + finalword);
})

// =====
// Request to OMDB using the API key provided by Colt Steele in Fullstack Web Dev tut @ udemy...
// =====
app.get('/search',function(req,res){
    res.render("search")
})

// Display result of the search page
app.get('/result',function(req,res){
    let search = req.query.search;
    let url = 'http://www.omdbapi.com/?s=ironman&apikey=thewdb';
    let url2 = 'http://www.omdbapi.com/?s=' + search + '&apikey=thewdb';
    request(url2, function (error, response, body) {
        let parsedData = JSON.parse(body);
        let data = parsedData.Search;
        res.render("result",{data: data})
    })
})

// Page not found for the rest of the route
app.get('*', function (req, res) {
    res.send('The Page you requested doesn\'t exist! Get a LIFE!')
})

app.listen(3000,function(req, res){
    console.log("server started!")
    console.log("server started!")
  })