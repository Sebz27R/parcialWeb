import React, { useContext, useEffect } from 'react'
import EventItem from '../components/EventItem'
import { ShopContext } from '../context/ShopContext'
import { useState } from 'react'
import Title from '../components/Title'

const Events = () => {
  const {events} = useContext(ShopContext)
  
  const [filterEvents, setFilterEvents] = useState([])

  const applyEvents = () =>{
    let eventsCopy = events.slice()

    setFilterEvents(eventsCopy)
  }

  useEffect (() => {
    applyEvents()
  },[events])

  return (
    <div>
      <div className='flex justify-between text-base sm:text-2xl mb-4'>
        <Title text1={'OUR'} text2={' EVENTS'}/>
      </div>
      <div className='flex-1'>

        {/*Map products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filterEvents.map((item,index) => (
          <EventItem key={index}  id={item._id} name={item.name} image={item.image} date={item.date} location={item.location}
          participating_models={item.participating_models} products_showcased={item.products_showcased}/>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Events