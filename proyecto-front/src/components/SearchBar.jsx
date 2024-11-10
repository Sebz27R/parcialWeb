import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useLocation } from 'react-router-dom'

const SearchBar = () => {

    const {search, setSearch, showSearch, setShowSearch} = useContext(ShopContext)
    const[visible,setVisible] = useState(false)
    const location = useLocation()

    

    useEffect(() => {
        if(location.pathname.includes('products')){
            setVisible(true)
        } else {
            setVisible(false)
        }
    }, [location])


  return showSearch && visible ? (
    <div className='border-t border-b bg-gray-50 text-center'>
        <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
            <input value={search} onChange={(e)=> setSearch(e.target.value)} className='flex-1 outline-none bg-inherit text-sm' type="text" placeholder='Search' />
            <img className='w-7' src='https://icons.veryicon.com/png/o/miscellaneous/light-e-treasure-3/search-286.png' alt="" />
        </div>
        <img onClick={()=>setShowSearch(false)} className='inline w-4 cursor-pointer' src='https://icons.veryicon.com/png/o/miscellaneous/medium-thin-linear-icon/cross-23.png' alt=""/>
    </div>
  ) : null
}

export default SearchBar