import bodyParser from 'body-parser'
import express from 'express'



const app = express() 

app.use(bodyParser.json())

app.get("/",
    (req,res)=>{
        console.log("get request")


        res.json({
            message : "hi"
        })

    }
)

app.post("/",(req,res)=>{
    console.log("This is a post request");


    const name = req.body.name;
    console.log(name)

    res.json({
        name : {name}
    })
})


app.listen(5000,(req,res)=>{
    console.log("Server is Running on port 5000")
});


