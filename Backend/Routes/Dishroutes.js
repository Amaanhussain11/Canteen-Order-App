import express from "express"
import { Dish } from "../Models/DishModel.js"

const router = express.Router();
 

router.post('/', async (req, res) => {
    try {
        if (!req.body.name || !req.body.price || !req.body.type) {
            return res.status(400).json({ error: "Please Fill all the required fields" });
        }
        else {
            const dish = await Dish.create(req.body)
        }

        return res.status(200).send("Dish Added Sucessfully")

    } catch {

    }
})

router.get('/', async (req, res) => {
    const dish = await Dish.find();
    if (dish) {
        return res.send({ dish });
    }
    else {
        return res.status(400).json({ error: "Sorry No dishes Avaialable" })
    }
})

router.get('/search', async (req, res) => {
    const { name } = req.query;
    try {
        const outputname = await Dish.find({
            name: { $regex: name, $options: 'i' }
        });

        return res.json(outputname);

    }


    catch {
        (err) => {
            console.log(err)
        }
    }



})



router.delete('/:id', async (req, res) => {
    try { 
        const {id} = req.params;
        const dish  = await Dish.findByIdAndDelete(id);
        if(!dish){
            return res.status(400).send({message:"Dish Not Found"})
        } 
        return res.status(200).send({message:"Dish Deleted Successfully"})
    }
    catch{(err)=>{
        console.log(err)
        return res.status(400).send("Dish Not Deleted")
    }}
})


export default router;