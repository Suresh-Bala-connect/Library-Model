const borrowBlueprint = require('../model/borrow_model');
const stockBlueprint = require('../model/stock_model')

exports.create_borrow = async (req, res) => {
    try {
        // Create Stock
        const borrowCreate = await borrowBlueprint.create(req.body)
        res.status(200).json({ success: true, message: "success", data: borrowCreate })

        // -1 For Stock
        const { book, totalCopies } = req.body
        const updateAvaiableStock = await stockBlueprint.findOne({ book })
        console.log("===",book)

        if (!updateAvaiableStock) {
            res.status(200).json({
                success: false,
                message: "Stock not found for this book"
            })
        }
        if (updateAvaiableStock.availableCopies <= 0) {
            res.status(200).json({
                success: false,
                message: "No Stock Of this Book"
            })
        }
        console.log(updateAvaiableStock)
        updateAvaiableStock.availableCopies -= 1;
        updateAvaiableStock.lastUpdated = Date.now()

        await updateAvaiableStock.save();
        res.status(200).json({
            success: true,
            message: "Borrow created & stock updated",
            data: borrow
        });

    }
    catch (err) {
        console.log("Error Come From Borrow Create Function")
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

exports.getAllBorrowList = async (req, res) => {
    try {
        const borrowAlllist = await borrowBlueprint.find().populate("book", "title author");
        res.status(200).json({
            success: true,
            data: borrowAlllist
        })



    }
    catch (err) {
        console.log("Error Come From Get All Borrow Function");
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

exports.returnBook = async (req, res) => {
    const id = req.params.id
    try {
        console.log(id, req.body);

        const { book, totalCopies } = req.body;

        const returnQty = await stockBlueprint.findOne({ book: book._id });
        console.log("67747447",book);
        console.log(returnQty);

        returnQty.availableCopies += 1;
        returnQty.lastUpdated = Date.now();

        const result = await returnQty.save();
        // const result = await returnQty.updateOne(returnQty, { book: book._id });

        if (result) {
            await borrowBlueprint.findByIdAndDelete(id);

            res.status(200).json({
                success: true,
                message: "Borrow Returned Successfully"
            })
        }
    }
    catch (err) {
        console.log("Error Come From Delete Borrow");
        res.status(500).json({
            success: false,
            message: err.message
        })

    }
}