import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connect } from 'mongoose'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import eventRouter from './routes/eventRoute.js'
import modelRouter from './routes/modelRoute.js'
import membershipRouter from './routes/membershipRoute.js'
import photoRouter from './routes/photoRoute.js'
import susProductRouter from './routes/susProductRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

//App config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

//Middlwares
app.use(express.json())
app.use(cors())

// Apin endpoints

app.use('/api/user', userRouter)
app.use('/api/product',productRouter)
app.use('/api/event', eventRouter)
app.use('/api/model',modelRouter)
app.use('/api/membership',membershipRouter)
app.use('/api/photo',photoRouter)
app.use('/api/susProduct',susProductRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

app.get('/', (req,res)=> {
    res.send("Api working")
})

app.listen(port, ()=> console.log('Server started on port: ' + port))