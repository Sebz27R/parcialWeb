import React, { useContext } from 'react'
import Title from '../components/Title'
import NewsletterBox from '../components/NewsletterBox'
import { ShopContext } from '../context/ShopContext'

const Memberships = () => {

  const {addToCart} = useContext(ShopContext)

  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'OUR '} text2={'MEMBERSHIPS'}/>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFcP9Y5ZO2nHBXJnPwEiuY3jVfxqfWBMDzHA&s' alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Our memberships are subscriptions that you can buy so you get all the benefits of a Scarface member!!</p>
          <p>We have different types of memberships that you can see below! Join our giant community of Scarface right now !!</p>
          <b className='text-gray-800'>Why to get one of our memberships?</b>
          <p>Our memberships allows every member to have special discounts in their purchases, sends invitations to special VIP events and it allows our members to have the full Scarface experience!. What are you waiting to get your membership? </p>
        </div>
      </div>

      <div className='text-4xl py-4'>
        <Title text1={'OUR '} text2={' PLANS'}/>
      
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Basic Plan </b>
          <p className='text-gray-600'> Our basic plan allows to every member to enjoy all the benefits of a Scarface Member for a whole Month!!
          </p>
          <h1 className='text-3xl font-bold'>PRICE: $100 </h1>
          <button onClick={()=> addToCart("672edde208c785b6111167c0")} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>PURCHASE NOW</button>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Medium Plan</b>
          <p className='text-gray-600'>  Our basic plan allows to every member to enjoy all the benefits of a Scarface Member for 3 Months!!
          </p>
          <h1 className='text-3xl font-bold'>PRICE: $250 </h1>
          <button onClick={()=> addToCart("672ede0608c785b6111167c2")} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>PURCHASE NOW</button>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Premium Plan</b>
          <p className='text-gray-600'> Our basic plan allows to every member to enjoy all the benefits of a Scarface Member for 6 Months!!
          </p>
          <h1 className='text-3xl font-bold'>PRICE: $500 </h1>
          <button onClick={()=> addToCart("672ede2908c785b6111167c4")} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>PURCHASE NOW</button>
        </div>
      </div>
      <NewsletterBox/>
    </div>
  )
}

export default Memberships