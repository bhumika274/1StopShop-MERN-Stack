import express from "express";
import { createProductController, getDeleteProductController, getPhotoController, getProductController, getProductCountController, getProductFilterController, getProductListController, getSearchProductController, getSingleProductController, getUpdateProductController, getRelatedProductController, getProductCategoryController } from "../controlleres/productController.js";
import { isAdmin, loginmdw } from "../middleware/authmiddleware.js";
import formidable from "express-formidable";  //so that db stores photo else it will only store data. by help of formData photo has to be converted into formData so that it can be saved.


const router = express.Router()
router.post("/create-product", loginmdw, isAdmin,formidable(), createProductController)
router.put("/update-product/:pid",loginmdw, isAdmin,formidable(), getUpdateProductController)
router.get("/get-product", getProductController)
router.get("/get-single-product/:slug", getSingleProductController)
router.get("/get-product-photo/:pid", getPhotoController)
router.delete("/delete-product/:pid", getDeleteProductController)
router.post("/product-filters", getProductFilterController)
router.get("/product-count", getProductCountController)
router.get("/product-list/:page", getProductListController)
router.get("/search/:keyword", getSearchProductController)
router.get("/related-product/:pid/:cid", getRelatedProductController)
router.get("/product-category/:slug", getProductCategoryController)

export default router