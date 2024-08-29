import React from 'react'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 
    sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>

        <div>
            <img src='https://static.vecteezy.com/system/resources/previews/019/817/385/original/money-exchange-icon-free-png.png' className='w-12 m-auto mb-5' alt=""/>
            <p className='font-semibold'>Easy Exchange Policy</p>
            <p className='text-gray-400'>We offer hassle free exchange policy</p>
        </div>
        <div>
            <img src='https://cdn-icons-png.flaticon.com/512/310/310831.png' className='w-12 m-auto mb-5' alt=""/>
            <p className='font-semibold'>7 Days Return Policy</p>
            <p className='text-gray-400'>We provide 7 days free return policy</p>
        </div>
        <div>
            <img src='https://cdn-icons-png.flaticon.com/512/5269/5269970.png' className='w-12 m-auto mb-5' alt=""/>
            <p className='font-semibold'>Best Customer Support</p>
            <p className='text-gray-400'>We provide 24/7 customer support</p>
        </div>
    </div>
  )
}

export default OurPolicy