    // Express JS
let express                 = require("express"),
    app                     = express();
    // Modules
let bodyParser              = require("body-parser"),
    methodOverride          = require("method-override"),
    request                 = require("request"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),   // PassportJS, for authentication
    LocalStrategy           = require("passport-local"),   // Passport local strategy
    passportLocalMongoose   = require("passport-local-mongoose");

    // Models
let post                    = require("./models/post"),
    Comment                 = require("./models/comment"),
    User                    = require("./models/user");
        
    // Seeds
let seedDB                  = require("./seeds");
    seedDB();

    // Routes
let commentRoutes           = require("./routes/comments"),
    postsRoutes             = require("./routes/posts"),
    authRoutes              = require("./routes/auth")


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

    // setting a general variable, signed in user
    app.use(function(req,res,next){
        res.locals.currentUser = req.user;
        next();
    })

        // App use Routes
        app.use(authRoutes)
        app.use("/posts/:id/comments",commentRoutes)
        app.use("/posts",postsRoutes)
    

// PASSPORT CONFIG
    passport.use(new LocalStrategy(User.authenticate())); // creating a new local strategy using User.authenticate() that comes from 
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());


// Home page
    app.get('/', function (req, res) {
        res.render("home")
    })


// Page not found for the rest of the route
app.get('*', function (req, res) {
    res.send('The Page you requested doesn\'t exist!')
})

app.listen(3000,function(req, res){
    console.log("server started!")
  })