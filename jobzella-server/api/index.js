import express from "express";
import authRoutes from "../routes/authRoutes.js";
import goalRoutes from "../routes/goalRoutes.js";
import cors from "cors";

import { connectToDB } from "../utils/connectToDB.js";
import authentication from "../middlewares/authentication.js";

const app = express();
const PORT = process.env.PORT;

app.use(cors())

connectToDB();

app.use(express.json());

app.get('/api', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.send(`Hello!`);
});


app.use("/api/auth", authRoutes);
app.use("/api/goals", authentication, goalRoutes);

app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});

export default app;