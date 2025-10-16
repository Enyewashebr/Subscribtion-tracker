import {Router} from 'express';


const userRouter = Router();
// Define your user-related routes here


userRouter.get('/', (req, res) => {
  res.send({title:'Get all users'})
});
userRouter.get('/:id', (req, res) => {
  res.send({title:`Get user with ID`});
});

userRouter.post('/', (req, res) => {
  res.send({title:`Create a new user`});
});

userRouter.put('/:id', (req, res) => {
  res.send({title:`Update user with ID`});
});

userRouter.delete('/:id', (req, res) => {
  res.send({title:`Delete user with ID`});
});

export default userRouter;
