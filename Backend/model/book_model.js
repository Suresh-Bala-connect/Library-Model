const mongoose=require('mongoose')

const bookSchema= new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Book Title Is Required"],
        trim:true
    },
    author:{
        type:String,
        required:[true,"Book Title Is Required"],
        trim:true
    },
    isbn:{
        type:String,
        unique:true,
        sparse:true,
    },
    catagory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Catagory",
        required:true
    },
    publishedYear:{
        type:Number
    },
    language:{
        type:String,
        default:"English"
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
    // stock:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"Stock",
    //     required:true
    // }
})

const Book=mongoose.model("Book",bookSchema)
module.exports=Book;