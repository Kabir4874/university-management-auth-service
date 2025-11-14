import cors from 'cors';
import express, {
  type Application,
  type Request,
  type Response,
} from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler.js';
import routes from './app/routes/index.js';
const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/api/v1', routes);

//global error handler
app.use(globalErrorHandler);

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running');
});

export default app;
