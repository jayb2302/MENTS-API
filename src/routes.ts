import { Router, Request, Response } from "express";
import { createProduct, deleteProductById, getAllProduct, getProductById, updateProductById } from "./controllers/productController";

const router: Router = Router();

// Get, Post, Put, Delete (CRUD)

/**
 *
 */
router.get("/", (req: Request, res: Response) => {
    res.status(200).send("Welcome to the MENTS API");
});

router.post("/product", createProduct);
router.get("/product", getAllProduct);
router.get("/product/:id", getProductById);
router.put("/product/:id", updateProductById);
router.delete("/product/:id", deleteProductById);

export default router;
