import bodyParser from 'body-parser'
import express from 'express'



const app = express() 

app.use(bodyParser.json())  //middleware

app.get("/",
    (req,res)=>{
        console.log("get request")


        res.json({
            message : "this is response message"
        })

    }
)

app.post("/",(req,res)=>{
    console.log("This is a post request");


    const name = req.body.name;

    const message = "this is new : "+name
    console.log(message)

    res.status(200).json({
        message : message
    })
})


app.listen(5000,(req,res)=>{
    console.log("Server is Running on port 5000")
});


