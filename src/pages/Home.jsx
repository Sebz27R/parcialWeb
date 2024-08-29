import React from 'react'
import Hero from '../components/Hero'
import LatestProducts from '../components/LatestProducts'
import FeaturedProducts from '../components/FeaturedProducts'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'

const Home = () => {
  return (
    <div>
        <Hero/>
        <LatestProducts/>
        <FeaturedProducts/>
        <OurPolicy/>
        <NewsletterBox/>
    </div>
  )
}

export default Home