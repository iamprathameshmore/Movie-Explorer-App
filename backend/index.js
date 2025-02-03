import 'dotenv/config'
import express from "express"
import DBConnection from "./database.js";

const app = express();
const PORT = process.env.PORT || 4213 


DBConnection(process.env.DATABASE_URL)
app.listen(PORT, console.log(`hello From ${PORT}`))
