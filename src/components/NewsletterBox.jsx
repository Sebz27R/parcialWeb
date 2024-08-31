import React from 'react'
import { useNavigate } from 'react-router-dom'

const NewsletterBox = () => {

    const navigate = useNavigate()

    const onSubmitHandler = (event) => {
        event.preventDefault()

        if (event.target[0].value === 'sus@monda.monda') {
            navigate('/suspicious-page')
        }
    }

  return (
    <div className='text-center'>
        <p className='text-2x1 font-medium text-gray-800'>
            Get your membership & get 20% off!
        </p>
        <p className='text-gray-400 mt-3'>
            Subscribe to our memberships to get full access to our products!!
        </p>
        <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input className='w-full sm:flex-1 outline-none' type='email' placeholder='Enter your email' required/>
            <button type='submit' className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE NOW</button>
        </form>
    </div>
  )
}

export default NewsletterBox