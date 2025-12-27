const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    totalCopies: {
        type: Number,
        required: true,
        min: [1, "At least one copy required"]
    },
    availableCopies: {
        type: Number,
        required: true
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
})

const Stock=mongoose.model("Stock",stockSchema)
module.exports=Stock;