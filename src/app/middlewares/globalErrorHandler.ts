import { type ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../../config/index.js';
import ApiError from '../../errors/ApiError.js';
import handleValidationError from '../../errors/handleValidationError.js';
import handleZodError from '../../errors/handleZodError.js';
import type { IGenericErrorMessage } from '../../interfaces/error.js';
import { erroLogger } from '../../shared/logger.js';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  // eslint-disable-next-line no-unused-expressions, @typescript-eslint/no-unused-expressions
  config.node_env === 'development'
    ? console.log('GlobalErrorHandler ~', error)
    : erroLogger.error('GlobalErrorHandler ~', error);

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
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessages = simplifiedError.errorMessages;
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
