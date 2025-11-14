import status from 'http-status';
import catchAsync from '../../../shared/catchAsync.js';
import sendReponse from '../../../shared/sendResponse.js';
import { createUserService } from './user.service.js';

export const createUser = catchAsync(async (req, res) => {
  const { user } = req.body;
  const result = await createUserService(user);
  sendReponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'User Created Successfully',
    data: result,
  });
});
