const express = require("express");
const { ApolloServer, AuthenticationError } = require("apollo-server-express");
var {expressjwt: jwt} = require("express-jwt");
const typeDefs = require("./src/schemas/schema");
const resolvers = require("./src/resolvers/resolvers");
const JWT_SECRET = require("./src/constants/constants");

const app = express();
const auth = jwt({
  secret: JWT_SECRET,
  algorithms: ["HS265"],
  credentialsRequired: false,
});
app.use(auth);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    endpoint: "/graphql",
  },
  context: ({ req }) => {
    const user = req.headers.authorization || '';

    if (!user) throw new AuthenticationError('User is not authenticated');

    return { user };
  },
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
}
startServer();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("The server has started at htttp://localhost:" + PORT + "/graphql");
});
