import React from 'react'
import { Link } from 'react-router-dom'

const PhotoItem = ({id, title, image, category, price}) => {
  return (
    <Link className='text-gray-700 cursor-pointer' to={`/photos/${id}`}>
        <div className=' overflow-hidden'>
            <img className='hover:scale-110 transition ease-in-out w-48 h-48 object-cover overflow-hidden' src={image} alt=""/>
        </div>
        <p className='pt-3 pb-1 text-lg font-bold'>{title}</p>
        <p className='pt-3 pb-1 text-sm'><span className='font-medium'>Category:</span> {category}</p>
        <p className='text-sm font-medium'><span className='font-medium'>Price: </span>${price}</p>
    </Link>
)
  
}

export default PhotoItem