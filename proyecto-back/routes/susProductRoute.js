import express from 'express'
import { listSusProducts,addSusProduct,removeSusProduct,singleSusProduct } from '../controllers/susProductController.js'
import upload from '../middleware/multer.js'
import adminAuth from '../middleware/adminAuth.js'

const susProductRouter = express.Router()

susProductRouter.post('/add',adminAuth,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),addSusProduct)
susProductRouter.post('/remove',adminAuth,removeSusProduct)
susProductRouter.post('/single',singleSusProduct)
susProductRouter.get('/list',listSusProducts)

export default susProductRouter