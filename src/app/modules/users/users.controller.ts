import { type NextFunction, type Request, type Response } from 'express';
import { createUserService } from './users.service.js';

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { user } = req.body;
    const result = await createUserService(user);
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
