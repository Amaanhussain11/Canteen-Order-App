import express from "express";
import mongoose from "mongoose";
import { PORT ,dburl } from "./config.js";
import Dishroutes from "./Routes/Dishroutes.js"
import cors from "cors"

const app = express();
app.use(express.json());
app.use(cors());



mongoose.connect(dburl).then(()=>{
    console.log("Connected to the database");
    app.listen(PORT,()=>{
        console.log(`Server is working on http://localhost:${PORT}`)
    })

}).catch((err)=>{
    console.log(err)
})

app.get('/',(req,res)=>{
    console.log(req)
    return res.status(200).send("Everything working well")

})

app.use("/Dishes",Dishroutes);