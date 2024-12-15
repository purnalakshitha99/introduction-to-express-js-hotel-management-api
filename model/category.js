import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true

        },
        price : {
            type : Number,
            required : true
        },

        //features array ekak lesa save kirima
        features : [{
            type : String,
        }],
        
        image : {
            type : String
        },
    }
)

const Category = mongoose.model("category",categorySchema)

export default Category;