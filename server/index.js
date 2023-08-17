import path from 'path';
import express from 'express';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import dotenv from 'dotenv';


dotenv.config();

const app = express();

app.use(express.json());

connectDB();

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);



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

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 3000 ;

app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);