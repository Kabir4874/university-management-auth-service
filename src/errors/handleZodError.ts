import type { ZodError, ZodIssue } from 'zod';
import type { IGenericErrorResponse } from '../interfaces/common.js';
import type { IGenericErrorMessage } from '../interfaces/error.js';

const handleZodError = (error: ZodError): IGenericErrorResponse => {
  const statusCode = 400;

  const errors: IGenericErrorMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue.path[issue.path.length - 1] as string,
      message: issue?.message,
    };
  });

  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};

export default handleZodError;
