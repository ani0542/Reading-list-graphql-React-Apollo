
const express=require('express')
const {graphqlHTTP} = require('express-graphql');
const cors = require('cors');
const schema = require('./schema');
const mongoose=require('mongoose')

const app = express();



// Allow cross-origin
app.use(cors());


// connect to mlab database

mongoose.connect('mongodb+srv://kcg:123@cluster0.6zhaq.mongodb.net/kcg?retryWrites=true&w=majority')
mongoose.connection.once('open',  () => {
    console.log('conneted to database');
});

app.use(
    '/graphql',
    graphqlHTTP({
      schema,
      graphiql: true
    })
  );


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));





