import express from "express";
import { userRoutes } from "../../infrastructure/http/routes/UserRoutes";

const app = express();

app.use(express.json());
app.use("/api", userRoutes);

export { app };
