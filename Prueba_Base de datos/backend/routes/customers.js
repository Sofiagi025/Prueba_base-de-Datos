const express = require('express');
const router = express.Router();
const db = require('../db');
// Create customer
router.post('/', async (req, res) => {
  try {
    const { national_id, full_name, address, phone, email } = req.body;
    if(!national_id || !full_name) return res.status(400).json({error: 'national_id and full_name required'});
    const [result] = await db.query('INSERT INTO customers (national_id, full_name, address, phone, email) VALUES (?, ?, ?, ?, ?)', [national_id, full_name, address, phone, email]);
    const [rows] = await db.query('SELECT * FROM customers WHERE customer_id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'Database error', details: err.message});
  }
});
// Read all
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM customers ORDER BY created_at DESC LIMIT 1000');
    res.json(rows);
  } catch(err){ res.status(500).json({error: err.message}); }
});
// Read single
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const [rows] = await db.query('SELECT * FROM customers WHERE customer_id = ?', [id]);
    if(rows.length===0) return res.status(404).json({error: 'Not found'});
    res.json(rows[0]);
  } catch(err){ res.status(500).json({error: err.message}); }
});
// Update
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { full_name, address, phone, email } = req.body;
    await db.query('UPDATE customers SET full_name = ?, address = ?, phone = ?, email = ? WHERE customer_id = ?', [full_name, address, phone, email, id]);
    const [rows] = await db.query('SELECT * FROM customers WHERE customer_id = ?', [id]);
    res.json(rows[0]);
  } catch(err){ res.status(500).json({error: err.message}); }
});
// Delete
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await db.query('DELETE FROM customers WHERE customer_id = ?', [id]);
    res.json({deleted: true});
  } catch(err){ res.status(500).json({error: err.message}); }
});
module.exports = router;
