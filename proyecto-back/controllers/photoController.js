
import {v2 as cloudinary} from 'cloudinary'
import photoModel from "../models/photoModel.js"
// function for add photo

const addPhoto = async (req,res) => {
    try{
        const {title, price, category,format} = req.body
        const image1 = req.files.image1 && req.files.image1[0]

        const images = [image1].filter((item)=> item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item)=>{
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'})
                return result.secure_url
            })
        )

        const photoData = {
            title,
            category,
            price: Number(price),
            format: JSON.parse(format),
            image: imagesUrl,
        }

        console.log(photoData)

        const photo = new photoModel(photoData)
        await photo.save()

        res.json({success:true, message:"Photo added"})
    } catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//Function for listining Photos

const listPhotos = async (req,res) => {
    try {

        const photos = await photoModel.find({})
        res.json({success:true,photos})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//Remove product
const removePhoto = async (req,res) => {
    try {
        await photoModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Photo removed"})

    } catch (error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
}


const singlePhoto = async (req,res) => {
    try {

        const {photoId} = req.body
        const photo = await photoModel.findById(photoId)
        res.json({success:true,photo})

    } catch(error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

export {addPhoto, listPhotos, removePhoto, singlePhoto}