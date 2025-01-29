import { Router, Request, Response } from "express";

const router: Router = Router();

// Get, Post, Put, Delete (CRUD)

/**
 *
 */
router.get("/", (req: Request, res: Response) => {
    res.status(200).send("Welcome to the MENTS API");
});

export default router;
