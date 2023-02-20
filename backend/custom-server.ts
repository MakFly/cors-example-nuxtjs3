import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { readFile } from 'fs/promises';

class Server {

  private app: Application;
  private port: string;

  constructor() {
    this.app = express();
    this.port = '3001';
    this.listen();
    this.routes();
  }

  listen() {
    this.app.use(express.json());
    this.app.use(bodyParser.json());

    this.app.listen(this.port, () => {
      return console.log(`Express is listening at http://localhost:${this.port}`);
    });
  }

  routes() {
    this.app.get('/one', (req, res, next) => {
      readFile('./one.txt') // arbitrary file
        .then(data => res.send(data))
        .catch(err => next(err)) // passing error to custom middleware
    })

    let allowlist = ['http://localhost:4001']
    let corsOptionsDelegate = function (req, callback) {
      let corsOptions: { origin: boolean } = { origin: false };
      console.log("Header" , req.header('Origin'));
      if (allowlist.indexOf(req.header('Origin')) !== -1) {
        console.log("Allow ok");
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
      } else {
        corsOptions = { origin: false } // disable CORS for this request
        throw new Error('Not allowed');
      }
      callback(null, corsOptions) // callback expects two parameters: error and options
    }

    this.app.use(cors(corsOptionsDelegate));

    this.app.get('/api/data', function (req, res, next) {
      res.status(200).send({ msg: 'This is CORS-enabled for only tic tac.' })
    })

    this.app.use((error, req, res, next) => {
      console.log("Error Handling Middleware called")
      console.log('Path: ', req.path)
      console.error('Error: ', error)

      res.status(error.status || 500).send({ message: "something went wrong" })
      // if (error.type == 'redirect')
      //   res.redirect('/error')

      // else if (error.type == 'time-out') // arbitrary condition check
      //   res.status(408).send(error)
      // else
      //   res.status(500).send(error)
    })

  }
}

new Server();