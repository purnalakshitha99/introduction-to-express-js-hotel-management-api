import Category from "../model/category.js";


export function createCategory(req, res) {

    const user = req.body.user;

    if (user == null) {
        return res.status(403).json({
            message: "Please login to create a category item"
        });
    }

    if (user.type != "admin") {
        return res.status(403).json(
            {
                message: "cant access for create category"
            }
        )
    }

    const category = req.body.category;
    console.log(category)

    const newCategory = new Category(category);

    newCategory.save().then(
        () => {
            console.log("category creation success")
            return res.json(
                {
                    message: "Category creation Succuess"
                }
            );
        }
    ).catch(
        (err) => {
            console.log("category creatio failed")
            return res.status(500).json({
                message: "Category creation failed",
                err: err.message
            });
        }
    )

}

export function getCategory(req,res){

    Category.find().then(
        (categoryList)=>{
            return res.json({
                message: "categories found",
                category : categoryList
            })
        }
    ).catch(
        (err)=>{
            return res.status(404).json({
                message : "categories not found",
                details : err.message
            })
        }
    )
}