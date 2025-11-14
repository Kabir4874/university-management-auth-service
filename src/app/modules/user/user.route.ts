import express from 'express';
import validateRequest from '../../middlewares/validateRequest.js';
import { createUser } from './user.controller.js';
import { createUserZodSchema } from './user.validation.js';

const router = express.Router();

router.post('/create', validateRequest(createUserZodSchema), createUser);

export default router;
