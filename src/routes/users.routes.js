import { Router } from 'express';
import pool from '../db.config.js'
 
const router = Router();

router.get('/', (req, res) => {
  res.send("getting all users")
})

router.get(':id', (req, res) => {
  res.send("getting a single user")
})

router.post(':id', (req, res) => {
  res.send("Creating a new user")
});

router.patch('/:id', (req, res) => {
  res.send("updating a user")
})

router.delete('/:id', (req, res) => {
  res.send("deleting a user")
})

export default router;