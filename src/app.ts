import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import storeRoutes from './routes/stores';

var indexRouter = require('./routes');
var storesRouter = require('./routes/stores');

var app = express();

dotenv.config();

// Conectar a MongoDB
/*
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));
*/

const PORT = process.env.PORT || 3000;


// Middlewares
app.use(express.json());
app.use('/', indexRouter);
app.use('/stores', storeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
