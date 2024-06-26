import express, { Request, Response, NextFunction } from "express";
import router from "./routes";
import { errorHandler } from "./middleware/errorHandler";
import { logger } from "./middleware/logger";

const app = express();

app.use(express.json());
app.use(logger);
app.use("/api", router);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: "Endpoint not found" });
});

app.use(errorHandler);

export default app;
