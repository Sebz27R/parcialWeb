import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";
import susProductModel from "../models/susProductModel.js";
import photoModel from "../models/photoModel.js";
import membershipModel from "../models/membershipModel.js";

// Lista de IDs de membresías
const membershipIds = [
    "672edde208c785b6111167c0",
    "672ede0608c785b6111167c2",
    "672ede2908c785b6111167c4",
];

const addToCart = async (req, res) => {
    try {
        const { userId, itemId, format = null } = req.body;

        const userData = await userModel.findById(userId);
        let cartData = userData.cartData || {};

        // Verifica si el item es una membresía
        const isMembership = membershipIds.includes(itemId);

        if (isMembership) {
            // Si ya hay una membresía en el carrito, eliminarla
            for (const id of membershipIds) {
                if (cartData[id]) {
                    delete cartData[id]; // Elimina la membresía actual
                }
            }

            // Añadir la nueva membresía al carrito
            cartData[itemId] = 1;

            // Actualiza el carrito en la base de datos
            await userModel.findByIdAndUpdate(userId, { cartData });

            return res.json({ success: true, message: "Membership updated in cart" });
        } else {
            // Obtiene los datos del producto
            const productData = await getProductData(itemId);

            // Verifica si requiere formato pero no se especifica
            if (productData.requiresFormat && !format) {
                return res.status(400).json({ success: false, message: "Select a format" });
            }

            // Añade al carrito productos con o sin formato
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

            // Actualiza el carrito en la base de datos
            await userModel.findByIdAndUpdate(userId, { cartData });

            return res.json({ success: true, message: "Added to cart" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Función para obtener datos del producto dependiendo de su tipo
const getProductData = async (itemId) => {
    // Intenta buscar en cada base de datos el item solicitado
    let product = await productModel.findById(itemId);
    if (product) return { ...product.toObject(), requiresFormat: false };

    let subProduct = await susProductModel.findById(itemId);
    if (subProduct) return { ...subProduct.toObject(), requiresFormat: false };

    let photo = await photoModel.findById(itemId);
    if (photo) return { ...photo.toObject(), requiresFormat: true };

    let membership = await membershipModel.findById(itemId);
    if (membership) return membership.toObject();

    throw new Error("Item not found");
};

const updateCart = async (req, res) => {
    try {
        const { userId, itemId, format = null, quantity } = req.body;

        const userData = await userModel.findById(userId);
        let cartData = userData.cartData || {};

        if (quantity <= 0) {
            // Eliminar items con cantidad 0
            if (format) {
                delete cartData[itemId][format];
                if (Object.keys(cartData[itemId]).length === 0) {
                    delete cartData[itemId];
                }
            } else {
                delete cartData[itemId];
            }
        } else {
            if (format) {
                cartData[itemId] = cartData[itemId] || {};
                cartData[itemId][format] = quantity;
            } else {
                cartData[itemId] = quantity;
            }
        }

        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({ success: true, message: "Cart updated" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body;

        const userData = await userModel.findById(userId);
        const cartData = userData.cartData || {};

        res.json({ success: true, cartData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { addToCart, updateCart, getUserCart };
