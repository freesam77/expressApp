let express = require("express");
let app = express();


// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
    res.send('Omae wa mou...shindeiru!!!!')
  })

app.get('/bye', function (req, res) {
    console.log("Request to /bye")
    res.send('Bye bye!!')
})

// for any other routes

app.get('*', function (req, res) {
    res.send('The Page you requested doesn\'t exist!')
})

app.listen(3000,function(req, res){
    console.log("server started!")
    console.log("server started!")
  })