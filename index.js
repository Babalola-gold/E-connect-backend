const express = require("express")
const App = express()

const cors = require("cors")
const dotenv = require("dotenv")
const userRouter = require("./routes/user.route")
let PORT = process.env.PORT || 5000

dotenv.config()

const app = express()
app.use(cors())
const homeProducts = [
    {
        id: 1, name: 'Freezer', price: '50,000', image: '../src/assets/rectangle 1.png'
    },
    {
        id: 2, name: 'Cook Ware', price: '50,000', image: '../src/assets/Rectangle (2).png'
    },
    {
        id: 3, name: 'Micro Wave', price: '50,000', image: '../src/assets/Rectangle 1 (3).png'
    },
   
]

app.get("/products", (req, res) => {
    res.send(homeProducts);
});
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/', userRouter)



app.listen(PORT, () => {
    console.log(` Server running on PORT: ${PORT}`);
})

