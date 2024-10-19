import express from 'express'

const app = express() 

app.get("/",
    (req,res)=>{
        console.log("Hello world")
    }
)


app.listen(5000,(req,res)=>{
    console.log("Server is Running on port 5000")
});


