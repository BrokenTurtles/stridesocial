import path from 'path';
import express from 'express';
import connectDB from './config/db.js';
// import dotenv from 'dotenv';



//dotenv.config();

const app = express();

app.use(express.json());

//connectDB();





const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  )
} else {
  app.get('/api', (req, res) => {
    res.json({message: 'WHASSUP FELLAS!!!!'})
  })
}


const PORT = process.env.PORT || 3000;

app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);