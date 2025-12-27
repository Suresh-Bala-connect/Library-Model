const mongoose = require('mongoose');

const catagorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "category is required"],
        unqiue: true,
        trim: true
    },
    descriptions: {
        type: String,
        default: ""
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Catagory =mongoose.model("Catagory",catagorySchema);
module.exports=Catagory;