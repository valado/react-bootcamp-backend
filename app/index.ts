import { authMiddleware } from "./middleware/auth";
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
import helmet from "helmet";
const cookieParser = require("cookie-parser");

import loginRouter from "./routes/login";
import registerRouter from "./routes/register";
import dataRouter from "./routes/data";
import todoRouter from "./routes/todo";
import { clearDB } from "./db";

// Create an express app
const app = express();
app.use(helmet());
app.use(bodyParser.json({ extended: true }));

// CORS
const corsOptions = {
  origin: "*",
  preflightContinue: false,
  credentials: true,
  methods: ["OPTIONS", "GET", "PUT", "POST", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.use(cookieParser());

//public routes
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.delete("/db", (req: any, res: any) => {
  clearDB();
  res.send();
});

// protected routes
app.use(authMiddleware);
app.use("/data", dataRouter);
app.use("/todo", todoRouter);

app.set("port", process.env.PORT || 9000);
//Start Server
app.listen(app.get("port"), function () {
  console.log("Node app is running on port", app.get("port"));
});
