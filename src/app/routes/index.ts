import express from 'express';
import academicSemesterRoutes from '../modules/academicSemester/academicSemester.route.js';
import userRoutes from '../modules/user/user.route.js';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/academic-semesters',
    route: academicSemesterRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
