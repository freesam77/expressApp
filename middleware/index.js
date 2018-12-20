let middlewareObj = {}
let Post = require("../models/post")
let Comment = require("../models/comment")

middlewareObj.isLoggedIn = (req,res,next) => {
        if(req.isAuthenticated()){
            return next();
        }else{
            req.flash("error","You need to be logged in!")
            res.redirect("/login");
        }
    }

middlewareObj.checkPostOwnership = (req,res,next) => {
        if(req.isAuthenticated()){
            Post.findById(req.params.id, function(err,foundPost){
                if(err){
                    res.redirect("back")
                }else{
                    if(foundPost.author.id.equals(req.user._id)){
                        next()
                        }else{
                            console.log("Error : Editing this post is only restricted to the owner.")
                            res.redirect("back");
                        }
                }
            })
        }else{
            res.redirect("back");
        }
    }

middlewareObj.checkCommentOwnership = (req,res,next) => {
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

module.exports = middlewareObj