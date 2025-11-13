import cors from 'cors';
import express, {
  type Application,
  type Request,
  type Response,
} from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler.js';
import userRoutes from './app/modules/user/user.route.js';
const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/api/v1/users', userRoutes);

//global error handler
app.use(globalErrorHandler);

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running');
});

export default app;
