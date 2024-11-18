import React, { useContext, useEffect } from 'react'
import ModelItem from '../components/ModelItem'
import { ShopContext } from '../context/ShopContext'
import { useState } from 'react'
import Title from '../components/Title'

const Model = () => {

  const {models} = useContext(ShopContext)
  
  const [filterModels, setFilterModels] = useState([])

  const applyModels = () =>{
    let modelsCopy = models.slice()

    setFilterModels(modelsCopy)
  }

  useEffect (() => {
    applyModels()
  },[models])


  return (
    
    <div>
      <div className='flex justify-between text-base sm:text-2xl mb-4'>
        <Title text1={'OUR'} text2={' MODELS'}/>
      </div>
      <div className='flex-1'>

        {/*Map products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filterModels.map((item,index) => (
          <ModelItem key={index}  id={item._id} name={item.name} booking={item.booking_info} portfolio={item.portfolio} achievements={item.achievements ? item.achievements : "No achievements"}/>
          ))}
        </div>

      </div>
    </div>
    
    // <div>Model</div>
  )
}

export default Model