import status from 'http-status';
import { model, Schema } from 'mongoose';
import ApiError from '../../../errors/ApiError.js';
import type {
  AcademicSemesterModel,
  IAcademicSemester,
} from './academicSemester.interface.js';
import {
  academicSemesterCode,
  academicSemesterMonth,
  academicSemesterTitle,
} from './academinSemester.constant.js';

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: academicSemesterTitle,
    },
    year: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: academicSemesterCode,
    },
    startMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonth,
    },
    endMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonth,
    },
  },
  { timestamps: true },
);

//Handling Same Year and same semester issue
academicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });
  if (isExist) {
    throw new ApiError(status.CONFLICT, 'Academic semester is already exist!');
  }
  next();
});

const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema,
);

export default AcademicSemester;
