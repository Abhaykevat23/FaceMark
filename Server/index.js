const connectToMongo=require('./db');
const express = require('express')
const path = require('path');
const cors = require('cors')

connectToMongo();
const app = express()
const port = 5000
app.use(express.json());

app.use(cors());

// Serve studentImages folder as static
app.use('/studentImages', express.static(path.join(__dirname, 'studentImages')));

//routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/manageuser',require('./routes/manageUser'))
app.use('/api/managestudent',require('./routes/manageStudent'))

app.listen(port, () => {
  console.log(`FaceMark app Running on port ${port}`) 
})