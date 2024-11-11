import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const FeaturedProducts = () => {

    const {products} = useContext(ShopContext)
    const [featuredProduct, setFeaturedProduct] = useState([])

        useEffect(()=> {
        const bestProduct = products.filter((item)=>(item.featured))
        setFeaturedProduct(bestProduct.slice(0,5))

    },[products])

  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
            <Title text1={'FEATURED'} text2={' PRODUCTS'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            Here you can find the most popular products of the catalog</p>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                featuredProduct.map((item,index) => (
                    <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} description={item.description}/>
                ))
            }

        </div>
    </div>
  )
}

export default FeaturedProducts