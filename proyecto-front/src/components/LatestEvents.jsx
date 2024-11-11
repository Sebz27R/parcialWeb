import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import EventItem from './EventItem'

const LatestEvents = () => {

    const { events } = useContext(ShopContext)
    const [latestEvents, setLatestEvents] = useState([])

    useEffect(()=> {
        setLatestEvents(events.slice(0,10))
    },[events])

  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={'UPCOMING'} text2={' EVENTS'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            Here you can see the upcoming events of our brand. 
            </p>
        </div>

        {/** */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                latestEvents.map((item,index)=>(
                  <EventItem key={index} id={item._id} image={item.image} 
                  name={item.name} date={item.date} location={item.location} participating_models={item.participating_models} products_showcased={item.products_showcased}/>  
                ))
            }
        </div>

    </div>
  )
}

export default LatestEvents