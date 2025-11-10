import cors from "cors";
import express, {
  type Application,
  type Request,
  type Response,
} from "express";
const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running");
});

export default app;
