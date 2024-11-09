import mongoose from "mongoose";

const photoSchema = new mongoose.Schema({
    title: {type:String, required:true},
    image: {type:Array, required:true},
    price: {type:Number, required:true},
    category: {type: String, required:true},
    format: {type:Array, required:true}
},{minimize:false})

const photoModel = mongoose.models.photo || mongoose.model('photo',photoSchema)

export default photoModel