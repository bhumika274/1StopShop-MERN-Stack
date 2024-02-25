import express from "express";
import {isAdmin, loginmdw} from "./../middleware/authmiddleware.js"
import {createCategoryController, deleteCategoryController, getCategoryController, singleCategoryController, upadateCategoryController}  from "../controlleres/categoryController.js";

const router = express.Router()

router.post("/create-category", loginmdw, isAdmin, createCategoryController)

router.put("/update-category/:id", loginmdw, isAdmin, upadateCategoryController)


router.get("/get-category", getCategoryController)

router.get("/single-category/:slug", singleCategoryController)


router.delete("/delete-category/:id",loginmdw, isAdmin, deleteCategoryController)

export default router