import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ModelItem from './ModelItem'

const FeaturedModels = () => {
    const { models } = useContext(ShopContext)
    const [latestModels, setLatestModels] = useState([])

    useEffect(()=> {
        setLatestModels(models.slice(0,10))
    },[models])

  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={'FEATURED'} text2={' MODELS'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            Here you can see the featured models that works in our community. 
            </p>
        </div>

        {/** */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                latestModels.map((item,index)=>(
                  <ModelItem key={index} id={item._id} name={item.name} booking={item.booking_info} portfolio={item.portfolio} achievements={item.achievements}/>  
                ))
            }
        </div>

    </div>
  )
}

export default FeaturedModels