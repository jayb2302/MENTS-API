import { Router, Request, Response } from "express";
import { createProduct, deleteProductById, getAllProducts, getProductById, updateProductById, getProductsByQuery } from "./controllers/productController";
import { loginUser, registerUser, verifyToken } from "./controllers/authController";

const router: Router = Router();

// Get, Post, Put, Delete (CRUD)

/**
 *
 */
router.get("/", (req: Request, res: Response) => {
    res.status(200).send("Welcome to the MENTS API");
});

// auth
router.post('/user/register', registerUser);
router.post('/user/login', loginUser);

// Create a new product
router.post("/products", verifyToken, createProduct);

// Get all products
router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);
router.get("/products/query/:key/:val", getProductsByQuery);

// Update and Delete a product
router.put("/products/:id", verifyToken, updateProductById);
router.delete("/products/:id", verifyToken,  deleteProductById);

export default router;
