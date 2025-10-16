import {Router} from 'express';

const authRouter = Router();
// Define your authentication routes here

authRouter.post('/sign-up', (req, res) => {
  res.send('User sign-up');
});

authRouter.post('/sign-in', (req, res) => {
  res.send('User sign-in');
});

authRouter.post('/sign-out', (req, res) => {
  res.send('User sign-out');
});

export default authRouter;
