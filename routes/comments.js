let express = require("express"),
    router  = express.Router({mergeParams: true}), // mergeparams true sends the :id to the parent file
    Post = require("../models/post"),
    Comment = require("../models/comment")

        // Check if user is logged in

        function isLoggedIn(req,res,next){
            if(req.isAuthenticated()){
                return next();
            }else{
                res.redirect("/login");
            }
        }
    

    // NEW
    router.get("/new",isLoggedIn,function(req,res){

        Post.findById(req.params.id).populate("comments").exec(function(err, posts){
            if(err){
                console.log(err);
                console.log("error!");
            }else{
                res.render("./comments/new",{posts: posts})
            }
        })
    })
    // CREATE
    router.post("/",isLoggedIn,function(req,res){
        let newcomment = req.body.comment;

        Post.findById(req.params.id, function(err, posts){
            if(err){
                console.log(err);
                console.log("Finding post ERROR");
                res.redirect("/posts")
            }else{
                console.log("Comment created :");
                console.log(newcomment);
                Comment.create(newcomment, function(err, newcom){
                    if(err){
                        console.log(err);
                        console.log("Creating new comment ERROR");
                    }else{
                        // add username and id to comments
                        newcom.author.id = req.user._id;
                        newcom.author.username = req.user.username;
                        newcom.save(); // save comment
                        
                        posts.comments.push(newcom);
                        posts.save();

                        res.redirect("/posts/" + posts._id);
                    }
                })

            }
        })
    })

module.exports = router;