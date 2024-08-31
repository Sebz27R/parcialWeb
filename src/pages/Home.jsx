import React from 'react'
import Hero from '../components/Hero'
import LatestProducts from '../components/LatestProducts'
import FeaturedProducts from '../components/FeaturedProducts'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'
import LatestEvents from '../components/LatestEvents'
import FeaturedModels from '../components/FeaturedModels'

const Home = () => {
  return (
    <div>
        <Hero/>
        <LatestProducts/>
        <FeaturedModels/>
        <FeaturedProducts/>
        <LatestEvents/>
        <OurPolicy/>
        <NewsletterBox/>
    </div>
  )
}

export default Home