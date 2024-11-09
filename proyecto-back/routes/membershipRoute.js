import express from 'express'
import { listMemberships,addMembership,removeMembership,singleMembership } from '../controllers/membershipController.js'
import upload from '../middleware/multer.js'
import adminAuth from '../middleware/adminAuth.js'

const membershipRouter = express.Router()

membershipRouter.post('/add',adminAuth,upload.fields([{name:'image1',maxCount:1}]),addMembership)
membershipRouter.post('/remove',adminAuth,removeMembership)
membershipRouter.post('/single',singleMembership)
membershipRouter.get('/list',listMemberships)

export default membershipRouter