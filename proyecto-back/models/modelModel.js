import mongoose from "mongoose";

const modelSchema = new mongoose.Schema({
    name: {type:String, required:true},
    portfolio: {type:Array, required:true},
    booking_info: {type:String, required:true},
    achievements: {type:Array, required:true}
})

const modelModel = mongoose.models.model || mongoose.model('model',modelSchema)

export default modelModel