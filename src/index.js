
import connectDB from "./db/index.js";

// require('dotenv').config({path: './env'})
import dotenv from "dotenv";

dotenv.config({
    path: './env'
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) =>{
    console.log("MONGODB connection failed !!!", err);
})








/*
import express from "express";
const app = express();

// function connectDb(){
     
// }

// // connectDB()

;(async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI} / ${DB_NAME}`)
        app.on("error",(error) => {
            console.log("ERRR:", error);
            throw error
        })

        app.listen(process.env.PORT , ()=>{
            console.log(`App is running on port ${process.env.PORT}`);
        } )
    } catch(error) {
        console.error("ERROR: ",error)
        throw err
    }
})()
*/