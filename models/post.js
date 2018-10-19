let mongoose = require("mongoose");

let postSchema = new mongoose.Schema({
    name: String,
    image: String,
    desc: String,
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
})

module.exports = mongoose.model("Post", postSchema)
