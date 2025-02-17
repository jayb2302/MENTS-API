import { Request, Response } from 'express';
import { productModel } from '../models/Product';
import { connect, disconnect } from '../repository/database';

// CRUD - Create, Read, Update, Delete

export async function createProduct(req: Request, res: Response): Promise<void> {
    const data = req.body;

    try {
        await connect();
        
        const product = new productModel(data);
        const result = await product.save();

        res.status(201).send(result);
    }
    catch (error) {
        res.status(500).send("Error creating product: " + error);
    }
    finally {
        await disconnect();
    }
}

export async function getAllProduct(req: Request, res: Response) {
    try {
        await connect();
        
        const result = await productModel.find({});

        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send("Error retrieving products. " + error);
    }
    finally {
        await disconnect();
    }
}

export async function getProductById(req: Request, res: Response) {
    try {
        await connect();
        
        const id = req.params.id;
        const result = await productModel.find({_id: id});

        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send("Error retrieving products by id. " + error);
    }
    finally {
        await disconnect();
    }
}

export async function updateProductById(req: Request, res: Response) {
    const id = req.params.id;
    
    try {
        await connect();
        
        const result = await productModel.findByIdAndUpdate(id, req.body);

        if (!result) {
            res.status(404).send('Cannot Update product with id=' + id);
        }
        else {
            res.status(200).send('Product updated successfully');
        }
    }
    catch (error) {
        res.status(500).send("Error retrieving products by id. " + error);
    }
    finally {
        await disconnect();
    }
}

export async function deleteProductById(req: Request, res: Response) {
    const id = req.params.id;
    
    try {
        await connect();
        
        const result = await productModel.findByIdAndDelete(id);

        if (!result) {
            res.status(404).send('Cannot Delete product with id=' + id);
        }
        else {
            res.status(200).send('Product deleted successfully');
        }
    }
    catch (error) {
        res.status(500).send("Error retrieving products by id. " + error);
    }
    finally {
        await disconnect();
    }
}