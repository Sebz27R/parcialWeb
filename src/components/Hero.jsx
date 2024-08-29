import React from 'react'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400 '>
        {/*Left */}
        <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
            <div className='text-[#414141]'>
                <div className='flex items-center gap-2'>
                    <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                    <p className='font-medium text-sm md:text-base'>WELCOME TO ANDREA'S SHOP</p>
                </div>
                <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Enjoy our newest products!</h1>
                <div className='flex items-center gap-2'>
                    <p className='font-semibold text-sm md:text-base'>VARIETY IS OUR PRIORITY</p>
                    <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
                </div>
            </div>
        </div>
        {/*Right */}
        <img className='w-full sm:w-1/2' src='https://t4.ftcdn.net/jpg/04/94/62/77/360_F_494627784_CbD4GPWybITWOejzEJEqqcm9EpxcQwoz.jpg' alt=""/>
    </div>
  )
}

export default Hero