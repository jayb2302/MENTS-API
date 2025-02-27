import { Router, Request, Response } from "express";
import {
  createProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  updateProductById,
  getProductsByQuery,
} from "./controllers/productController";
import {
  loginUser,
  registerUser,
  verifyToken,
} from "./controllers/authController";

const router: Router = Router();

// Get, Post, Put, Delete (CRUD)

/**
 * @swagger
 * /api:
 *   get:
 *     summary: Welcome message
 *     description: Returns a welcome message for the API.
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get("/", (req: Request, res: Response) => {
  res.status(200).send("Welcome to the MENTS API");
});

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Validation error or email already exists
 *       500:
 *         description: Server error
 */
router.post("/user/register", registerUser);
/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.post("/user/login", loginUser);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               imageURL:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *               isOnDiscount:
 *                 type: boolean
 *               discountPct:
 *                 type: number
 *               isHidden:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Product created successfully
 *       500:
 *         description: Server error while creating product
 */
router.post("/products", verifyToken, createProduct);

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Successfully retrieved all products
 *       500:
 *         description: Server error while retrieving products
 */
router.get("/products", getAllProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved the product
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error while retrieving the product
 */
router.get("/products/:id", getProductById);

/**
 * @swagger
 * /api/products/query/{key}/{val}:
 *   get:
 *     summary: Get products by query
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *         description: The field to filter products by (e.g., "name", "category")
 *       - in: path
 *         name: val
 *         required: true
 *         schema:
 *           type: string
 *         description: The value to search for (case insensitive)
 *     responses:
 *       200:
 *         description: Successfully retrieved matching products
 *       500:
 *         description: Server error while searching for products
 */
router.get("/products/query/:key/:val", getProductsByQuery);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               imageURL:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *               isOnDiscount:
 *                 type: boolean
 *               discountPct:
 *                 type: number
 *               isHidden:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error while updating the product
 */
router.put("/products/:id", verifyToken, updateProductById);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to delete
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error while deleting the product
 */
router.delete("/products/:id", verifyToken, deleteProductById);

export default router;
