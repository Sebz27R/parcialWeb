import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({id, image, name, price, description, sus}) => {
    
        const {currency} = useContext(ShopContext)

    return (
    <Link className='text-gray-700 cursor-pointer' to={`/product${sus? "/suspicious" : ""}/${id}`}>
        <div className=' overflow-hidden'>
            <img className='hover:scale-110 transition ease-in-out w-48 h-48 object-cover overflow-hidden' src={image[0]} alt=""/>
        </div>
        <p className='pt-3 pb-1 text-lg font-bold'>{name}</p>
        <p className='pt-3 pb-1 text-sm'>{description}</p>
        <p className='text-sm font-medium'>{currency}{price}</p>
    </Link>
  )
}

export default ProductItem