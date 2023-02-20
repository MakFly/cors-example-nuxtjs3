import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"))


let allowlist = ['http://localhost:3000']
let corsOptionsDelegate = function (req, callback) {
  let corsOptions = { origin: false };
  if (allowlist.indexOf(req.header('Origin')) !== -1 && req.header('x-api-key') === dotenv.config().parsed.API_KEY) {
    corsOptions = { origin: true }
  } else {
    throw new Error('You have to be allowed to access this resource');
  }

  callback(null, corsOptions);
}

app.use(cors(corsOptionsDelegate));

// Add your route here
app.get('/api/data', (req, res) => {
  return res.status(200).json({ message: 'Data accessible in here' });
});


app.use((error, req, res, next) => {
  console.log("Error Handling Middleware called")
  console.log('Path: ', req.path)
  console.error('Error: ', error)

  res.status(error.status || 500).send(error.message)
})

export const handler = app;