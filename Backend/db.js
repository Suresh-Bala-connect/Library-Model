const mongoose=require('mongoose');

const LibDb= async()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB);
        console.log("Public Library Created")
    }
    catch(err){
        console.log("DB Connected Failed",err)
    }
}
module.exports=LibDb;