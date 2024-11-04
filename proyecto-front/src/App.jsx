import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Model from './pages/Model'
import Events from './pages/Events'
import Photos from './pages/Photos'
import Products from './pages/Products'
import Product from './pages/Product'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Cart from './pages/Cart'
import Memberships from './pages/Memberships'
import Contact from './pages/Contact'
import Photo from './pages/Photo'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import ModelPage from './pages/ModelPage'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SuspiciousPage from './pages/SuspiciousPage'


const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      <Navbar/>
      <SearchBar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/models' element={<Model/>} />
        <Route path='/events' element={<Events/>} />
        <Route path='/photos' element={<Photos/>} />
        <Route path='/products' element={<Products/>} />
        <Route path='/product/:productId' element={<Product/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/place-order' element={<PlaceOrder/>} />
        <Route path='/orders' element={<Orders/>} />
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/memberships' element={<Memberships/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/photos/:photoId' element={<Photo/>} />
        <Route path='/models/:modelId' element={<ModelPage/>} />
        <Route path='/suspicious-page' element={<SuspiciousPage/>} />
        <Route path='/product/suspicious/:productId' element={<Product/>} />
        <Route path='*' element={<h1>Not Found</h1>} />

      </Routes>
      <Footer/>
      </div>
  )
}

export default App