import React from 'react'
import { Link } from 'react-router-dom'


const ModelItem = ({id, name, booking, portfolio, achievements}) => {
    return (
        <Link className='text-gray-700 cursor-pointer' to={`/models/${id}`}>
            <div className=' overflow-hidden'>
                <img className='hover:scale-110 transition ease-in-out w-48 h-48 object-cover overflow-hidden' src={portfolio[0]} alt=""/>
            </div>
            <p className='pt-3 pb-1 text-lg font-bold'>{name}</p>
            <p className='pt-3 pb-1 text-sm'>Booking: {booking}</p>
            <p className='text-sm font-medium'>Achievements: {achievements[0]}</p>
        </Link>
      )
}

export default ModelItem