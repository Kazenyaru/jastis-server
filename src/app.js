import "regenerator-runtime/runtime";
import express from "express";
import { createServer } from "http";
import socketio from "socket.io";

import path from "path";
import "dotenv/config";
import moment from "moment";

import cors from "cors";
import cookieParser from "cookie-parser";
import logger from "morgan";
import session from "express-session";
import connectMongo from "connect-mongo";

import routes from "./routes/index.route";
import { dbConnect } from "./config/mongo.config";

import { connectSocket } from "./controller/socket.controller";

const startServer = async () => {
  const app = express();
  const server = createServer(app);
  const io = socketio.listen(server);

  app.use(cors());

  const MongoStore = connectMongo(session);

  const mongoStore = session({
    secret: "secret",
    store: new MongoStore({
      url:
        "mongodb+srv://fadilMuh:akuFadil22;@smkn4bdgcluster-h7mx1.mongodb.net/JASTIS?retryWrites=true&w=majority",
    }),
    resave: true,
    saveUninitialized: true,
  });

  app.use(mongoStore);

  await dbConnect();

  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(process.cwd(), "public")));

  app.use("/", routes);
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(process.cwd() + "/public/"));

    app.get(/.*/, (req, res) =>
      res.sendFile(process.cwd() + "/public/index.html")
    );
  }

  connectSocket(app, io, mongoStore);

  const PORT = process.env.PORT || 3001;
  server.listen(PORT, () =>
    console.log(
      `🚀 Server ready at http://localhost:${PORT}\nServer Time: ${moment().utcOffset(
        "+0700"
      )}`
    )
  );
};

startServer();
