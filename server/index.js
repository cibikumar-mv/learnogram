import express from "express"; 
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv'; 
import authRoutes from './routes/auth.js'; 
import postRoutes from './routes/posts.js'; 

const app = express();
dotenv.config();

app.use(express.json({limit:"30mb", extended:"true"}));
app.use(express.urlencoded({limit:"30mb", extended:"true"}));
app.use(cors()); 

console.log("index.js");
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.get("/",(req,res)=> res.send("Welcome to :)learN o Gram(:"));
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser : true, useUnifiedTopology: true})
    .then( () => app.listen(PORT,() => console.log(`Server running on port:${PORT}`)))
    .catch( (error) => console.log(error.message)); 