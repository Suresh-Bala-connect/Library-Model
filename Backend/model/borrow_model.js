const mongoose = require('mongoose')

const borrowSchema = new mongoose.Schema({
    borrowName: {
        type: String,
        required: true,
        trim: true
    },
    borrowPhonenumber: {
        type: Number,
        required: true,
        trim: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    borrowDate: {
        type: Date,
        default: Date.now
    },
    dueDate: {
        type: Date,
        required: true
    },
    fineAmount: {
        type: Number,
        default: 0
    }
})
const Borrow = mongoose.model("Borrow", borrowSchema);
module.exports = Borrow;