import express from 'express'
import { listModels,addModel,removeModel,singleModel } from '../controllers/modelController.js'
import upload from '../middleware/multer.js'
import adminAuth from '../middleware/adminAuth.js'

const modelRouter = express.Router()

modelRouter.post('/add',adminAuth,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),addModel)
modelRouter.post('/remove',adminAuth,removeModel)
modelRouter.post('/single',singleModel)
modelRouter.get('/list',listModels)

export default modelRouter