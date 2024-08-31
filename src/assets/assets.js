import purple_lipstick from "./purple_lipstick.jpg"
import foundation from "./foundation.jpg"
import pple_lip_2 from "./purple_lipstick_2.jpg"
import pple_lip_3 from "./purple_lipstick_3.jpg"
import model_1 from "./model_1.jpg"
import photo_1 from "./photo_1.jpg"
import event_1 from "./event_1.jpg"

export const models = [
    {
        _id: "1271",
        name: "Sofia Cardona",
        portfolio: [model_1],
        booking_info: "Available" ,
        achievements:  ["First place in Miss antioquia"]
    },
    
]

export const events = [
    {
        _id: "1333a",
        name: "Midgets fashion summer event",
        image: event_1,
        date: "2024-09-24",
        location: "Allianz arena Stadium, Munich",
        participating_models: ["1271"],
        products_showcased: ["aaaa", "baaa"]

    }

]

export const photos = [
    {
        _id: "1892",
        title: "Highlight of the winner!",
        image: photo_1,
        price: 90,
        category: "Event",
        format: ["Digital dowload", "Physical print"]
    }
]

export const susProducts = [
    {
        _id: "1111",
        name: "Weed",
        description: "A one 20 gram bag of premium quiality California grown zaza",
        price: 40,
        // TODO: add the photos
        image: [purple_lipstick,pple_lip_2,pple_lip_3],
        category: "Smokable",
        featured: true
    },
    {
        _id: "1112",
        name: "Cocaine",
        description: "1 gram bag of Colombian luxury made cocaine",
        price: 170,
        // TODO: add the photos
        image: [purple_lipstick,pple_lip_2,pple_lip_3],
        category: "Snorted",
        featured: true
    },
    {
        _id: "1113",
        name: "Fentanyl",
        description: "1 gram bag of Fentanyl",
        price: 200,
        // TODO: add the photos
        image: [purple_lipstick,pple_lip_2,pple_lip_3],
        category: "Injections",
        featured: true
    },
    {
        _id: "1114",
        name: "Meth",
        description: "1 gram bag of Meth",
        price: 50,
        // TODO: add the photos
        image: [purple_lipstick,pple_lip_2,pple_lip_3],
        category: "Snorted",
        featured: false
    },
    {
        _id: "1115",
        name: "LSD",
        description: "1 gram bag of LSD",
        price: 100,
        // TODO: add the photos
        image: [purple_lipstick,pple_lip_2,pple_lip_3],
        category: "Skin Absorbable",
        featured: false
    },
    {
        _id: "1116",
        name: "Heroin",
        description: "1 gram bag of Heroin",
        price: 150,
        // TODO: add the photos
        image: [purple_lipstick,pple_lip_2,pple_lip_3],
        category: "Injections",
        featured: false
    }
]

export const products = [
    {
        _id: "aaaa",
        name: "Purple lipstick",
        description: "A time-limited purple Lipstick from SARA",
        price: 200,
        image: [purple_lipstick,pple_lip_2,pple_lip_3],
        category: "Lipsticks",
        color: "Purple",
        date: 147492371832,
        featured: true
    } ,
    {
        _id: "baaa",
        name: "Foundation",
        description: "Light foundation from SARA",
        price: 100,
        image: [foundation],
        category: "Foundations",
        color: "Light",
        date: 147492371832,
        featured: false  
    },
    {
        _id: "aaab",
        name: "Red lipstick",
        description: "A time-limited purple Lipstick from SARA",
        price: 200,
        image: [purple_lipstick,pple_lip_2,pple_lip_3],
        category: "Lipsticks",
        color: "Red",
        date: 147492371832,
        featured: true
    }

]
