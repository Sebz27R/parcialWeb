import {v2 as cloudinary} from 'cloudinary'
import susProductModel from "../models/susProductModel.js"
// function for add product

const addSusProduct = async (req,res) => {
    try{
        const {name,description, price, category, featured} = req.body
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1,image2,image3,image4].filter((item)=> item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item)=>{
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'})
                return result.secure_url
            })
        )

        const susProductData = {
            name,
            description,
            category,
            price: Number(price),
            featured: featured === "true" ? true : false,
            image: imagesUrl
        }

        console.log(susProductData)

        const susProduct = new susProductModel(susProductData)
        await susProduct.save()

        res.json({success:true, message:"SusProduct added"})
    } catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//Function for listining products

const listSusProducts = async (req,res) => {
    try {

        const susProducts = await susProductModel.find({})
        res.json({success:true,susProducts})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//Remove product
const removeSusProduct = async (req,res) => {
    try {
        await susProductModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"SusProduct removed"})

    } catch (error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
}


const singleSusProduct = async (req,res) => {
    try {

        const {susProductId} = req.body
        const susProduct = await susProductModel.findById(susProductId)
        res.json({success:true,susProduct})

    } catch(error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

export {addSusProduct, listSusProducts, removeSusProduct, singleSusProduct}