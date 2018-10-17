    // Express JS
let express                 = require("express"),
    app                     = express(),
    // Modules
    bodyParser              = require("body-parser"),
    methodOverride          = require("method-override"),
    request                 = require("request"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),    // PassportJS, for authentication
    LocalStrategy           = require("passport-local"), // Passport local strategy
    passportLocalMongoose   = require("passport-local-mongoose"),
    // Models
    Campground              = require("./models/campground"),
    Comment                 = require("./models/comment"),
    User                    = require("./models/user"),
    // Seeds
    seedDB                  = require("./seeds")
    seedDB();

    mongoose.connect("mongodb://localhost/yelp", { useNewUrlParser: true });


// APP CONFIG
    app.set("view engine","ejs");
    app.use(methodOverride("_method")); // ==> Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
    app.use(bodyParser.urlencoded({extended: true}));// ==> Body parser is to parse request to JSON. extended: true is to bypass depreciation
    app.use(express.static(__dirname + "public"));
    app.use(require("express-session")({
        secret: "Secret message unlocked",
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());

// PASSPORT CONFIG
    passport.use(new LocalStrategy(User.authenticate())); // creating a new local strategy using User.authenticate() that comes from 
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

    
// =================
// ROUTES
// =================

    // Home page
    app.get('/', function (req, res) {
        res.render("home")
    })

    // INDEX
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
    // NEW
    app.get('/campgrounds/new', function (req, res) {
        res.render("campgrounds/new")
    })

    // CREATE
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

    // SHOW ==> Details of one item

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

    // EDIT

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

    // UPDATE

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
    // DELETE

    app.delete("/campgrounds/:id", function(req,res){

        Campground.findByIdAndRemove(req.params.id, function(err){
                res.redirect('/campgrounds')
        })

    })


// =================
// COMMENT ROUTES
// =================

    // NEW
    app.get("/campgrounds/:id/comments/new",function(req,res){

        Campground.findById(req.params.id).populate("comments").exec(function(err, campgrounds){
            if(err){
                console.log(err);
                console.log("error!");
            }else{
                res.render("./comments/new",{campgrounds: campgrounds})
            }
        })
    })
    // CREATE
    app.post("/campgrounds/:id/comments",function(req,res){
        let newcomment = req.body.comment;

        Campground.findById(req.params.id, function(err, campgrounds){
            if(err){
                console.log(err);
                console.log("Finding Campground ERROR");
                res.redirect("/campgrounds")
            }else{
                console.log("Comment created :");
                console.log(newcomment);
                Comment.create(newcomment, function(err, newcom){
                    if(err){
                        console.log(err);
                        console.log("Creating new comment ERROR");
                    }else{
                        campgrounds.comments.push(newcom);
                        campgrounds.save();

                        res.redirect("/campgrounds/" + campgrounds._id);
                    }
                })

            }
        })
    })

    // SHOW
    app.get("",function(req,res){

    })
    
    // =================
    // AUTH ROUTES
    // =================
    
    // REGISTER

        // GET
        app.get("/register",function(req,res){
            res.render("./auth/register")
        })

        app.get("/secret",isLoggedIn,function(req,res){
            res.render("./auth/secret")
        })

        // POST
        app.post("/register",function(req,res){
            let username = req.body.username;
            let password = req.body.password;
            User.register({username: username}, password, function(err, user){
                if(err){
                    console.log(err)
                    return res.render("./auth/register")
                }
                console.log("Created new user:")
                console.log(user)
                passport.authenticate("local")(req,res, function(){
                    res.redirect("/secret")
                });
            })
        })

    // LOGIN
        // GET
        app.get("/login",function(req,res){
            res.render("./auth/login")
        })

        // POST
        app.post("/login",passport.authenticate("local",{
            successRedirect: "/secret",
            failureRedirect: "/login"
            }), function(req,res){

        })

    // LOGOUT
        // GET
        app.get("/logout",function(req,res){
            req.logout();
            res.redirect("/")
        })

        function isLoggedIn(req,res,next){
            if(req.isAuthenticated()){
                return next();
            }else{
                res.redirect("/login");
            }
        }




// Page not found for the rest of the route
app.get('*', function (req, res) {
    res.send('The Page you requested doesn\'t exist!')
})

app.listen(3000,function(req, res){
    console.log("server started!")
  })

