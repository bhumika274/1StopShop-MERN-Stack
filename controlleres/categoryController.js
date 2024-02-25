import categoryModel from "../models/categoryModel.js"
import slugify from "slugify"

export const createCategoryController = async(req, res) =>{
    try {
        const {name} = req.body
        if(!name){
            return res.status(401).send({message:"Name is required"})
        }

        const existingCategory = await categoryModel.findOne({name});
        if(existingCategory){
            return res.status(200).send({
                success:true,
                message:"Category Already Exist"
            })
        }

        const category = await new categoryModel({name, slug:slugify(name)}).save()
        res.status(201).send({
            success:true,
            message:"new Category Created",
            category
        })
    } catch (error) {
       console.log(error)
       res.status(500).send({
        success:false,
        error,
        message:"error in category"
       }) 
    }  

}

export const upadateCategoryController = async(req, res) =>{
    try {
        const {name} = req.body
        const {id} = req.params
        const category = await categoryModel.findByIdAndUpdate(id, {name, slug:slugify(name)}, {new:true})
        res.status(200).send({
            success:true,
            message:"Category Updated Successfully",
            category
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"error in Category Controller"
        })
    }
}

export const getCategoryController = async(req, res) =>{
    try {

        const category  = await categoryModel.find({})
        res.status(200).send({
            success:true,
            message:"All Category List",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"error while getting all categories"
        })
    }
}


export const singleCategoryController = async(req, res) =>{
    try {
        
        const category  = await categoryModel.findOne({slug:req.params.slug})
        res.status(200).send({
            success:true,
            message:"Got single category successfully",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"error while getting single category"
        })
    }
}

export const deleteCategoryController = async(req, res) =>{
    try {
        const id = req.params.id;
        await categoryModel.findByIdAndDelete(id)
        return res.status(200).send({
            success:true,
            message:"Category deleted successfully",
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"error while deleting category"
        })
    }
}
