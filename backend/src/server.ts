import { sample_foods, sample_tags, sample_users } from './data';
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";


const app = express();

app.use(express.json())

const PORT = 5000;

// app.use(cors({
//     credentials: true,
//     origin: ["http:/localhost:4200"]
// }));
app.use(cors())

app.get("/api/foods", (req, res, next) => {
    res.send(sample_foods)
})

app.get("/api/foods/search/:searchTerm", (req, res) => {
    const searchTerm = req.params.searchTerm;
    const foods = sample_foods.filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()))
    res.send(foods)
})

app.get("/api/tags", (req, res, next) => {
    res.send(sample_tags)
})

app.get("/api/foods/tag/:tagName", (req, res) => {
    const tagName = req.params.tagName;
    const foods = tagName === "All" ? sample_foods : sample_foods.filter(food => food.tags?.includes(tagName));
    res.send(foods)
})

app.get("/api/foods/:foodId", (req, res) => {
    const foodId = req.params.foodId;
    const food = sample_foods.find(food => food.id === foodId)
    res.send(food)
})

app.post("/api/users/login", (req, res) => {
    const { email, password } = req.body;
    const user = sample_users.find(user => user.email === email && user.password === password)
    if (user) 
        return res.status(200).send(generateResponseToken(user));
    else 
        return res.status(400).send("User name or password is  not valid");
})

const generateResponseToken = (user: any) => {
    const token = jwt.sign({
        email: user.email,
        isAdmin: user.isAdmin
    }, "SomeRandomText", {
        expiresIn: "30d"
    })

    user.token = token; 
}

app.listen(PORT, () => {
    console.log("Website served on port " + PORT)
})
