import userModel from "../models/userModel.js"
import validator from "validator"
import bycrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//Route for user login
const loginUser = async (req,res) => {
    try {
        const {email,password} = req.body;
        const user = await userModel.findOne({email})

        if (!user){
            return res.json({success:false, message:"User doesn't exists"})
        }

        const isMatch = await bycrypt.compare(password,user.password)

        if (isMatch) {
            const token = createToken(user._id)
            res.json({success:true, token})
        }
        else {
            res.json({success:false, message: 'Invalid credentials'})
        }

    } catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//Route for user register
const registerUser = async (req,res) =>{
    try{
        const {name,email,password} = req.body
        //checking user if already exists
        const exists = await userModel.findOne({email})
        if (exists){
            return res.json({success:false, message:"User already exists"})
        }

        // validating email format & strong password
        if (!validator.isEmail(email)){
            return res.json({success:false, message:"Please enter a valid email"})
        }

        if (password.length < 8){
            return res.json({success:false, message:"Please enter a strong password"})
        }

        // hashing user password
        const salt = await bycrypt.genSalt(10)
        const hashedPassword = await bycrypt.hash(password,salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)

        res.json({success:true, token})

    } catch (error){

        console.log(error)
        res.json({success:false, message:error.message})
    }

}

//Route for admin login
const adminLogin = async (req,res) => {
    try {
        const {email,password} = req.body
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
           const token = jwt.sign(email+password,process.env.JWT_SECRET)
           res.json({success:true,token})
        } else {
            res.json({success:false,message:"Invalid credentials"})
        }
    } catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

// Nueva ruta para verificar el estado de membresía de un usuario
const checkMembershipStatus = async (req, res) => {
    try {
        const { id } = req.params; // Obtener el id del usuario desde los parámetros de la ruta
        const user = await userModel.findById(id); // Buscar al usuario en la base de datos

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        // Devolver el estado de la membresía
        res.json({ success: true, membershipStatus: user.membership });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


export {loginUser, registerUser, adminLogin, checkMembershipStatus}