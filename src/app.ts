import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";
import router from "./routes/index";

const app = express();

app.use(express.json());
app.use("/api", router);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: "Endpoint not found" });
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(500).json({ message: "Something went wrong" });
};

app.use(errorHandler);

export default app;
