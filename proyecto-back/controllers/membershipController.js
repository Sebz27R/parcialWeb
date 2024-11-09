
import {v2 as cloudinary} from 'cloudinary'
import membershipModel from "../models/membershipModel.js"
// function for add product

const addMembership = async (req,res) => {
    try{
        const {name, price, duration} = req.body
        const image1 = req.files.image1 && req.files.image1[0]

        const images = [image1].filter((item)=> item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item)=>{
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'})
                return result.secure_url
            })
        )

        const membershipData = {
            name,
            price: Number(price),
            duration,
            image: imagesUrl,
        }

        console.log(membershipData)

        const membership = new membershipModel(membershipData)
        await membership.save()

        res.json({success:true, message:"Membership added"})
    } catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//Function for listining products

const listMemberships = async (req,res) => {
    try {

        const memberships = await membershipModel.find({})
        res.json({success:true,memberships})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//Remove product
const removeMembership = async (req,res) => {
    try {
        await membershipModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Membership removed"})

    } catch (error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
}


const singleMembership = async (req,res) => {
    try {

        const {membershipId} = req.body
        const membership = await membershipModel.findById(membershipId)
        res.json({success:true,membership})

    } catch(error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

export {addMembership, listMemberships, removeMembership, singleMembership}