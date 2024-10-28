import Category from "../model/category.js";


export function createCategory(req, res) {

    const user = req.body.user;

    if (user == null) {
        return res.status(401).json({
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

    const category = req.body;
    console.log(category)

    const newCategory = new Category(category);

    newCategory.save().then(
        (category) => {
            console.log("category creation success")
            return res.json(
                {
                    message: "Category creation Succuess",
                    category : category
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

export function getCategory(req, res) {

    Category.find().then(
        (categoryList) => {
            return res.json({
                message: "categories found",
                category: categoryList
            })
        }
    ).catch(
        (err) => {
            return res.status(404).json({
                message: "categories not found",
                details: err.message
            })
        }
    )
}

export function findCategoryByName(req, res) {

    const categoryName = req.body.name;

    Category.findOne({ name: categoryName }).then(
        (category) => {
            return res.json({
                message: "Category found",
                category: category
            })
        }
    ).catch(
        (err) => {
            return res.status(404).json({
                message: "Category not found",
                err: err.message
            })
        }
    )
}

export function deleteCategory(req,res){

    const categoryName = req.body.name;

    const user = req.body.user;

    if (user == null) {
        return res.status(403).json({
            message: "Please login to delete a category item"
        });
    }

    if (user.type != "admin") {
        return res.status(403).json(
            {
                message: "cant access for create category"
            }
        )
    }

    Category.deleteOne({ name : categoryName}).then(
        ()=>{
            return res.json(
                {
                    message : "Delete category success"
                }
            )
        }
    ).catch(
        (err)=>{
            return res.status(404).json({
                message : "Delete category failed",
                details : err.message
            })
        }
    )

}