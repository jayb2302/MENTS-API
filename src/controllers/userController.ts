import { Request, Response } from 'express';
import { userModel } from '../models/User';
import { connect, disconnect } from '../repository/database';

export async function getUserById(req: Request, res: Response) {
  try {
    await connect();

    const id = req.params.id;
    const result = await userModel.findById(id);

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send('Error retrieving user by id. ' + error);
  } finally {
    await disconnect();
  }
}