import mongoose from "mongoose";

const DishScheme = mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        type:{
            type:String,
            required:true
        },
        imageLink: {
            type:String,
            required:true, // Optional: Set to false if the image is not mandatory
        },
    }
)

export const Dish= mongoose.model("Dish",DishScheme);