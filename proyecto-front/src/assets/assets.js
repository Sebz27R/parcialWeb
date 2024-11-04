import purple_lipstick from "./purple_lipstick.jpg"
import foundation from "./foundation.jpg"
import pple_lip_2 from "./purple_lipstick_2.jpg"
import pple_lip_3 from "./purple_lipstick_3.jpg"
import red_lipstick from "./red_lipstick_1.jpg"
import red_lipstick2 from "./red_lipstick2.jpg"
import eye_shadow from "./eye_shadow.jpg"
import eye_shadow2 from "./eye_shadow2.jpg"
import dark_high from "./dark_highlighter.jpg"
import dark_high2 from "./dark_highlighter2.jpg"
import red_nail from "./red_nail.jpg"
import red_nail2 from "./red_nail2.jpg"


import model_1 from "./model_1.jpg"
import model_2 from "./model_2.jpg"
import model_3 from "./model_3.jpg"
import model_4 from "./model_4.jpg"
import model_5 from "./model_5.jpg"

import photo_1 from "./photo_1.jpg"
import photo_2 from "./photo_2.jpg"
import photo_3 from "./photo_3.jpg"
import photo_4 from "./photo_4.jpg"
import photo_5 from "./photo_5.jpg"


import event_1 from "./event_1.jpg"
import beach from "./beach.jpg"
import banana from "./banana.jpg"
import winter from "./winter.jpg"


import basic_plan from "./basic_plan.png"
import medium_plan from "./medium_plan.png"
import premium_plan from "./premium_plan.jpg"


import bbc from "./bbc.jpg";
import green from "./green.jpg";
import chalk from "./chalk.png";
import giga from "./giga.png";
import { redirect } from "react-router-dom"

export const models = [
    {
        _id: "1271",
        name: "Sofia Cardona",
        portfolio: [model_1],
        booking_info: "Available" ,
        achievements:  ["First place in Miss antioquia"]
    },
    {
        _id: "1293",
        name: "Barbara Moncada",
        portfolio: [model_2],
        booking_info: "Not Available" ,
        achievements:  ["Miss Universe 2020 winner"]
    },
    {
        _id: "1201",
        name: "GEY",
        portfolio: [model_3],
        booking_info: "Available" ,
        achievements:  ["Most wieners in the mouth contest winner"]
    },
    {
        _id: "1266",
        name: "Nicole Barrios",
        portfolio: [model_4],
        booking_info: "Available" ,
        achievements:  ["N/A"]
    },
    {
        _id: "1211",
        name: "Maryori",
        portfolio: [model_5],
        booking_info: "Not Available" ,
        achievements:  ["Miss Universe three times champion (1988, 1989, 2002)"]
    }
    
]

export const memberships = [
    {
        _id: "0001",
        name: "Basic Membership",
        price: 100,
        image: basic_plan,
        duration: "1 Month subscription"
    },
    {
        _id: "0002",
        name: "Medium Membership",
        price: 250,
        image: medium_plan,
        duration: "3 Month subscription"
    },
    {
        _id: "0003",
        name: "Premium Membership",
        price: 500,
        image: premium_plan,
        duration: "6 Month subscription"
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

    },
    {
        _id: "1378a",
        name: "Bananas event",
        image: banana,
        date: "2024-08-11",
        location: "Atanasio girardot stadium, Medellin",
        participating_models: ["1271","1293","1201"],
        products_showcased: ["aaaa", "caaa","eaaa"]

    },
    {
        _id: "1319a",
        name: "Beach event",
        image: beach,
        date: "2024-07-21",
        location: "Miami beach, Miami",
        participating_models: ["1211"],
        products_showcased: ["aaab", "caaa","daaa"]

    },
    {
        _id: "1390a",
        name: "Winter Extreme event",
        image: winter,
        date: "2024-11-19",
        location: "Mount Everest, Nepal",
        participating_models: ["1271","1266"],
        products_showcased: ["baaa", "daaa"]

    },
    

]

export const photos = [
    {
        _id: "1892",
        title: "Highlight of the winner!",
        image: photo_1,
        price: 90,
        category: "Event",
        format: ["Digital dowload", "Physical print"]
    },
    {
        _id: "1817",
        title: "HomoLooser",
        image: photo_2,
        price: 200,
        category: "Model",
        format: ["Digital dowload", "Physical print"]
    },
    {
        _id: "1877",
        title: "Starting the party!",
        image: photo_3,
        price: 35,
        category: "Event",
        format: ["Digital dowload", "Physical print"]
    },
    {
        _id: "1890",
        title: "The incident...",
        image: photo_4,
        price: 150,
        category: "Event",
        format: ["Digital dowload", "Physical print"]
    },
    {
        _id: "1838",
        title: "Memorable winner",
        image: photo_5,
        price: 300,
        category: "Model",
        format: ["Digital dowload", "Physical print"]
    },

]

export const susProducts = [
    {
        _id: "1111",
        name: "Weed",
        description: "A one 20 gram bag of premium quiality California grown zaza",
        price: 40,
        image: [green, bbc, bbc],
        category: "Smokable",
        featured: true
    },
    {
        _id: "1112",
        name: "Cocaine",
        description: "1 gram bag of Colombian luxury made cocaine",
        price: 170,
        image: [chalk, bbc, bbc],
        category: "Snorted",
        featured: true
    },
    {
        _id: "1113",
        name: "Fentanyl",
        description: "1 gram bag of Fentanyl",
        price: 200,
        image: [giga, bbc, bbc],
        category: "Injections",
        featured: true
    },
    {
        _id: "1114",
        name: "Meth",
        description: "1 gram bag of Meth",
        price: 50,
        image: [giga, bbc, bbc],
        category: "Snorted",
        featured: false
    },
    {
        _id: "1115",
        name: "LSD",
        description: "1 gram bag of LSD",
        price: 100,
        image: [giga, bbc, bbc],
        category: "Skin Absorbable",
        featured: false
    },
    {
        _id: "1116",
        name: "Heroin",
        description: "1 gram bag of Heroin",
        price: 150,
        image: [giga, bbc, bbc],
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
        description: "A common red Lipstick from SARA",
        price: 75,
        image: [red_lipstick,red_lipstick2],
        category: "Lipsticks",
        color: "Red",
        date: 147492371832,
        featured: true
    },
    {
        _id: "caaa",
        name: "Black eye shadow",
        description: "Long time duration eye shadow (Special edition from HH)",
        price: 128,
        image: [eye_shadow,eye_shadow2],
        category: "Eye shadows",
        color: "Black",
        date: 147492371832,
        featured: true
    },
    {
        _id: "daaa",
        name: "Dark highlighter",
        description: "Dark highlighter special for the watermelon ethusiasts",
        price: 10,
        image: [dark_high,dark_high2],
        category: "Highlighters",
        color: "Dark",
        date: 147492371832,
        featured: false
    },
    {
        _id: "eaaa",
        name: "Red nail polish",
        description: "Time-limited red nail polish from the 2024 summer event",
        price: 45,
        image: [red_nail,red_nail2],
        category: "Nail polishes",
        color: "Red",
        date: 147492371832,
        featured: true
    }

]
