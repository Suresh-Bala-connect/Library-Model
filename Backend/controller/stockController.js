const stockBlueprint = require('../model/stock_model');

exports.update_stock = async (req, res) => {
    try {

        // Check Old Stock and Update
        const { book, totalCopies } = req.body
        const existing = await stockBlueprint.findOne({ book })
        if (existing) {
            existing.totalCopies += totalCopies;
            existing.availableCopies += totalCopies
            existing.lastUpdated = Date.now();

            const updated = await existing.save();
            return res.status(200).json({
                success: true,
                message: "Stock Updated Successfully",
                data: updated
            });
        }

        // Create Stock
        // const stockCreate = await stockBlueprint.create(req.body)
        res.status(200).json({ success: true, message: "success", data: this.update_stock })
    }
    catch (err) {
        console.log("Error Come From Stock Create Function");
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

exports.getStock = async (req, res) => {
    try {
        const result = await stockBlueprint.find();
        res.status(200).json({ success: true, data: result });
    } catch (err) {
        console.log("error to fetch stock");
        res.status(500).json({ success: false, message: err.message })
    }
}

exports.getStockByBookId = async (req, res) => {
    const id = req.params.bookId;
    console.log("Book Id", id);

    try {
        const res = await stockBlueprint.findOne({ book: id });
        res.status(200).json({ success: true, data: res });
    } catch (err) {
        console.log("error to fetch stock");
        res.status(500).json({ success: false, message: err.message })
    }
}

