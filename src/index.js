import express from 'express';
import cors from 'cors';
import AuthController from './controllers/auth.js';
import diningRouter from './routers/dining.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const apiRouter = express.Router();

app.use('/api', apiRouter);


apiRouter.get('/', (req, res) => {
    res.send('Hello World!');
});

const authC = new AuthController();
apiRouter.post('/signup', authC.register);
apiRouter.post('/login', authC.login);

apiRouter.use('/dining-place', diningRouter);

app.listen(5000, () => {
    console.clear()
    console.log('Server @ http://localhost:5000');
});

