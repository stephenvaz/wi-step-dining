import express from 'express';
import DiningController from '../controllers/dining.js';

const diningRouter = express.Router();

const diningController = new DiningController();

diningRouter.post('/create', diningController.create);

diningRouter.get('/', diningController.seachByName);

diningRouter.get('/availability', diningController.availabillity);

export default diningRouter;