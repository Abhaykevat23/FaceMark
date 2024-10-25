//start from 42 video of code with harry......
const connectToMongo=require('./db');
const express = require('express')
const cors = require('cors')

connectToMongo();
const app = express()
const port = 5000
app.use(express.json());

app.use(cors());

//routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/manage',require('./routes/manage'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})