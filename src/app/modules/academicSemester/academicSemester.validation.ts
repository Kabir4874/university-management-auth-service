import z from 'zod';
import {
  academicSemesterCode,
  academicSemesterMonth,
  academicSemesterTitle,
} from './academinSemester.constant.js';

export const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum(academicSemesterTitle),
    year: z.number({ error: 'Year is requried' }),
    code: z.enum(academicSemesterCode),
    startMonth: z.enum(academicSemesterMonth),
    endMonth: z.enum(academicSemesterMonth),
  }),
});
