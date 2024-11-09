
import {v2 as cloudinary} from 'cloudinary'
import modelModel from "../models/modelModel.js"
// function for add Model

const addModel = async (req, res) => {
    try {
        const { name, booking_info, achievements } = req.body;

        // Process images
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url;
            })
        );

        // Prepare model data including achievements
        const modelData = {
            name,
            booking_info,
            portfolio: imagesUrl,
            achievements: JSON.parse(achievements) // Default to an empty array if not provided
        };

        console.log(modelData);

        // Create and save the model
        const model = new modelModel(modelData);
        await model.save();

        res.json({ success: true, message: "Model added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

//Function for listining models

const listModels = async (req,res) => {
    try {

        const models = await modelModel.find({})
        res.json({success:true,models})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//Remove Model
const removeModel = async (req,res) => {
    try {
        await modelModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Model removed"})

    } catch (error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
}


const singleModel = async (req,res) => {
    try {

        const {modelId} = req.body
        const model = await modelModel.findById(modelId)
        res.json({success:true,model})

    } catch(error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

export {addModel, listModels, removeModel, singleModel}