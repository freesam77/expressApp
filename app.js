let express = require("express");
let app = express();


// respond with "hello world" when a GET request is made to the homepage
app.use(express.static("public"))
app.set("view engine","ejs");
app.get('/', function (req, res) {
    res.send('Omae wa mou...shindeiru!!!!')
  })

app.get('/bye', function (req, res) {
    console.log("Request to /bye")
    res.send('Bye bye!!')
})

app.get('/kh', function (req, res) {
    let data = [
        {magic: "Fire Element", desc: "Fire, Fira, Firaga"},
        {magic: "Blizzard Element", desc: "Blizzard, Blizzara, Blizzaga"},
        {magic: "Thunder Element", desc: "Thunder, Thundara, Thundaga"},
        {magic: "Cure Element", desc: "Cure, Cura, Curaga"},
        {magic: "Gravity Element", desc: "Gravity, Gravira, Graviga"},
        {magic: "Time Element", desc: "Stop, Stopra, Stopga"},
        {magic: "Wind Element", desc: "Aero, Aerora, Aeroga"}
    ];
    res.render("kh",{data: data});
})

// speak according
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

// repeat as many times as "num" entered.
app.get('/repeat/:subsection/:number', function (req, res) {
    let subname = req.params.subsection;
    let num = parseInt(req.params.number);
    let finalword = ""
    for(i=1;i<=num;i++){
        finalword += subname + " " + i + " times.</br>" 
    }
    res.send("You have entered the page of <strong>" + subname + "</strong> " + num + " times.</br>" + finalword);
})


// for any other routes
app.get('*', function (req, res) {
    res.send('The Page you requested doesn\'t exist! Get a LIFE!')
})

app.listen(3000,function(req, res){
    console.log("server started!")
    console.log("server started!")
  })