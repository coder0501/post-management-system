const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose); // Import mongoose-sequence

const Schema = mongoose.Schema;

const User = new Schema({
    id: {
        type: Number,
        unique: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Add auto-increment plugin for the 'id' field
User.plugin(AutoIncrement, { inc_field: "id" });

module.exports = mongoose.model("User", User);
