import * as bodyParser from "body-parser";
import express from "express";
const morgan = require("morgan");

import authenticate from "../middlewares/authenticate";
import application from "../constants/application";
import indexRoute from "../routes/index.route";
import joiErrorHandler from "../middlewares/joiErrorHandler";
import * as errorHandler from "../middlewares/apiErrorHandler";
var cors = require("cors");

const app = express();

var whitelist = ["http://localhost:3002", "http://localhost:3000"];
var corsOptions = {
  credentials: true,
  origin: function (
    origin: any,
    callback: (arg0: Error, arg1: boolean) => void
  ) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"), false);
    }
  },
};
app.use(cors(corsOptions));

require("dotenv").config();
app.use(bodyParser.json());

app.use(morgan("dev"));

app.use(authenticate);

// Router
app.use(application.url.base, indexRoute);
app.get("/", (req, res) => {
  res.send(true);
});

// Joi Error Handler
app.use(joiErrorHandler);
// Error Handler
app.use(errorHandler.notFoundErrorHandler);

app.use(errorHandler.errorHandler);

export default app;
