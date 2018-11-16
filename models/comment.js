let mongoose = require("mongoose");

let commentSchema = new mongoose.Schema({
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User" // this refers to the module.exports that is done in user.js
        },
        username: String
    },
    comment: String
})

module.exports = mongoose.model("Comment", commentSchema);
