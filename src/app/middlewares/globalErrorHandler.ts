import { type NextFunction, type Request, type Response } from 'express';
import config from '../../config/index.js';
import ApiError from '../../errors/ApiError.js';
import handleValidationError from '../../errors/handleValidationError.js';
import type { IGenericErrorMessage } from '../../interfaces/error.js';

const globalErrorHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode: number = 500;
  let message: string = 'Something wend wrong!';
  let errorMessages: IGenericErrorMessage[] = [];

  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.node_env !== 'production' ? error?.stack : undefined,
  });
  next();
};

export default globalErrorHandler;
