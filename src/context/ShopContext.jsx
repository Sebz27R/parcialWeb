import { createContext, useEffect, useState } from "react";
import { products, susProducts } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { models, photos, events } from "../assets/assets";


export const ShopContext = createContext()

const ShopContextProvider = (props) => {
    const currency = '$';
    const delivery_fee = 10;
    const [search,setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState({})
    const navigate = useNavigate()


    const addToCart = async (itemId, format = null) => {
        // Si el producto requiere un formato y no se ha seleccionado, muestra el error
        if (requiresFormat(itemId) && !format) {
            toast.error('Select photo format');
            return;
        }
    
        let cartData = structuredClone(cartItems); // Copia profunda del carrito actual
    
        // Si el producto ya está en el carrito
        if (cartData[itemId]) {
            // Si es un producto con formato
            if (format) {
                if (cartData[itemId][format]) {
                    cartData[itemId][format] += 1; // Incrementa la cantidad del formato específico
                } else {
                    cartData[itemId][format] = 1; // Inicia con cantidad 1 si no existe el formato
                }
            } else {
                // Producto sin formato, solo incrementar la cantidad
                cartData[itemId] += 1;
            }
        } else {
            // Si el producto no está en el carrito
            if (format) {
                // Añadir producto con formato
                cartData[itemId] = { [format]: 1 };
            } else {
                // Añadir producto sin formato
                cartData[itemId] = 1;
            }
        }
    
        setCartItems(cartData); // Actualiza el estado del carrito con los cambios
    };
    

    const requiresFormat = (itemId) => {
    const photo = photos.find(product => product._id === itemId);
    return photo && photo.format; 
};

    



    useEffect(()=>{
        console.log(cartItems)
    },[cartItems])

    const getCartCount = () => {
        let totalCount = 0;
    
        for (const itemId in cartItems) {
            const item = cartItems[itemId];
    
            if (typeof item === 'number') {
                // Caso de productos sin formato
                totalCount += item;
            } else if (typeof item === 'object') {
                // Caso de productos con formato
                for (const format in item) {
                    try {
                        if (item[format] > 0) {
                            totalCount += item[format];
                        }
                    } catch (error) {
                        console.error(`Error counting format: ${format}`, error);
                    }
                }
            }
        }
    
        return totalCount;
    };
    

    const updateQuantity = async (itemId,quantity) => {
        let cartData = structuredClone(cartItems)

        cartData[itemId] = quantity

        setCartItems(cartData)
    }

    const getCartAmount = () => {
        let totalAmount = 0;
    
        for (const itemId in cartItems) {
            // Buscar la información del producto o foto correspondiente
            const itemInfo = products.find(product => product._id === itemId);
            const photoInfo = photos.find(photo => photo._id === itemId);
            const item = cartItems[itemId];
    
            try {
                if (typeof item === 'number') {
                    // Caso de productos sin formato
                    if (itemInfo) {
                        totalAmount += itemInfo.price * item;
                    }
                } else if (typeof item === 'object') {
                    // Caso de productos con formato
                    if (photoInfo) {
                        // Usar el mismo precio para todas las fotos
                        const photoPrice = photoInfo.price; // Precio común para todas las fotos
                        for (const format in item) {
                            totalAmount += photoPrice * item[format];
                        }
                    }
                }
            } catch (error) {
                console.error(`Error calculating total amount for item ID: ${itemId}`, error);
            }
        }
    
        return totalAmount;
    };
    
    

    const value = {
        products , susProducts , currency , delivery_fee,
        search, setSearch, showSearch,setShowSearch,
        cartItems, addToCart, getCartCount,
        updateQuantity, getCartAmount,
        navigate, models, photos, events
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider