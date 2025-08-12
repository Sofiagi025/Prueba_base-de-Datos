
# PD M4 - Databases (SQL) - Solution


## Project structure

- `ddl.sql` - SQL script to create the database and tables (MySQL). Database name: pd_sofia_barrios_clan01 (change clan01 to your clan code).
- `csv/` - Normalized CSV files generated from the original Excel: `customers.csv`, `platforms.csv`, `invoices.csv`, `transactions.csv`.
- `backend/` - Node.js + Express backend skeleton (`server.js`, routes, `db.js`).
- `public/` - Simple frontend (dashboard) to manage customers (CRUD).

## How to run (suggested)

1. Create database and tables:

Run the SQL file (in MySQL client):
SOURCE ddl.sql;

2. Load CSVs (option A: LOAD DATA LOCAL INFILE):

LOAD DATA LOCAL INFILE '/path/to/project_m4/csv/platforms.csv'
INTO TABLE platforms
FIELDS TERMINATED BY ','
IGNORE 1 LINES
(platform_id, name);

-- do the same for customers, invoices and transactions (adapt path and column order)

Option B: use a small script (python or node) to read `csv/` and insert rows programmatically if LOAD DATA is not possible.

3. Backend:

cd backend
npm install
# set env variables DB_HOST, DB_USER, DB_PASS, DB_NAME
npm start

4. Frontend: open http://localhost:3000 in your browser (served by backend)

## Normalization summary

We applied 1NF, 2NF and 3NF by splitting repeating groups and separating entities:
- Customers (unique by national_id)
- Platforms
- Invoices
- Transactions (references customers, invoices, platforms)

## Advanced queries

1. Total paid per customer: `/api/reports/total-paid-per-customer`
2. Pending invoices with client and transaction: `/api/reports/pending-invoices`
3. Transactions by platform: `/api/reports/transactions-by-platform/:platform`

## Notes

- Database name uses a placeholder `sierra`. Replace with your actual clan code.
- Accent characters were normalized in column names to English equivalents.


coder: Sofia Barrios Herrera.
correo:sofiabarriosherrera25@gmail.com
clan:sierra
cc:1082241251.


