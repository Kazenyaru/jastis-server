import 'regenerator-runtime/runtime';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import session from 'express-session';
import connectMongo from 'connect-mongo';

import { dbConnect } from './config/mongo.config';
import { typeDefs } from './schema/typeDefs';
import { resolvers } from './schema/resolvers';

const startServer = async () => {
  const app = express();

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  app.use(cors());

  const MongoStore = connectMongo(session);

  app.use(
    session({
      secret: 'secret',
      store: new MongoStore({
        url:
          'mongodb+srv://fadilMuh:akuFadil22;@smkn4bdgcluster-h7mx1.mongodb.net/JASTIS?retryWrites=true&w=majority',
      }),
      resave: true,
      saveUninitialized: true,
    })
  );

  await dbConnect();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    tracing: true,
  });

  server.applyMiddleware({ app });

  // Handle production
  if (process.env.NODE_ENV === 'production') {
    // Static folder
    app.use(express.static(__dirname + '/public/'));

    // Handle SPA
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
  }

  const PORT = process.env.PORT || 3002;
  app.listen(PORT, () =>
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    )
  );
};

startServer();
