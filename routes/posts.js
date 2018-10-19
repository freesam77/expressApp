let express = require("express"),
    router  = express.Router(),
    Post    = require("../models/post")

        // Check if user is logged in

        function isLoggedIn(req,res,next){
            if(req.isAuthenticated()){
                return next();
            }else{
                res.redirect("/login");
            }
        }
    


    // Home page
    router.get('/', function (req, res) {
        res.render("home")
    })

    // INDEX
    router.get('/posts', function (req, res) {

        // take data from the database
        Post.find({},function(err, alldata){
            if(err){
                console.log(err);
            }else{
                res.render("posts/index",{posts: alldata})
            }
        })

    })
    // NEW
    router.get('/posts/new',isLoggedIn, function (req, res) {
        res.render("posts/new")
    })

    // CREATE
    router.post('/posts',isLoggedIn, function (req, res) {
        let camp = req.body.camp;

        Post.create(camp, function(err,posts){
            if (err) {
                console.log(err)
            } else {
                console.log("New entry : ");
                console.log(posts)
            }
        })
        res.redirect('/posts')
    })

    // SHOW ==> Details of one item

    router.get("/posts/:id",function(req,res){

        Post.findById(req.params.id).populate("comments").exec(function(err, posts){
            if(err){
                console.log(err);
                console.log("error!");
            }else{
                res.render("./posts/show",{posts: posts})
            }
        })

    })

    // EDIT

    router.get("/posts/:id/edit",function(req,res){

        Post.findById(req.params.id,function(err, posts){
            if(err){
                console.log(err.message);
                res.redirect("/posts")
            }else{
                res.render("./posts/edit",{posts: posts})
            }
        })

    })

    // UPDATE

    router.put("/posts/:id", function(req,res){

        Post.findOneAndUpdate({ _id: req.params.id}, req.body.camp, function(err, posts){
            if(err){
                console.log(err);
                console.log("error updating!")
                res.redirect('/posts')
            }else{
                res.redirect('/posts/' + req.params.id)
            }
        })

    })
    // DELETE

    router.delete("/posts/:id", function(req,res){

        Post.findByIdAndRemove(req.params.id, function(err){
                res.redirect('/posts')
        })

    })

module.exports = router;