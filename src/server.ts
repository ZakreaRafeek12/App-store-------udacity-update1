import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes';
import errorHandler from './middlewares/errorHandler';
// import db from './database';

const Application: Application = express();

const port_1 = process.env.PORT || 2222;

const corsOption = {
  origin: 'http://someotherdomissn.com',
  optionSuccessStatus: 200,
};

Application.use(cors(corsOption));
Application.use(express.json());
Application.use('/api', routes);
Application.use(errorHandler);
Application.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello🤩' });
});

// app.get('/test-cors', cors(corsOption), (req, res, next)=>{
//     res.json({msg: 'This is CORS-enabled with a middle ware'})
// })

// test db

Application.listen(port_1, () => {
  console.log(`Server is listening on PORT: ${port_1} 😀`);
});

export default Application;
