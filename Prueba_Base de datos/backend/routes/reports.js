const express = require('express');
const router = express.Router();
const db = require('../db');
// 1. Total paid per customer
router.get('/total-paid-per-customer', async (req, res) => {
  try {
    const sql = `SELECT c.customer_id, c.full_name, c.national_id, 
    COALESCE(SUM(t.amount),0) AS total_paid
    FROM customers c
    LEFT JOIN transactions t ON c.customer_id = t.customer_id AND t.status = 'Completed'
    GROUP BY c.customer_id, c.full_name, c.national_id`;
    const [rows] = await db.query(sql);
    res.json(rows);
  } catch(err){ res.status(500).json({error: err.message}); }
});
// 2. Pending invoices with client and transaction info
router.get('/pending-invoices', async (req, res) => {
  try {
    const sql = `
    SELECT i.invoice_number, i.amount_billed, COALESCE(p.total_paid,0) AS total_paid, 
           (i.amount_billed - COALESCE(p.total_paid,0)) AS balance,
           t.transaction_id, t.amount AS transaction_amount, t.status AS transaction_status,
           c.customer_id, c.full_name, c.national_id
    FROM invoices i
    LEFT JOIN (
      SELECT invoice_number, SUM(amount) AS total_paid FROM transactions WHERE status = 'Completed' GROUP BY invoice_number
    ) p ON i.invoice_number = p.invoice_number
    LEFT JOIN transactions t ON i.invoice_number = t.invoice_number
    LEFT JOIN customers c ON t.customer_id = c.customer_id
    WHERE COALESCE(p.total_paid,0) < i.amount_billed
    ORDER BY i.invoice_number;
    `;
    const [rows] = await db.query(sql);
    res.json(rows);
  } catch(err){ res.status(500).json({error: err.message}); }
});
// 3. Transactions by platform
router.get('/transactions-by-platform/:platform', async (req, res) => {
  try {
    const platform = req.params.platform;
    const sql = `SELECT t.*, c.full_name, c.national_id, i.amount_billed FROM transactions t 
     LEFT JOIN customers c ON t.customer_id = c.customer_id
     LEFT JOIN invoices i ON t.invoice_number = i.invoice_number
     LEFT JOIN platforms p ON t.platform_id = p.platform_id
     WHERE p.name = ?`;
    const [rows] = await db.query(sql, [platform]);
    res.json(rows);
  } catch(err){ res.status(500).json({error: err.message}); }
});
module.exports = router;
