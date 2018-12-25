let express = require("express"),
    router  = express.Router({mergeParams: true}), // mergeparams true sends the :id to the parent file
    Post = require("../models/post"),
    Comment = require("../models/comment"),
    Middleware = require("../middleware")


    // NEW
    router.get("/new",Middleware.isLoggedIn,function(req,res){

        Post.findById(req.params.id).populate("comments").exec(function(err, posts){
            if(err){
                req.flash("error",err)
                res.redirect("back")
            }else{
                res.render("./comments/new",{posts: posts})
            }
        })
    })
    // CREATE
    router.post("/",Middleware.isLoggedIn,function(req,res){
        let newcomment = req.body.comment;
        
        Post.findById(req.params.id, function(err, posts){
            if(err){
                req.flash("error",err)
                res.redirect("back")
            }else{
                Comment.create(newcomment, function(err, newcom){
                    if(err){
                        req.flash("error","Something went wrong...")
                    }else{
                        // add username and id to comments
                        newcom.author.id = req.user._id;
                        newcom.author.username = req.user.username;
                        newcom.save(); // save comment
                        
                        posts.comments.push(newcom);
                        posts.save();
                        req.flash("success","Successfully added comment.")
                        res.redirect("/posts/" + posts._id);
                    }
                })

                }
            })

        // EDIT
        router.get("/:comment_id/edit",Middleware.checkCommentOwnership,function(req,res){
            Comment.findById(req.params.comment_id,function(err, foundComment){
                if(err){
                    req.flash("error",err)
                    res.redirect("back")
                }else{
                    res.render("./comments/edit", {posts_id: req.params.id, comment: foundComment});
                }
            })
            
        })

        // UPDATE
        router.put("/:comment_id",Middleware.checkCommentOwnership,function(req,res){
            Comment.findOneAndUpdate({ _id: req.params.comment_id}, req.body.comment, function(err, updatedComment){
                if(err){
                    req.flash("error",err)
                    res.redirect("back");
                }else{
                    req.flash("success","Successfully updated comment.")
                    res.redirect("/posts/" + req.params.id)
                }
            })
        })

        // DELETE
        router.delete("/:comment_id",Middleware.checkCommentOwnership,function(req,res){
            Comment.findByIdAndRemove(req.params.comment_id, function(err){
                req.flash("success","Successfully deleted comment.")
                res.redirect('/posts/' + req.params.id)
            })
        })
    })



module.exports = router;