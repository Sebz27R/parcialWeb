import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2'>
        <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
            <NavLink className={'flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l'} to={"/add"}>
                <img className='w-5 h-5' src="https://cdn-icons-png.flaticon.com/512/992/992651.png" alt="" />
                <p className='hidden md:block'>Add products</p>
            </NavLink>
            <NavLink className={'flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l'} to={"/list"}>
                <img className='w-5 h-5' src="https://w7.pngwing.com/pngs/1002/569/png-transparent-computer-icons-shopping-list-others-angle-text-black-thumbnail.png" alt="" />
                <p className='hidden md:block'>List products</p>
            </NavLink>
            <NavLink className={'flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l'} to={"/orders"}>
                <img className='w-5 h-5' src="https://uxwing.com/wp-content/themes/uxwing/download/e-commerce-currency-shopping/order-placed-purchased-icon.svg" alt="" />
                <p className='hidden md:block'>Orders</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar