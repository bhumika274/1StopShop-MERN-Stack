import express from "express"
import dotenv from "dotenv"
import morgan from "morgan";
import authRoute from "./routes/authRoute.js"
import categoryRoutes from "./routes/CategoryRoutes.js"
import productRoutes from "./routes/ProductRoutes.js"
import connectDB from "./config/db.js";
import cors from "cors"
import path from "path"


//config dotenv
dotenv.config();

//rest object
const app = express()

//database config
connectDB();

//middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, "./client/build")))



// app.get('/*', function (req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
//   });

//routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);


// rest api
app.use('*', function(req, res){
    res.sendFile(path.join(__dirname, "./client/build/index.html"))
})

const PORT = process.env.PORT || 8000

app.listen(PORT, () =>{
    console.log(`Listening on ${PORT}`.bgCyan.white)
})
