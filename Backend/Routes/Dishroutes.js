import express from "express";
import { Dish } from "../Models/DishModel.js";

const router = express.Router();

router.get("/search", async (req, res) => {
  const { name } = req.query;
  try {
    const outputname = await Dish.find({
      name: { $regex: name, $options: "i" },
    });

    return res.json(outputname);
  } catch {
    (err) => {
      console.log(err);
    };
  }
});

router.get("/category", async (req, res) => {
  const dish = await Dish.find();
  if (dish) {
    return res.json(dish);
  } else {
    return res.status(400).json({ error: "Sorry No dishes Avaialable" });
  }
});

router.get("/category/:type", async (req, res) => {
  // return res.send({message:"working"})
  const { type } = req.params;

  try {
    const dishes = await Dish.find({ type });
    res.status(200).json(dishes);
  } catch (err) {
    res.status(500).json({ err: `Failed to find the dishes of type: ${type}` });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dish = await Dish.findById(id);
    if (!dish) {
      return res.status(400).send({ message: "Dish Not Found" });
    }
    return res.status(200).json(dish);
  } catch {
    (err) => {
      console.log(err);
      return res.status(400).send("Dish Not found");
    };
  }
});

router.post("/", async (req, res) => {
  try {
    if (!req.body.name || !req.body.price || !req.body.type) {
      return res
        .status(400)
        .json({ error: "Please Fill all the required fields" });
    } else {
      const dish = await Dish.create(req.body);
    }

    return res.status(200).send("Dish Added Sucessfully");
  } catch {}
});



router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dish = await Dish.findByIdAndDelete(id);
    if (!dish) {
      return res.status(400).send({ message: "Dish Not Found" });
    }
    return res.status(200).send({ message: "Dish Deleted Successfully" });
  } catch {
    (err) => {
      console.log(err);
      return res.status(400).send("Dish Not Deleted");
    };
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dish = await Dish.findByIdAndUpdate(id, req.body, { new: true });
    if (!dish) {
      return res.status(400).send({ message: "Dish Not Found" });
    }
    return res.status(200).send({ dish });
  } catch {
    (err) => {
      console.log(err);
    };
  }
});

export default router;
