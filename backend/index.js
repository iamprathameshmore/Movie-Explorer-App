import 'dotenv/config'
import express from "express"
import DBConnection from "./database.js";
import userRoute from './routes/userRoute.js';
import cors from 'cors'

const app = express();
const PORT = process.env.PORT || 4213 

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

DBConnection("mongodb://localhost:27017")
app.listen(PORT, console.log(`hello From ${PORT}`))


app.use('/auth',userRoute)