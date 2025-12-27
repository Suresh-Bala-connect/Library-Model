const catagoryBlueprint = require('../model/catagory_model');

exports.create_catagory = async (req, res) => {
    try {
        const catagoryCreate = await catagoryBlueprint.create(req.body)
        res.status(200).json({ success: true, message: "success", data: catagoryCreate })
    }
    catch (err) {
        console.log("Error Come From Catagory Create Function")
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

exports.getCatagory = async (req, res) => {
    try {
        const getCatagoryresult = await catagoryBlueprint.find();
        res.status(200).json({
            success: true,
            data: getCatagoryresult
        })
    }
    catch (err) {
        console.log("Error Come From Catagory Get List Function")
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}