import { v2 as cloudinary } from 'cloudinary';
import eventModel from "../models/eventModel.js";
import modelModel from "../models/modelModel.js";  // Modelo de los modelos
import productModel from "../models/productModel.js"; // Modelo de los productos

const addEvent = async (req, res) => {
    try {
        const { name, location, date, participating_models, products_showcased } = req.body;

        // Parsear los IDs de modelos y productos (deben estar en formato JSON)
        const modelIds = JSON.parse(participating_models || '[]');
        const productIds = JSON.parse(products_showcased || '[]');

        // Validación de existencia en la base de datos
        const foundModels = await modelModel.find({ _id: { $in: modelIds } });
        const foundProducts = await productModel.find({ _id: { $in: productIds } });

        // Identificar modelos o productos faltantes
        const missingModels = modelIds.filter(id => !foundModels.some(model => model._id.toString() === id));
        const missingProducts = productIds.filter(id => !foundProducts.some(product => product._id.toString() === id));

        if (missingModels.length > 0 || missingProducts.length > 0) {
            return res.status(400).json({
                success: false,
                message: "No se pudo crear el evento",
                errors: {
                    missingModels: missingModels.length > 0 ? `Modelos faltantes: ${missingModels.join(", ")}` : null,
                    missingProducts: missingProducts.length > 0 ? `Productos faltantes: ${missingProducts.join(", ")}` : null,
                }
            });
        }

        // Procesar las imágenes
        const image1 = req.files.image1 && req.files.image1[0];
        const images = [image1].filter((item) => item !== undefined);

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url;
            })
        );

        // Preparar los datos del evento
        const eventData = {
            name,
            location,
            date: Number(date),
            image: imagesUrl,
            participating_models: modelIds,
            products_showcased: productIds
        };

        // Crear y guardar el evento
        const event = new eventModel(eventData);
        await event.save();

        res.json({ success: true, message: "Evento agregado" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


//Function for listining events

const listEvents = async (req,res) => {
    try {

        const events = await eventModel.find({})
        res.json({success:true,events})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//Remove event
const removeEvent = async (req,res) => {
    try {
        await eventModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Event removed"})

    } catch (error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
}


const singleEvent = async (req,res) => {
    try {

        const {eventId} = req.body
        const event = await eventModel.findById(eventId)
        res.json({success:true,event})

    } catch(error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

export {addEvent, listEvents, removeEvent, singleEvent}