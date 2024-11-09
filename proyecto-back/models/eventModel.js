import mongoose from "mongoose";
import modelModel from "./modelModel.js";
import productModel from "./productModel.js";
import validator from "validator";

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: Array, required: true },
    date: { type: Number, required: true },
    location: { type: String, required: true },
    participating_models: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'model' }],
        validate: {
            validator: function (value) {
                return value.length > 0;
            },
            message: "El evento debe tener al menos un modelo"
        },
        default: []
    },
    products_showcased: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'product' }],
        validate: {
            validator: function (value) {
                return value.length > 0;
            },
            message: "El evento debe tener al menos un producto"
        },
        default: []
    }
}, { minimize: false });

const eventModel = mongoose.models.event || mongoose.model('event', eventSchema);

export default eventModel;
