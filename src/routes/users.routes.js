import { Router } from 'express';
import pool from '../db.config.js'
 
const router = Router();

router.get('/', async(req, res) => {
  try {
  const result = await pool.query("SELECT * FROM products")
  res.status(200).json({ success: true, data: result.rows})
  } catch (err) {
    res.status(500).json({success: false, message: err.message})
  } 
})

router.get('/:id', async(req, res) => {
  const id = req.params.id
  try{
     const result = await pool.query("SELECT * FROM products WHERE id = $1", [id])
    if (result.rowCount === 0){
        res.status(404).json({success: false, message: 'Product not found' })
    }else{
     res.status(200).json({success: true, data: result.rows[0]})
    }
  }catch (err) {
    res.status(500).json({success: false, message: err.message})
  }
})

router.post('/products', async (req, res) => {
  const { productThumbnail, productTitle, productDescription, productCost, onOffer } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO products (productThumbnail, productTitle, productDescription, productCost, onOffer) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [productThumbnail, productTitle, productDescription, productCost, onOffer]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
})

router.patch('/products/:id', async (req, res) => {
  const { id } = req.params;
  const { productThumbnail, productTitle, productDescription, productCost, onOffer } = req.body;
  try {
    const result = await pool.query(
      'UPDATE products SET productThumbnail = $1, productTitle = $2, productDescription = $3, productCost = $4, onOffer = $5 WHERE id = $6 RETURNING *',
      [productThumbnail, productTitle, productDescription, productCost, onOffer, id]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send('Product not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send('Product not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

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