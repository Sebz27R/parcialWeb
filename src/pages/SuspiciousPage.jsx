import React, { useContext, useEffect, useState } from 'react'
import {ShopContext} from '../context/ShopContext'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const SuspiciousPage = () => {
  
    const {susProducts, search, showSearch} = useContext(ShopContext)
    const [showFilter, setShowFilter] = useState(false)
    const [filterProducts, setFilterProducts] = useState([])
    const [category, setCategory] = useState([])
    const [sortType, setSortType] = useState('relevant')
  
    const toggleCategory = (e) => {
      if (category.includes(e.target.value) ){
        setCategory(prev => prev.filter(item => item !== e.target.value))
      } else {
        setCategory(prev => [...prev, e.target.value])
      }
    }

    const applyFilter = () => {
      let productsCopy = susProducts.slice()
  
      if (showSearch && search){
        productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
      }
  
      if (category.length > 0){
        productsCopy = productsCopy.filter(item => category.includes(item.category))
      }
  
      setFilterProducts(productsCopy)
    }
  
    const sortProduct = () => {
  
      let fpCopy = filterProducts.slice()
  
      switch (sortType) {
        case 'low-high':
          setFilterProducts(fpCopy.sort((a,b) => (a.price - b.price)))
          break
        
        case 'high-low':
          setFilterProducts(fpCopy.sort((a,b) => (b.price-a.price)))
          break
  
        default:
          applyFilter()
          break
      }
  
    }
  
    useEffect(() => {
      applyFilter()
    }, [category, search, showSearch])
  
    useEffect(() => {
      sortProduct()
    }, [sortType])
  
    return (
      <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
        {/*Filter */}
        <div className='min-w-60'>
          <p onClick={()=> setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
            <img className={`h-3 sm:hidden ${showFilter && 'rotate-90'}`} src='https://cdn-icons-png.flaticon.com/512/32/32213.png' alt=""/>
          </p>
          {/*Category */}
          <div className={`border border-gray-300 pl-5 py-3 mt-6 ${!showFilter && 'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              <p className='flex gap-2'>
                <input className='w-3' type='checkbox' value={'Smokable'} onChange={toggleCategory}/> Smokable
              </p>
              <p className='flex gap-2'>
                <input className='w-3' type='checkbox' value={'Edible'} onChange={toggleCategory}/> Edible
              </p>
              <p className='flex gap-2'>
                <input className='w-3' type='checkbox' value={'Injections'} onChange={toggleCategory}/> Injections
              </p>
              <p className='flex gap-2'>
                <input className='w-3' type='checkbox' value={'Snorted'} onChange={toggleCategory}/> Snorted
              </p>
              <p className='flex gap-2'>
                <input className='w-3' type='checkbox' value={'Skin Absorbable'} onChange={toggleCategory}/> Skin Absorbable
              </p>
            </div>
          </div>
        </div>
  
        {/*right */}
        <div className='flex-1'>
          <div className='flex justify-between text-base sm:text-2xl mb-4'>
            <Title text1={'ALL'} text2={'PRODUCTS'}/>
            {/**Sort */}
            <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
              <option value="relevant">Sort by: Relevant</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
          </div>
  
          {/*Map products */}
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
            {filterProducts.map((item,index) => (
              <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} description={item.description} sus={true}/>
            ))}
          </div>
  
        </div>
  
      </div>
    )
}

export default SuspiciousPage