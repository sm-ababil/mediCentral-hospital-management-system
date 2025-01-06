const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');


app.use(cors());


//dotenv config
dotenv.config()

app.use(express.static(path.join(__dirname, 'client', 'build')));


app.get('/api/example', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
  });

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});



//mongodb connection
connectDB();

//rest object
const app = express();


//middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));


//routes
app.use('/api/v1/user', require('./routes/userRoute'));

app.get('/', (req, res)=>{
    res.send('Testednpm ')
})


//listen port
const port = process.env.PORT || 8080;

app.listen(port, () =>{
    console.log(`Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`.bgCyan.white);
});