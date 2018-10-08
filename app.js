let express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    request = require('request'),
    mongoose = require('mongoose'),
    Campground = require('./models/campground'),
    Comment = require('./models/comment'),
    seedDB = require('./seeds');
    seedDB();

    mongoose.connect("mongodb://localhost/yelp", { useNewUrlParser: true });


// APP CONFIG
    app.use(methodOverride("_method"));
    app.use(bodyParser.urlencoded({extended: true}));// ==> to bypass depreciation
    app.use(express.static("public"))
    app.set("view engine","ejs");

// Home page
app.get('/', function (req, res) {
    res.render("home")
})

// Campgrounds INDEX
app.get('/campgrounds', function (req, res) {

    // take data from the database
    Campground.find({},function(err, alldata){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index",{campgrounds: alldata})
        }
    })

})
// Campgrounds NEW
app.get('/campgrounds/new', function (req, res) {
    res.render("campgrounds/new")
  })

// Campgrounds CREATE
app.post('/campgrounds', function (req, res) {
    let camp = req.body.camp;

    Campground.create(camp, function(err,campgrounds){
        if (err) {
            console.log(err)
        } else {
            console.log("New entry : ");
            console.log(campgrounds)
        }
    })
    res.redirect('/campgrounds')
})

// Campgrounds SHOW ==> Details of one item

app.get("/campgrounds/:id",function(req,res){

    Campground.findById(req.params.id).populate("comments").exec(function(err, campgrounds){
        if(err){
            console.log(err);
            console.log("error!");
        }else{
            res.render("./campgrounds/show",{campgrounds: campgrounds})
        }
    })

})

// Campgrounds EDIT

app.get("/campgrounds/:id/edit",function(req,res){

    Campground.findById(req.params.id,function(err, campgrounds){
        if(err){
            console.log(err.message);
            res.redirect("/campgrounds")
        }else{
            res.render("./campgrounds/edit",{campgrounds: campgrounds})
        }
    })

})

// Campgrounds UPDATE

app.put("/campgrounds/:id", function(req,res){

    Campground.findOneAndUpdate({ _id: req.params.id}, req.body.camp, function(err, campgrounds){
        if(err){
            console.log(err);
            console.log("error updating!")
            res.redirect('/campgrounds')
        }else{
            res.redirect('/campgrounds/' + req.params.id)
        }
    })

})
// Campgrounds DELETE

app.delete("/campgrounds/:id", function(req,res){

    Campground.findByIdAndRemove(req.params.id, function(err){
            res.redirect('/campgrounds')
    })

})




// Page not found for the rest of the route
app.get('*', function (req, res) {
    res.send('The Page you requested doesn\'t exist!')
})

app.listen(3000,function(req, res){
    console.log("server started!")
  })

