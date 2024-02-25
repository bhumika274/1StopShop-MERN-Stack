import productModel from "../models/productModel.js"
import categoryModel from "../models/categoryModel.js"
import fs from "fs";
import slugify from "slugify";



export const createProductController = async(req, res) => {
    try {
        const {name,
        slug,
        description,
        price,
        category,
        quantity,
        shipping} = req.fields //this is as we are using formidable else it would be req.body

        const {photo} = req.files //if formidabel is used, this how files are read

        switch(true){
            case !name:
                return res.status(505).send ({error: "name is required" })
            case !description:
                return res.status(505).send ({error: "description is required" })
            case !category:
                return res.status(505).send ({error: "category is required" })
            case photo && photo.size > 1000000:
                return res.status(505).send ({error: "photo is required And should be less than 1 MB" })
            case !quantity :
                return res.status(505).send ({error: "quantity is required" })
        }

        const products = new productModel({...req.fields, slug:slugify(name)});
        if(photo){
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.ContentType = photo.type
        }else{

            res.status(500).send({
            success:false,
            message:"Photo a not found",
            })
        
        }

        await products.save()
        res.status(201).send({
            success:true,
            message:"created product",
            products

        })
        
    } catch (error) {

        console.log(error)
        res.status(500).send({
            success:false,
            error: error.message,
            message:"error while creating product",
        })
    }

}

export const getProductController = async(req, res) => {
    try {

        const products = await productModel.find({}).select("-photo").populate("category").limit(12).sort({createdAt:-1}) // removing photo to reduce loading time initially, Will create separate UPI four photos.
        
        res.status(200).send({
            success:true,
            message:"All products Recieved",
            countTotal: products.length,
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error :error.message,
            message:"error while getting product",
        })
    }
}

export const getSingleProductController = async(req, res) => {
    try {

        const products = await productModel.findOne({slug:req.params.slug}).select("-photo").populate("category").limit(12).sort({createdAt:-1}) // removing photo to reduce loading time initially, Will create separate UPI four photos.
        
        res.status(200).send({
            success:true,
            message:"All products",
            countTotal: products.length,
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error ,
            message:"error while getting single product",
        })
    }
}

export const getPhotoController = async(req, res) => {
    try {

        const product = await productModel.findById(req.params.pid).select("photo")
        if(product.photo.data){
            res.set("Content-type", product.photo.ContentType)

            return  res.status(200).send(product.photo.data)

        }else{
            return res.status(501).send({
                success:false,
                message:"Photo not found",
            })
        }
        
       
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error ,
            message:"error while getting product photo",
        })
    }
}

export const getDeleteProductController = async(req, res) => {
    try {

        await productModel.findByIdAndDelete(req.params.pid).select("-photo")

        res.status(200).send({
            success:true,
            message:"successfully deleted product",
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error ,
            message:"error while deleting product",
        })
    }
}

export const getUpdateProductController = async(req, res) => {
    try {

        const {name,
            description,
            price,
            category,
            quantity,
            shipping} = req.fields //this is as we are using formidable else it would be req.body
    
            const {photo} = req.files //if formidabel is used, this how files are read
    
            switch(true){
                case !name:
                    return res.status(505).send ({error: "name is required" })
                case !description:
                    return res.status(505).send ({error: "description is required" })
                case !category:
                    return res.status(505).send ({error: "category is required" })
                case photo && photo.size > 1000000:
                    return res.status(505).send ({error: "photo is required And should be less than 1 MB" })
                case !quantity :
                    return res.status(505).send ({error: "quantity is required" })
            }

            const product = await productModel.findByIdAndUpdate(req.params.pid,
            {...req.fields, slug:slugify(name)},{new:true})

            if(photo){
                product.photo.data = fs.readFileSync(photo.path)
                product.photo.ContentType = photo.type
            }

            await product.save()
            res.status(201).send({
            success:true,
            message:"created product",
            product

        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error ,
            message:"error while updating product",
        })
    }
}

export const getProductFilterController = async(req, res) => {
    try {
        const {checked, radio} = req.body
        let args= {}
        if(checked.length > 0) args.category = checked
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] }
        const products = await productModel.find(args)
        res.status(200).send({
            success:true,
            products
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            error ,
            message:"error while filtering product",
        })
    }
}

export const getProductCountController = async(req, res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount()
        res.status(200).send({
            success:true,
            total
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            error ,
            message:"error while counting product",
        })
    }
}

export const getProductListController = async(req, res) => {
    try {
        const perPage = 6;
        const page = req.params.page? req.params.page : 1
        const products = await productModel.find({})
        .select("-photo")
        .skip((page-1) * perPage)
        .limit(perPage)
        .sort({createdAt : -1})
        res.status(200).send({
            success:true,
            products
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            error ,
            message:"error while counting product",
        })
    }
}

export const getSearchProductController = async(req, res) => {
    try {
        const {keyword} = req.params
        const results = await productModel.find({
            $or:[
                {name:{$regex: keyword, $options:"i"}}, // Second option made it case insensitive.
                {description:{$regex: keyword, $options:"i"}},
            ]
        }).select("-photo")
        res.json(results)
        
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            error,
            message:"error in search",
        })
    }
}

export const getRelatedProductController = async (req, res) => {
    try {
        const { pid, cid } = req.params;
        const products = await productModel
          .find({
            category: cid,
            _id: { $ne: pid },
          })
          .select("-photo")
          .limit(3)
          .populate("category");
        res.status(200).send({
          success: true,
          products,
        });
      } catch (error) {
        console.log(error);
        res.status(400).send({
          success: false,
          message: "error while geting related product",
          error,
        });
      }
};

export const getProductCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({slug:req.params.slug})
        const products = await productModel.find({category}).populate("category")

        res.status(200).send({
            success: true,
            products,
            category
          });
      } catch (error) {
        console.log(error);
        res.status(400).send({
          success: false,
          message: "error while geting product",
          error,
        });
      }
};

