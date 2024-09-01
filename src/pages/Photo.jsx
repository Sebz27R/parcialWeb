import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const Photo = () => {
  const {photoId} = useParams()
  const {photos, currency, addToCart} = useContext(ShopContext)
  const [photoData, setPhotoData] = useState(false)
  const [image, setImage] = useState('')
  const [format, setFormat] = useState('')

  const fetchPhotoData = async () => {
    
    photos.map((item)=>{
      if(item._id === photoId){
        setPhotoData(item)
        setImage(item.image)
        return null
      }
    })
  }

  useEffect(() => {
    fetchPhotoData()
  },[photoId, photos])

  return photoData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
        {/*Data */}
        <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

          {/*Images */}
          <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
            {/* <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
              {
               
                  <img src={photoData.image} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
              }
            </div> */}
            <div className='w-full sm:w-[80%]'>
              <img className='w-full h-auto' src={image} alt=""/>

            </div>
          </div>

          {/*Info */}
          <div className='flex-1'>
            <h1 className='font-medium text-2xl mt-2' >{photoData.title}</h1>
            <div className='flex item-center gap-1 mt-2'>
              <img src='https://cdn.iconscout.com/icon/free/png-256/free-star-bookmark-favorite-shape-rank-16-28621.png' alt="" className="w-5 5" />
              <img src='https://cdn.iconscout.com/icon/free/png-256/free-star-bookmark-favorite-shape-rank-16-28621.png' alt="" className="w-5 5" />
              <img src='https://cdn.iconscout.com/icon/free/png-256/free-star-bookmark-favorite-shape-rank-16-28621.png' alt="" className="w-5 5" />
              <img src='https://cdn.iconscout.com/icon/free/png-256/free-star-bookmark-favorite-shape-rank-16-28621.png' alt="" className="w-5 5" />
              <img src='https://cdn.iconscout.com/icon/free/png-256/free-star-bookmark-favorite-shape-rank-16-28621.png' alt="" className="w-5 5" />
              <p className='pl-2'>(122)</p>
            </div>
            <p className='mt-5 text-3xl font-medium'>{currency}{photoData.price}</p>
            <p className='mt-5 text-gray-500 md:w-4/5'>{photoData.category}</p>
            {/*Select -------- */}
            
            <div className='flex flex-col gap-4 my-8'>
              <p>Select photo format</p>
              <div className='flex gap-2'>
                <button onClick={() => setFormat('Digital')} className={`border py-2 px-4 bg-gray-100 ${format === 'Digital' ? 'border-orange-500' : ''}`}>Digital download</button>
                <button onClick={() => setFormat('Physical')} className={`border py-2 px-4 bg-gray-100 ${format === 'Physical' ? 'border-orange-500' : ''}`}>Physical print</button>
              </div>
            </div>
        
            <button onClick={() => addToCart(photoData._id,format)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
            <hr className='mt-8 sm:w-4/5'/>
            <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
              <p>100% Original Product</p>
              <p>Cash on delivery is available on this product</p>
              <p>High quality and high definition products!</p>
            </div>
          </div>
          
        </div>

        {/* Description and review */}
        <div className='mt-20'>
          <div className='flex'>
              <b className='border px-5 py-3 text-sm'>Description</b>
              <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
          </div>
          <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex cumque ea, expedita praesentium, beatae dolores sint blanditiis veniam enim labore iure nam unde ab qui quisquam? Sapiente tempore maxime neque?</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis sunt laborum alias aliquid assumenda minima voluptatum eveniet unde sit neque accusantium possimus nam id deserunt esse, delectus optio odit. Laboriosam?</p>
          </div>
        </div>

      {/*Related products */}
      {/* <RelatedProducts category={productData.category} color={productData.color}/> */}
    </div>
  ) : <div className='opacity-0'></div>
}

export default Photo