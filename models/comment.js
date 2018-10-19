let mongoose = require("mongoose");

let commentSchema = new mongoose.Schema({
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comment: String
})

module.exports = mongoose.model("Comment", commentSchema);
