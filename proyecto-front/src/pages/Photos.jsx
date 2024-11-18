import React, { useContext, useEffect, useState } from 'react'
import {ShopContext} from '../context/ShopContext'
import Title from '../components/Title'
import PhotoItem from '../components/PhotoItem'

const Photos = () => {
  const {photos, search, showSearch} = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(false)
  const [filterPhotos, setFilterPhotos] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState('relevant')

  const toggleCategory = (e) => {
    if (category.includes(e.target.value) ){
      setCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  // const toggleSubCategory = (e) => {
  //   if (subCategory.includes(e.target.value)) {
  //     setSubCategory(prev => prev.filter(item => item !== e.target.value))
  //   } else {
  //     setSubCategory(prev => [...prev, e.target.value])
  //   }
  // }

  const applyFilter = () => {
    let photosCopy = photos.slice()

    // if (showSearch && search){
    //   productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    // }

    if (category.length > 0){
      photosCopy = photosCopy.filter(item => category.includes(item.category))
    }

    // if (subCategory.length > 0){
    //   productsCopy = productsCopy.filter(item => subCategory.includes(item.color))
    // }

    setFilterPhotos(photosCopy)
  }

  const sortProduct = () => {

    let fpCopy = filterPhotos.slice()

    switch (sortType) {
      case 'low-high':
        setFilterPhotos(fpCopy.sort((a,b) => (a.price - b.price)))
        break
      
      case 'high-low':
        setFilterPhotos(fpCopy.sort((a,b) => (b.price-a.price)))
        break

      default:
        applyFilter()
        break
    }

  }

  useEffect(() => {
    applyFilter()
  }, [category,subCategory, search, showSearch,photos])

  useEffect(() => {
    sortProduct()
  }, [sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/*Filter */}
      <div className='min-w-60'>
        <p onClick={()=> setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src='https://cdn-icons-png.flaticon.com/512/32/32213.png' alt=""/>
        </p>
        {/*Category */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Events'} onChange={toggleCategory}/> Events
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Models'} onChange={toggleCategory}/> Models
            </p>
          </div>
        </div>
        {/* Subcategory */}
        {/* <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>COLORS/TONES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Purple'} onChange={toggleSubCategory}/> Purple
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Red'} onChange={toggleSubCategory}/> Red
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Pink'} onChange={toggleSubCategory}/> Black
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Light'} onChange={toggleSubCategory}/> Light
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Dark'} onChange={toggleSubCategory}/> Dark
            </p>
          </div>
        </div> */}

      </div>

      {/*right */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'PHOTOS'}/>
          {/**Sort */}
          <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/*Map products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filterPhotos.map((item,index) => (
            <PhotoItem key={index} title={item.title} id={item._id} price={item.price} image={item.image} category={item.category}/>
          ))}
        </div>

      </div>

    </div>
  )
}

export default Photos