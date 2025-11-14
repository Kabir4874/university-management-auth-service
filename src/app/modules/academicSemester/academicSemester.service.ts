import status from 'http-status';
import ApiError from '../../../errors/ApiError.js';
import type { IAcademicSemester } from './academicSemester.interface.js';
import AcademicSemester from './academicSemester.model.js';
import { academicSemesterTitleCodeMapper } from './academinSemester.constant.js';

export const createAcademicSemesterService = async (
  payload: IAcademicSemester,
) => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(status.BAD_REQUEST, 'Invalid Semester Code');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};
