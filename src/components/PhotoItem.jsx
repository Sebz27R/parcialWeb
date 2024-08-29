import React from 'react'
import { Link } from 'react-router-dom'

const PhotoItem = ({id, title, image, category, price}) => {
  return (
    <Link className='text-gray-700 cursor-pointer' to={`/photos/${id}`}>
        <div className=' overflow-hidden'>
            <img className='hover:scale-110 transition ease-in-out' src={image} alt=""/>
        </div>
        <p className='pt-3 pb-1 text-sm'>{title}</p>
        <p className='pt-3 pb-1 text-sm'>Category: {category}</p>
        <p className='text-sm font-medium'>Price: ${price}</p>
    </Link>
)
  
}

export default PhotoItem