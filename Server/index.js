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
app.use('/api/manageuser',require('./routes/manageUser'))
app.use('/api/managestudent',require('./routes/manageStudent'))

app.listen(port, () => {
  console.log(`FaceMark app Running on port ${port}`)
})