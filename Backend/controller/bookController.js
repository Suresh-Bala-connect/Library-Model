        const bookBlueprint = require('../model/book_model');
const stockBluePrint = require('../model/stock_model');

exports.create_book = async (req, res) => {
    const bookCreate = await bookBlueprint.create(req.body)
    console.log(bookCreate);

    const stockCreate = await stockBluePrint.create({
        book: bookCreate._id,
        totalCopies: 1,
        availableCopies: 0
    })

    console.log(stockCreate);
    try {

        res.status(200).json({ success: true, message: "success", data: bookCreate })
    }
    catch (err) {
        console.log("Error Come From Book Create Function");
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

exports.getAllbook = async (req, res) => {
    try {
        const allBook = await bookBlueprint.find();
        res.status(200).json({
            success: true,
            data: allBook
        })
    }
    catch (err) {
        console.log("Error Come From Book Create Function");
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

exports.get_all_book = async (req, res) => {
    try {
        const getAllBooks = await bookBlueprint.find().populate("catagory")

        const detailedBooks = await Promise.all(getAllBooks.map(async (item) => {
            // console.log("Books:", item._id);
            const stockRes = await stockBluePrint.findOne({ book: item._id });
            if (stockRes) {
                return { ...item._doc, stock: stockRes }
            } else {
                return { ...item._doc, stock: null }
            }
        }));

        res.status(200).json({
            success: true,
            data: detailedBooks
        })
    }
    catch (err) {
        console.log("Error Come From Book Create Function");
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

exports.updateBook = async (req, res) => {

    try {
        const bookId = req.params.id;
        const updateData = req.body

        const updateResult = await bookBlueprint.findByIdAndUpdate(
            bookId,
            updateData,
            { new: true }
        )
        if (!updateResult) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: updateResult
        });
    }

    catch (err) {
        console.log("Error in Book Update:", err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

exports.deleteBooklist = async (req, res) => {

    console.log("delete book");

    const id = req.params.id;

    try {
        await bookBlueprint.findByIdAndDelete(id);
        
        res.status(201).json({ success: true, message: 'Deleted Successfully' })
    } catch (err) {
        res.status(400).json({ success: false, message: 'Failed to Delete' });
    }


   

}