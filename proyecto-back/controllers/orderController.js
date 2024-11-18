
import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import Stripe from "stripe"

const currency = "usd"
const deliveryCharge = 10

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const membershipIds = [
    "672edde208c785b6111167c0",
    "672ede0608c785b6111167c2",
    "672ede2908c785b6111167c4",
];

// Helper function to handle membership updates
const updateUserMembership = async (userId, items) => {
    // Verificar si hay membresías en los items
    const membershipItem = items.find(item => membershipIds.includes(item._id));

    if (membershipItem) {
        // Actualizar la membresía del usuario
        await userModel.findByIdAndUpdate(userId, { membership: membershipItem._id });
    } else {
        // Si no hay membresía, eliminar el atributo membership
        await userModel.findByIdAndUpdate(userId, { membership: null });
    }
};

// Placing orders using Cash on delivery Method

const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
       

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now(),
        };

        console.log("Items in order:", items);


        const newOrder = new orderModel(orderData);
        await newOrder.save();

        // Actualizar membresía del usuario
        await updateUserMembership(userId, items);

        // Vaciar el carrito del usuario
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        res.json({ success: true, message: "Order placed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

//Placing orders using Stripe
const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const { origin } = req.headers;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now(),
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }));

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: deliveryCharge * 100,
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: "payment",
        });

        // Actualizar membresía del usuario
        await updateUserMembership(userId, items);

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

//List all orders for admin panel

const allOrders = async (req,res) =>{

    try {
        const orders = await orderModel.find({})
        res.json({success:true,orders})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
    
}

//User order data for frontend

const userOrders = async (req,res) =>{
    try {
        
        const {userId} = req.body

        const orders = await orderModel.find({userId})
        res.json({success:true, orders})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
    
}

//Update order status from admin
const updateStatus = async (req,res) =>{
    try {
        const {orderId, status} = req.body
        await orderModel.findByIdAndUpdate(orderId, {status})
        res.json({success:true, message:'Status updated'})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
    
}

// Check if a user has an active membership
const checkMembership = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await userModel.findById(userId).populate("membership");

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        if (user.membership) {
            res.json({
                success: true,
                hasMembership: true,
                membership: user.membership,
            });
        } else {
            res.json({
                success: true,
                hasMembership: false,
                message: "User does not have an active membership",
            });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export {placeOrder, placeOrderStripe, allOrders, userOrders, updateStatus,checkMembership}
