let mongoose = require('mongoose');

let commentSchema = new mongoose.Schema({
    author: String,
    comment: String
})

module.exports = mongoose.model("Comment", commentSchema);
