let express = require("express"),
    router  = express.Router({mergeParams: true}), // mergeparams true sends the :id to the parent file
    Post = require("../models/post"),
    Comment = require("../models/comment")


    // NEW
    router.get("/new",isLoggedIn,function(req,res){

        Post.findById(req.params.id).populate("comments").exec(function(err, posts){
            if(err){
                console.log(err);
                console.log("error!");
                res.redirect("back")
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
                res.redirect("back")
            }else{
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
                        console.log("Comment created :");
                        console.log(newcom)
                        res.redirect("/posts/" + posts._id);
                    }
                })

                }
            })

        // EDIT
        router.get("/:comment_id/edit",checkCommentOwnership,function(req,res){
            Comment.findById(req.params.comment_id,function(err, foundComment){
                if(err){
                    res.redirect("back")
                }else{
                    res.render("./comments/edit", {posts_id: req.params.id, comment: foundComment});
                }
            })
            
        })

        // UPDATE
        router.put("/:comment_id",checkCommentOwnership,function(req,res){
            Comment.findOneAndUpdate({ _id: req.params.comment_id}, req.body.comment, function(err, updatedComment){
                if(err){
                    res.redirect("back");
                }else{
                    res.redirect("/posts/" + req.params.id)
                }
            })
        })

        // DELETE
        router.delete("/:comment_id",checkCommentOwnership,function(req,res){
            Comment.findByIdAndRemove(req.params.comment_id, function(err){
                res.redirect('/posts/' + req.params.id)
            })
        })
    })


    // MIDDLEWARE - Check if user is logged in

    function isLoggedIn(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }else{
            res.redirect("back");
        }
    }
    

    function checkCommentOwnership(req,res,next){
        if(req.isAuthenticated()){
            Comment.findById(req.params.comment_id, function(err,foundComment){
                if(err){
                    res.redirect("back")
                }else{
                    if(foundComment.author.id.equals(req.user._id)){
                        next()
                        }else{
                            console.log("Error : Editing this comment is only restricted to the owner.")
                            res.redirect("back");
                        }
                }
            })
        }else{
            console.log("You are not logged in!")
            res.redirect("back");
        }
    }

module.exports = router;