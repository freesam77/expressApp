let middlewareObj = {}
let Post = require("../models/post")
let Comment = require("../models/comment")

middlewareObj.isLoggedIn = (req,res,next) => {
        if(req.isAuthenticated()){
            return next();
        }else{
            // setting up the error flash message
            req.flash("error","You need to be logged in to do that!")
            res.redirect("/login");
        }
    }

middlewareObj.checkPostOwnership = (req,res,next) => {
        if(req.isAuthenticated()){
            Post.findById(req.params.id, function(err,foundPost){
                if(err){
                    req.flash("error","Post not found.")
                    res.redirect("back")
                }else{
                    if(foundPost.author.id.equals(req.user._id)){
                        next()
                        }else{
                            // setting up the error flash message
                            req.flash("error","Editing this post is only restricted to the owner.")
                            res.redirect("back");
                        }
                    }
                })
            }else{
            req.flash("error","You have to be logged in to do that!")
            res.redirect("/posts/" + req.params.id);
        }
    }

middlewareObj.checkCommentOwnership = (req,res,next) => {
        if(req.isAuthenticated()){
            Comment.findById(req.params.comment_id, function(err,foundComment){
                if(err){
                    req.flash("error","Comment not found.")
                    res.redirect("back")
                }else{
                    if(foundComment.author.id.equals(req.user._id)){
                        next()
                        }else{
                            // setting up the error flash message
                            req.flash("error","Editing this comment is only restricted to the owner.")
                            res.redirect("back");
                        }
                }
            })
        }else{
            // setting up the error flash message
            req.flash("error","You are not logged in!")
            res.redirect("back");
        }
    }

module.exports = middlewareObj