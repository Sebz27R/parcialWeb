import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'

const Cart = () => {

  const {susProducts,memberships,products, photos, currency, cartItems, updateQuantity, navigate, requiresFormat} = useContext(ShopContext)

  const [cartData, setCartData] = useState([])

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      // Check if the item DOES require a format instead of does NOT
      if (requiresFormat(items)) {
        // Handle items with formats (e.g., photos)
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              format: item,
              quantity: cartItems[items][item],
            });
          }
        }
      } else {
        // Handle items without formats (e.g., regular products)
        if (cartItems[items] > 0) {
          tempData.push({
            _id: items,
            quantity: cartItems[items],
          });
        }
      }
    }
    console.log(tempData);
    setCartData(tempData);
  }, [cartItems]);
  

  return (
    <div className='border-t pt-14'>

      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={' CART'}/>

      </div>

      <div>
        {
          cartData.map((item,index) => {
            const productData = products.find((product)=> product._id === item._id )
            const susProductData = susProducts.find((susProduct)=> susProduct._id === item._id )
            const photoData = photos.find((photo)=> photo._id === item._id )
            const membershipsData = memberships.find((membership)=> membership._id === item._id )

            if (membershipsData) {
              return (
                <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                  <div className='flex items-start gap-6'>
                    <img className='w-16 sm:-20' src={membershipsData.image} alt="" />
                    <div>
                      <p className='text-xs sm:text-lg font-medium'>{membershipsData.name}</p>
                      <div className='flex items-center gap-5 mt-2'>
                        <p>{currency}{membershipsData.price}</p>
                      </div>
                    </div>
                  </div>
                  <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50 '>{membershipsData.duration}</p>
                  <img onClick={()=>updateQuantity(item._id,0)} className='w-4 mr-4 sm:w-5 cursor-pointer' src='https://cdn-icons-png.flaticon.com/512/484/484662.png' alt="" />
                </div>
              )
            }
            if (productData) {
              return (
                <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                  <div className='flex items-start gap-6'>
                    <img className='w-16 sm:-20' src={productData.image[0]} alt="" />
                    <div>
                      <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                      <div className='flex items-center gap-5 mt-2'>
                        <p>{currency}{productData.price}</p>
                        <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{productData.color}</p>
                      </div>
                    </div>
                  </div>
                  <input onChange={(e)=> e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id,Number(e.target.value))} className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' type= "number" min={1} defaultValue={item.quantity} />
                  <img onClick={()=>updateQuantity(item._id,0)} className='w-4 mr-4 sm:w-5 cursor-pointer' src='https://cdn-icons-png.flaticon.com/512/484/484662.png' alt="" />
                </div>
              )
            }
            if (susProductData) {
              return (
                <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                  <div className='flex items-start gap-6'>
                    <img className='w-16 sm:-20' src={susProductData.image[0]} alt="" />
                    <div>
                      <p className='text-xs sm:text-lg font-medium'>{susProductData.name}</p>
                      <div className='flex items-center gap-5 mt-2'>
                        <p>{currency}{susProductData.price}</p>
                        <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{susProductData.category}</p>
                      </div>
                    </div>
                  </div>
                  <input onChange={(e)=> e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id,Number(e.target.value))} className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' type= "number" min={1} defaultValue={item.quantity} />
                  <img onClick={()=>updateQuantity(item._id,0)} className='w-4 mr-4 sm:w-5 cursor-pointer' src='https://cdn-icons-png.flaticon.com/512/484/484662.png' alt="" />
                </div>
              )
            }

            if (photoData) {
              return (
                <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                  <div className='flex items-start gap-6'>
                    <img className='w-16 sm:-20' src={photoData.image} alt="" />
                    <div>
                      <p className='text-xs sm:text-lg font-medium'>{photoData.title}</p>
                      <div className='flex items-center gap-5 mt-2'>
                        <p>{currency}{photoData.price}</p>
                        <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{photoData.category}</p>
                      </div>
                      {item.format && (
                        <p className="mt-1 text-sm text-gray-500">Format: {item.format}</p>)}
                    </div>
                  </div>
                  <input onChange={(e)=> e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id,Number(e.target.value),item.format)} className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' type= "number" min={1} defaultValue={item.quantity} />
                  <img onClick={()=>updateQuantity(item._id,0,item.format)} className='w-4 mr-4 sm:w-5 cursor-pointer' src='https://cdn-icons-png.flaticon.com/512/484/484662.png' alt="" />
                </div>
              )
            }
            
          })
        }
      </div>

      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal/>
          <div className='w-full text-end'>
            <button onClick={()=>navigate('/place-order')} className='bg-black text-white text-sm my-8 px-8 py-3'>PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Cart