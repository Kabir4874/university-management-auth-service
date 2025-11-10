import cors from 'cors';
import express, {
  type Application,
  type Request,
  type Response,
} from 'express';
import userRoutes from './app/modules/users/users.route.js';
const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/api/v1/users', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running');
});

export default app;
