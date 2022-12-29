const mongoose = require("mongoose")

const ProductSchema = mongoose.Schema({
    title: String,
    price: Number,
    thumbnail: String
})

module.exports = mongoose.model("Products", ProductSchema)