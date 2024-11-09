import mongoose from "mongoose";

const susProductSchema = new mongoose.Schema({
    name: {type:String, required:true},
    description: {type:String, required:true},
    price: {type:Number, required:true},
    image: {type:Array, required:true},
    category: {type:String, required:true},
    featured: {type:Boolean},
})

const susProductModel = mongoose.models.susProduct || mongoose.model("susProduct", susProductSchema)

export default susProductModel