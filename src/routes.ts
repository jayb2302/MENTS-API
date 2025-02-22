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

router.post("/products", createProduct);
router.get("/products", getAllProduct);
router.get("/products/:id", getProductById);
router.put("/products/:id", updateProductById);
router.delete("/products/:id", deleteProductById);

export default router;
