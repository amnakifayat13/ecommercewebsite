const express = require("express")
const cors = require("cors")
const env = require("dotenv")
const mongoose = require("mongoose")

const userRoutes = require("./src/routes/user.route")
const categoryRoutes = require("./src/routes/category.route")
const productRoutes = require("./src/routes/product.route")
const reviewRoutes = require("./src/routes/reviews.route")
const cartRoutes = require("./src/routes/cart.route")
const orderRoutes = require("./src/routes/order.route")


const cloudinary = require("cloudinary")



const app = express()
env.config()

//  Database
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@ecommercestore.86qku.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`
)
.then(()=>{
    console.log("Database Connected")
})
.catch((error)=>{
    console.log(error)
})

cloudinary.config({
    cloud_name: `${process.env.CLOUD_NAME}`,
    api_key: `${process.env.API_KEY}`,
    api_secret: `${process.env.API_SECRET}`
})


app.use(cors())
app.use(express.json())

app.use("/healthCheck", (req, res)=>{
    res.send("Ok")
})

app.use('/api', userRoutes)
app.use('/api', categoryRoutes)
app.use('/api', productRoutes)
app.use('/api', reviewRoutes)
app.use('/api', cartRoutes)
app.use('/api', orderRoutes)

app.listen(process.env.PORT, ()=>{
    console.log(`your server is running on port ${process.env.PORT}`)
})