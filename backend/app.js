const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const { graphqlHTTP } = require('express-graphql');

const config = require('./config/config.json');

const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');

const app = express();

app.use(bodyParser.json());

app.use(cors());

//GraphQL
app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
  })
);

mongoose.connect(
    'mongodb://localhost:27017/pruebagptx'
).then(() => {
    app.listen(3000, console.log('Connected to Port:3000.'))
}).catch((err) => console.log(err))
