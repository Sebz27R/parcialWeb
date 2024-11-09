import express from 'express'
import { listPhotos,addPhoto,removePhoto,singlePhoto } from '../controllers/photoController.js'
import upload from '../middleware/multer.js'
import adminAuth from '../middleware/adminAuth.js'

const photoRouter = express.Router()

photoRouter.post('/add',adminAuth,upload.fields([{name:'image1',maxCount:1}]),addPhoto)
photoRouter.post('/remove',adminAuth,removePhoto)
photoRouter.post('/single',singlePhoto)
photoRouter.get('/list',listPhotos)

export default photoRouter