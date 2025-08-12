-- DDL for project (MySQL)
CREATE DATABASE IF NOT EXISTS `pd_sofia_barrios_clansierra` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `pd_sofia_barrios_clansierra`;


-- Table: customers
CREATE TABLE IF NOT EXISTS customers (
  customer_id INT AUTO_INCREMENT PRIMARY KEY,
  national_id VARCHAR(50) NOT NULL UNIQUE,
  full_name VARCHAR(255) NOT NULL,
  address TEXT,
  phone VARCHAR(50),
  email VARCHAR(255) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table: platforms
CREATE TABLE IF NOT EXISTS platforms (
  platform_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table: invoices
CREATE TABLE IF NOT EXISTS invoices (
  invoice_number VARCHAR(50) PRIMARY KEY,
  billing_period VARCHAR(20),
  amount_billed DECIMAL(14,2) NOT NULL,
  amount_paid DECIMAL(14,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table: transactions
CREATE TABLE IF NOT EXISTS transactions (
  transaction_id VARCHAR(50) PRIMARY KEY,
  transaction_datetime DATETIME,
  amount DECIMAL(14,2),
  status ENUM('Pending','Completed','Failed') DEFAULT 'Pending',
  transaction_type VARCHAR(100),
  customer_id INT NOT NULL,
  invoice_number VARCHAR(50),
  platform_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (invoice_number) REFERENCES invoices(invoice_number) ON DELETE SET NULL ON UPDATE CASCADE,
  FOREIGN KEY (platform_id) REFERENCES platforms(platform_id) ON DELETE SET NULL ON UPDATE CASCADE,
  INDEX(idx_customer_id, customer_id),
  INDEX(idx_invoice_number, invoice_number),
  INDEX(idx_platform_id, platform_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
