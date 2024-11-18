import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'


export const ShopContext = createContext()

const ShopContextProvider = (props) => {
    const currency = '$';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search,setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState({})
    const navigate = useNavigate()
    const membershipIds = ["672edde208c785b6111167c0", "672ede0608c785b6111167c2", "672ede2908c785b6111167c4"];
    const [products,setProducts] = useState([])
    const [susProducts,setSusProducts] = useState([]) 
    const [events,setEvents] = useState([]) 
    const [photos,setPhotos] = useState([]) 
    const [models,setModels] = useState([])
    const [memberships,setMemberships] = useState([])
    const [token,setToken] = useState('')


    const addToCart = async (itemId, format = null) => {
        // Si el producto requiere un formato y no se ha seleccionado, muestra el error
        if (requiresFormat(itemId) && !format) {
            toast.error('Select photo format');
            return;
        }
    
        let cartData = structuredClone(cartItems); // Copia profunda del carrito actual

        if (membershipIds.includes(itemId)) {

            if (cartData[itemId]) {
                toast.info("This membership is already in your cart.");
                return;
            }
            // Remove any existing membership before adding a new one
            for (const id of membershipIds) {
              if (cartData[id]) {
                delete cartData[id]; // Remove the existing membership from the cart
              }
            }
            toast.success("Membership successfully added to cart");
          }
    
        // Si el producto ya está en el carrito
        if (cartData[itemId]) {
            // Si es un producto con formato
            if (format) {
                if (cartData[itemId][format]) {
                    cartData[itemId][format] += 1;
                     // Incrementa la cantidad del formato específico
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
                toast.success("Photo successfully added to cart");
            } else {
                // Añadir producto sin formato
                cartData[itemId] = 1;
                toast.success("Product successfully added to cart");
            }
        }
    
        setCartItems(cartData); // Actualiza el estado del carrito con los cambios

        if(token){
            try {
                await axios.post(backendUrl + '/api/cart/add', {itemId,format}, {headers:{token}})

            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
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
    

    const updateQuantity = async (itemId, quantity, format = null) => {
        // Clone the cartItems to avoid directly mutating the state
        let cartData = structuredClone(cartItems);
      
        if (format) {
          // Update quantity for items with formats (like photos)
          if (cartData[itemId] && typeof cartData[itemId] === 'object') {
            cartData[itemId][format] = quantity;
          }
        } else {
          // Update quantity for items without formats (regular products)
          cartData[itemId] = quantity;
        }
      
        // Remove items with zero quantity to avoid clutter in the cart
        if (quantity <= 0) {
          if (format && cartData[itemId][format] !== undefined) {
            delete cartData[itemId][format]; // Delete specific format when quantity is zero
            // Clean up the item if no formats are left
            if (Object.keys(cartData[itemId]).length === 0) {
              delete cartData[itemId];
            }
          } else if (!format) {
            delete cartData[itemId]; // Delete item without format when quantity is zero
          }
        }
      
        // Update state with the modified cart data
        setCartItems(cartData);

        if (token){
            try {
                await axios.post(backendUrl + '/api/cart/update', {itemId,format,quantity}, {headers:{token}})

            } catch (error) {
                console.log(error)
                toast.error(error.message)   
            }
        }

      };
      

    const getCartAmount = () => {
        let totalAmount = 0;
    
        for (const itemId in cartItems) {
            // Buscar la información del producto o foto correspondiente
            const itemInfo = products.find(product => product._id === itemId);
            const photoInfo = photos.find(photo => photo._id === itemId);
            const membershipInfo = memberships.find(membership => membership._id === itemId)
            const susProductsInfo = susProducts.find(susProduct => susProduct._id ===itemId)
            const item = cartItems[itemId];
    
            try {
                if (typeof item === 'number') {
                    // Caso de productos sin formato
                    if (itemInfo) {
                        totalAmount += itemInfo.price * item;
                    }
                    if (membershipInfo) {
                        totalAmount += membershipInfo.price * item
                    }
                    if(susProductsInfo){
                        totalAmount += susProductsInfo.price * item
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


    const getProductsData = async () => {
        try {
            
            const response = await axios.get(backendUrl + '/api/product/list')
            if(response.data.success){
                setProducts(response.data.products)
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getSusProductsData = async () => {
        try {
            
            const response = await axios.get(backendUrl + '/api/susProduct/list')
            if(response.data.success){
                setSusProducts(response.data.susProducts)
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    const getPhotosData = async () => {
        try {
            
            const response = await axios.get(backendUrl + '/api/photo/list')
            if(response.data.success){
                setPhotos(response.data.photos)
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    const getModelsData = async () => {
        try {
            
            const response = await axios.get(backendUrl + '/api/model/list')
            if(response.data.success){
                setModels(response.data.models)
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    const getEventsData = async () => {
        try {
            
            const response = await axios.get(backendUrl + '/api/event/list')
            if(response.data.success){
                setEvents(response.data.events)
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    const getMembershipsData = async () => {
        try {
            
            const response = await axios.get(backendUrl + '/api/membership/list')
            if(response.data.success){
                setMemberships(response.data.memberships)
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getUserCart = async (token) =>{
        try {
            const response = await axios.post(backendUrl + '/api/cart/get',{},{headers:{token}})
            if (response.data.success){
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const checkMembershipStatus = async (token) => {
    
        try {
            const response = await axios.post(backendUrl + '/api/order/check-membership',{},{headers:{token}});
            
            if (response.data.success) {
                const membershipData = response.data.hasMembership;
                if (membershipData) {
                    // Aquí puedes establecer el estado o hacer alguna acción
                    return true; // Por ejemplo, guardarlo en el estado de membresía
                } else {
                    toast.info("User does not have an active membership");
                    return false
                }
            } else {
                
                toast.error(response.data.message || "Failed to check membership");
                return false
            }
        } catch (error) {
            console.error("Error checking membership", error);
            toast.error("Error checking membership status");
        }
    };
    
    

    useEffect(()=>{
        getProductsData()
        getSusProductsData()
        getPhotosData()
        getMembershipsData()
        getEventsData()
        getModelsData()
    },[])

    useEffect(()=>{
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    },[])

    
    

    const value = {
        products , susProducts , currency , delivery_fee,
        search, setSearch, showSearch,setShowSearch,
        cartItems, addToCart, getCartCount,
        updateQuantity, getCartAmount,
        navigate, models, photos, events,requiresFormat,
        memberships, backendUrl, token, setToken, setCartItems,checkMembershipStatus
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider