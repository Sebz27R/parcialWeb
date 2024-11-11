import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";
import susProductModel from "../models/susProductModel.js";
import photoModel from "../models/photoModel.js";

const addToCart = async (req, res) => {
    try {
        const { userId, itemId, format = null } = req.body;

        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

        // Obtiene los datos del producto de la base de datos correcta
        const productData = await getProductData(itemId);

        // Verifica si el producto requiere un formato
        if (productData.requiresFormat && !format) {
            console.log("Select a format");
            return res.status(400).json({ success: false, message: "Select a format" });
        }

        // Si el item es una membresía, maneja la lógica de membresías
        if (productData.isMembership) {
            if (cartData[itemId]) {
                return res.status(400).json({ success: false, message: "This membership is already in your cart." });
            }

            // Remueve cualquier membresía existente antes de añadir una nueva
            for (const id of productData.membershipIds) {
                if (cartData[id]) {
                    delete cartData[id];
                }
            }
        }

        // Lógica para añadir al carrito, maneja productos con y sin formato
        if (cartData[itemId]) {
            if (format) {
                cartData[itemId][format] = (cartData[itemId][format] || 0) + 1;
            } else {
                cartData[itemId] += 1;
            }
        } else {
            if (format) {
                cartData[itemId] = { [format]: 1 };
            } else {
                cartData[itemId] = 1;
            }
        }

        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({ success: true, message: "Added to cart" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Función para obtener datos del producto dependiendo de su tipo
const getProductData = async (itemId) => {
    // Intenta buscar en cada base de datos el item solicitado
    let product = await productModel.findById(itemId);
    if (product) return { ...product.toObject(), requiresFormat: false, isMembership: false };

    let subProduct = await susProductModel.findById(itemId);
    if (subProduct) return { ...subProduct.toObject(), requiresFormat: false, isMembership: false };

    let photo = await photoModel.findById(itemId);
    if (photo) return { ...photo.toObject(), requiresFormat: true, isMembership: false };

    throw new Error("Item not found");
};




const updateCart = async (req, res) => {
    try {
        const { userId, itemId, format = null, quantity } = req.body;

        // Obtiene los datos del usuario y su carrito
        const userData = await userModel.findById(userId);
        let cartData = userData.cartData || {};

        if (format) {
            // Actualiza la cantidad para items con formato (como fotos)
            if (cartData[itemId] && typeof cartData[itemId] === 'object') {
                cartData[itemId][format] = quantity;
            }
        } else {
            // Actualiza la cantidad para items sin formato (productos regulares)
            cartData[itemId] = quantity;
        }

        // Elimina items con cantidad cero para mantener el carrito limpio
        if (quantity <= 0) {
            if (format && cartData[itemId] && cartData[itemId][format] !== undefined) {
                delete cartData[itemId][format]; // Elimina el formato específico si la cantidad es cero
                
                // Limpia el item si no quedan formatos
                if (Object.keys(cartData[itemId]).length === 0) {
                    delete cartData[itemId];
                }
            } else if (!format) {
                delete cartData[itemId]; // Elimina el item sin formato si la cantidad es cero
            }
        }

        // Actualiza el carrito en la base de datos
        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({ success: true, message: "Cart updated" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


const getUserCart = async (req,res) =>{
    try{
        const {userId} = req.body

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData

        res.json({success:true, cartData})

    } catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

export {addToCart,updateCart,getUserCart}