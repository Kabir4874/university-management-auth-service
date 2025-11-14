import status from 'http-status';
import catchAsync from '../../../shared/catchAsync.js';
import sendReponse from '../../../shared/sendResponse.js';
import { createAcademicSemesterService } from './academicSemester.service.js';

export const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await createAcademicSemesterService(req.body);

  sendReponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Academic Semester Created Successfully',
    data: result,
  });
});
