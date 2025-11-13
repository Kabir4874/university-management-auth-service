import { type RequestHandler } from 'express';
import { createUserService } from './user.service.js';
import { createUserZodSchema } from './user.validation.js';

export const createUser: RequestHandler = async (req, res, next) => {
  try {
    await createUserZodSchema.parseAsync(req);

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
