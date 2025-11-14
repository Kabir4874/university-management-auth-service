import express from 'express';
import validateRequest from '../../middlewares/validateRequest.js';
import { createAcademicSemester } from './academicSemester.controller.js';
import { createAcademicSemesterZodSchema } from './academicSemester.validation.js';

const router = express.Router();

router.post(
  '/create',
  validateRequest(createAcademicSemesterZodSchema),
  createAcademicSemester,
);

export default router;
