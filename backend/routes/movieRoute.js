import { Router } from 'express';

// import all controllers
// import SessionController from './app/controllers/SessionController';

const movieRoute = new Router();

// Add movieRoute
movieRoute.get('/:userId', SessionController.store);
movieRoute.post('/add', SessionController.store);
movieRoute.delete('/remove', SessionController.store);

export default movieRoute
