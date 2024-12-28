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
        }
    }
)

export const Dish= mongoose.model("Dish",DishScheme);