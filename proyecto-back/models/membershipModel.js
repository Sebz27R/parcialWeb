import mongoose from "mongoose";

const membershipSchema = new mongoose.Schema({
    name: {type:String, required:true},
    price: {type:Number, required:true},
    image: {type:Array, required:true},
    duration: {type:String, required:true}
})

const membershipModel = mongoose.models.membership || mongoose.model('membership',membershipSchema)

export default membershipModel