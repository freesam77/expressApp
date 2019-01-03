    // Express JS
let express                 = require("express"),
    app                     = express();

    // Modules, needs to be "used" inside this app file below
let bodyParser              = require("body-parser"),
    methodOverride          = require("method-override"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),   // PassportJS, for authentication
    LocalStrategy           = require("passport-local"),
    flash                   = require("connect-flash"); // Flash messages for errors and warnings 


    // Models
let User                    = require("./models/user");
        
    // Seeds
// let seedDB                  = require("./seeds");
//     console.log("seeding the data...")
//     seedDB();
//     console.log("seeding completed!")

    // Routes ==> require
let commentRoutes           = require("./routes/comments"),
    postsRoutes             = require("./routes/posts"),
    authRoutes              = require("./routes/auth")


    // Local Database
    // mongoose.connect("mongodb://localhost/yelp", { useNewUrlParser: true });
    // Mongolab Database
    mongoose.connect("mongodb://restful1:restAPP1@ds247944.mlab.com:47944/restfulapp", { useNewUrlParser: true });


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

    app.use(flash());

    // passport js
    app.use(passport.initialize());
    app.use(passport.session());

    // General Variables / Passing Objects
    app.use(function(req,res,next){
        res.locals.currentUser = req.user;
        res.locals.error = req.flash("error")
        res.locals.success = req.flash("success")
        next();
    })

    // Routes ==> use and shorten up url
    app.use("/posts/:id/comments",commentRoutes) //to be able to pass :id, mergeParams: true is required in the route
    app.use("/posts",postsRoutes)
    app.use(authRoutes)
    

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
        res.redirect("/")
})

app.listen(3000,function(){
    console.log("server started!")
  })