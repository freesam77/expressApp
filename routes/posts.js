let express = require("express"),
    router  = express.Router(),
    Post    = require("../models/post")

    // Middleware = Check if user is logged in

        function isLoggedIn(req,res,next){
            if(req.isAuthenticated()){
                return next();
            }else{
                res.redirect("/login");
            }
        }
    

    // INDEX
    router.get('/', function (req, res) {

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
    router.get('/new',isLoggedIn, function (req, res) {
        res.render("posts/new")
    })

    // CREATE
    router.post('/',isLoggedIn, function (req, res) {
        // Strat 1
        let post = req.body.post; // camp is created from the form submission of 'views/posts/new'
        post.author = {
            id: req.user._id,
            username: req.user.username
        }
        
        Post.create(post, function(err,posts){
            if (err) {
                console.log(err.message)
            } else {
                console.log("New entry");
                console.log(posts)
            }
        })
        res.redirect('/posts')
    })

    // SHOW ==> Details of one item

    router.get("/:id",function(req,res){

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

    router.get("/:id/edit", isLoggedIn, function(req,res){

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

    router.put("/:id", function(req,res){

        Post.findOneAndUpdate({ _id: req.params.id}, req.body.camp, function(err, posts){
            if(err){
                console.log(err);
                console.log("error updating!")
                res.redirect('/')
            }else{
                res.redirect('/posts/' + req.params.id)
            }
        })

    })
    // DELETE

    router.delete("/:id", function(req,res){

        Post.findByIdAndRemove(req.params.id, function(err){
                res.redirect('/')
        })

    })

module.exports = router;