import React from 'react'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm '>
            <div>
                <img src='https://cdn.freelogovectors.net/wp-content/uploads/2023/11/scarface_logo-freelogovectors.net_.png' className='mb-5 w-32' alt="" />
                <p className='w-full md:w-2/3 text-gray-600' >
                Andrea's "ScarFace" shop has a lot of variety in their products. Subscribe to one of our memberships and enjoy the exclusive catalog products that we offer...
                </p>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+1-847-281-0927</li>
                    <li>contact.andreamakeup@scarface.com</li>
                </ul>
            </div>

        </div>

        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2024@ andreashop.com - All Rights Reserved</p>
        </div>

    </div>
  )
}

export default Footer