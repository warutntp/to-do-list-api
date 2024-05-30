import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const host = "0.0.0.0";
const port = process.env.API_PORT ? parseInt(process.env.API_PORT) : 8080;

app.listen(port, host, () => {
  console.log(`Server listening at http://${host}:${port}`);
});
