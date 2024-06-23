import express from "express";
import usersRouter from './routes/users.routes.js';

const app = express();

app.use('/users', usersRouter);

app.listen(3000,(req,res) => {
  console.log("running on port 3000")
})