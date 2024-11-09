import express from 'express'
import { listEvents,addEvent,removeEvent,singleEvent } from '../controllers/eventController.js'
import upload from '../middleware/multer.js'
import adminAuth from '../middleware/adminAuth.js'

const eventRouter = express.Router()

eventRouter.post('/add',adminAuth,upload.fields([{name:'image1',maxCount:1}]),addEvent)
eventRouter.post('/remove',adminAuth,removeEvent)
eventRouter.post('/single',singleEvent)
eventRouter.get('/list',listEvents)

export default eventRouter