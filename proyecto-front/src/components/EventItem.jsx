import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';

const EventItem = ({id, name, image,date, location, participating_models, products_showcased}) => {

    const { models,products} = useContext(ShopContext)
   
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

      const formatDate = (dateNumber) => {
        const date = new Date(dateNumber)
        return date.toLocaleDateString('es-ES') // Formato dd/mm/aaaa
      }


  return (
    

    <div className='text-gray-700'>
        <div className=' overflow-hidden'>
            <img className='hover:scale-110 transition ease-in-out w-48 h-48 object-cover overflow-hidden' src={image} alt=""/>
        </div>
        <p className='pt-3 pb-1 text-lg font-bold'>{name}</p>
        <p className='pt-3 pb-1 text-sm'><span className='font-bold'>Location:</span> {location}</p>
        <p className='text-sm pb-1'><span className='font-bold'>Date:</span> {formatDate(date)}</p>
        <p className='text-sm pb-1'><span className='font-bold'>Models participating:</span> {modelNames.map((name, index) => (
          <li key={index} className='text-sm'>{name}</li>
        ))}</p>
        <p className='text-sm '><span className='font-bold'>Products showcased:</span> {productNames.map((name, index) => (
          <li key={index} className='text-sm'>{name}</li>
        ))}</p>
    </div>
  )
}

export default EventItem