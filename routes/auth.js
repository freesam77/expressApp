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
                    console.log(err.message)
                    req.flash("error",err.message)
                    // return res.render("./auth/register")
                    res.redirect("back")
                }
                passport.authenticate("local")(req,res, function(){
                    req.flash("success","Welcome " + user.username + "!")
                    res.redirect("/posts")
                });
            })
        })

    // LOGIN
        // GET
        router.get("/login",function(req,res){
            res.render("./auth/login")
        })

        // POST
        router.post("/login",passport.authenticate("local",{
            successRedirect: "/posts",
            failureRedirect: "/login",
            failureFlash: true,
            successFlash: "Logged in successfully!"
            }), function(req,res){
                // this callback is just here to avoid error, but it doesn't actually do anything...yippie!
        })

    // LOGOUT
        // GET
        router.get("/logout",function(req,res){
            req.logout();
            req.flash("success","Logged out successfully!")
            res.redirect("/")
        })

       
module.exports = router;