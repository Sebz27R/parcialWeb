import React from 'react'
import { models } from '../assets/assets';
import { products } from '../assets/assets';

const EventItem = ({id, name, image,date, location, participating_models, products_showcased}) => {
   
    const getModelNames = () => {
        return participating_models.map(id => {
          // Buscar el modelo por _id
          const model = models.find(model => model._id === id);
          
          // Verificar si el modelo existe antes de acceder a sus propiedades
          return model ? model.name : "Model not found";
        });
      };
    
      const modelNames = getModelNames();

      const getProductNames = () => {
        return products_showcased.map(id => {
          // Buscar el modelo por _id
          const product = products.find(product => product._id === id);
          
          // Verificar si el modelo existe antes de acceder a sus propiedades
          return product ? product.name : "Model not found";
        });
      };
    
      const productNames = getProductNames();


  return (
    

    <div className='text-gray-700'>
        <div className=' overflow-hidden'>
            <img className='hover:scale-110 transition ease-in-out w-48 h-48 object-cover overflow-hidden' src={image} alt=""/>
        </div>
        <p className='pt-3 pb-1 text-sm'>{name}</p>
        <p className='pt-3 pb-1 text-sm'>Location: {location}</p>
        <p className='text-sm font-medium'>Date: {date}</p>
        <p className='pt-3 pb-1 text-sm'>Location: {location}</p>
        <p className='text-sm font-medium'>Participating models: {modelNames.map((name, index) => (
          <li key={index} className='text-lg'>{name}</li>
        ))}</p>
        <p className='text-sm font-medium'>Products showcased:  {productNames.map((name, index) => (
          <li key={index} className='text-lg'>{name}</li>
        ))}</p>
    </div>
  )
}

export default EventItem