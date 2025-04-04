// imports
import { type Request, type Response, type NextFunction } from "express";

import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";
import Joi, { ValidationResult } from "joi";

// Project imports
import { userModel } from "../models/User";
import { IUser } from "../interfaces/IUser";
import { connect, disconnect } from "../repository/database";

/**
 * Register a new user
 * @param req
 * @param res
 * @returns
 */

export async function registerUser(req: Request, res: Response) {
  try {
    // validate the user and password info
    const { error } = validateUserRegistrationInfo(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    await connect();

    // check if the email is already registered
    const emailExist = await userModel.findOne({ email: req.body.email });
    if (emailExist) {
      res.status(400).json({ error: "Email already exists" });
      return;
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(req.body.password, salt);

    // create a user object and save in the DB
    const userObject = new userModel({
      name: req.body.name,
      email: req.body.email,
      password: passwordHashed,
    });

    const savedUser = await userObject.save();
    res.status(200).json({ error: null, data: savedUser._id });
  } catch (error) {
    res.status(500).send("Error registering user. Error:" + error);
  } finally {
    await disconnect();
  }
}

/**
 * Login a user
 * @param req
 * @param res
 * @returns
 */

export async function loginUser(req: Request, res: Response) {
  try {
    // Validate user login info
    const { error } = validateUserLoginInfo(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    // find the user in the repository
    await connect();
    const user: IUser | null = await userModel.findOne({
      email: req.body.email,
    });

    if (!user) {
      res.status(400).json({ error: "Email or password is wrong" });
      return;
    } else {
      // create auth token and send it back
      const validPassword: boolean = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        res.status(400).json({ error: "Email or password is wrong" });
        return;
      }

      const userId: string = user._id;
      const token: string = jwt.sign(
        {
          // payload
          name: user.name,
          email: user.email,
          id: userId,
        },
        process.env.TOKEN_SECRET as string,
        { expiresIn: "2h" }
      );
      // attach the token and send it back
      res
        .status(200)
        .header("auth-token", token)
        .json({ error: null, data: { userId, token } });
    }
  } catch (error) {
    res.status(500).send("Error logging in user. Error:" + error);
  } finally {
    await disconnect();
  }
}

/**
 * Middleware logic to verify the client JWT token
 * @param req
 * @param res
 *  @param next
 */
export function verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.header("auth-token");
    if (!token) {
        res.status(400).json({ error: "Access Denied" });
        return;
    }

    try {
        if (token)
            jwt.verify(token, process.env.TOKEN_SECRET as string);
        next();
    }
    catch {
        res.status(401).send("Invalid Token");
    }
}

// Login a user
/**
 * Validate user registration info (name, email, password)
 * @param data
 */
export function validateUserRegistrationInfo(data: IUser): ValidationResult {
  const schema = Joi.object({
    name: Joi.string().min(4).max(255).required(),
    email: Joi.string().email().min(6).max(255).required(),
    password: Joi.string().min(6).max(20).required(),
  });

  return schema.validate(data);
}

/**
 * Validate user login info (email, password)
 * @param data
 * @returns
 */
export function validateUserLoginInfo(data: IUser): ValidationResult {
  const schema = Joi.object({
    email: Joi.string().email().min(6).max(255).required(),
    password: Joi.string().min(6).max(20).required(),
  });

  return schema.validate(data);
}
