import Category from "../model/category.js";
import { isAdmin,isUserValid } from './roomController.js';


export function createCategory(req, res) {

    const validAdmin = isAdmin(req, res)

    if (!validAdmin) {
        return
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
            if(!category){
                return res.status(404).json({
                    message: "Category not found",
                    err: err.message
                })
            }
            return res.json({
                message: "Category found",
                category: category
            })
        }
    ).catch(
        (err) => {
            return res.status(500).json({
                message: "Category not found",
                err: err.message
            })
        }
    )
}

export function findCategory(req,res){

    const name = req.params.name;

    Category.findOne({ name: name }).then(
        (category) => {
            if(!category){
                return res.status(404).json({
                    message: "Category not found",
                    err: err.message
                })
            }
            return res.json({
                message: "Category found",
                category: category
            })
        }
    ).catch(
        (err) => {
            return res.status(500).json({
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

    Category.findOneAndDelete({ name : categoryName}).then(
        (category)=>{
            if(!category){
                return res.status(404).json({
                    message : "category not found , delete failed"
                })
            }
            return res.json({
                message : "category found , delete successfully"
            })
        }
    ).catch(
        (err)=>{
            return res.status(500).json({
                message : "delete category failed",
                details : err.message
            })
        }
    )

}

export function deleteCategoryByParam(req,res){

    const categoryName = req.params.name;

    console.log("category name : ",categoryName)

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

    Category.findOneAndDelete({ name : categoryName}).then(
        (category)=>{
            if(!category){
                return res.status(404).json({
                    message : "category not found , delete failed"
                })
            }
            return res.json({
                message : "category found , delete successfully"
            })
        }
    ).catch(
        (err)=>{
            return res.status(500).json({
                message : "delete category failed",
                details : err.message
            })
        }
    )

}


export function updateCategory(req,res){
    
    const name = req.params.name;
    const user = req.body.user;
    const updateData = req.body;


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
    
    Category.findOneAndUpdate({name : name},updateData,{new: true, runValidators : true}).then(
        (updateCategory)=>{
            if(!updateCategory){
                return res.status(404).json({
                    message : "category not found"
                })
            }
            return res.json({
                message : "category found",
                category : updateCategory
            })
        }
    ).catch(
        (err)=>{
            return res.status(500).json({
                message : "category update failed",
                details : err.message
            })
        }
    )
    
}