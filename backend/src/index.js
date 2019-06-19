require("dotenv/config")
const express = require('express')

const app = express()
var cors = require('cors')

app.use(cors())
app.use(express.urlencoded({
  extended: false
}))
app.use(express.json());

// var bodyParser = require('express')

require('./routes/index.js')(app);
require('./database');

app.use((req, res, next) => {
  console.log("hit middleware")
  next();
});

app.get('/', (req, res) => res.send("Hello World!"))

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`)
  console.log(process.env.MY_SECRET);
})