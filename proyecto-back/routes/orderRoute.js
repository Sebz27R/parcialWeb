import express from 'express'

import {placeOrder, placeOrderStripe, allOrders, userOrders, updateStatus, checkMembership} from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStripe)

orderRouter.post('/userOrders',authUser,userOrders)
orderRouter.post('/check-membership',authUser,checkMembership)

export default orderRouter