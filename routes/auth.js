let express     = require("express"),
    router      = express.Router(),
    passport    = require("passport"),
    User        = require("../models/user")

    // USER REGISTRATION
        // GET
        router.get("/register",function(req,res){
            res.render("./auth/register")
        })


        // POST -- new user entry
        router.post("/register",function(req,res){
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
                    res.redirect("/posts")
                });
            })
        })

    // LOGIN
        // GET
        router.get("/login",function(req,res){
            res.render("./auth/login", {message: req.flash("error")})
        })

        // POST
        router.post("/login",passport.authenticate("local",{
            successRedirect: "/posts",
            failureRedirect: "/login"
            }), function(req,res){
                // this callback is just here to avoid error, but it doesn't actually do anything...yippie!
        })

    // LOGOUT
        // GET
        router.get("/logout",function(req,res){
            req.logout();
            res.redirect("/")
        })

       
module.exports = router;