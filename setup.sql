-- Create database
CREATE DATABASE IF NOT EXISTS node_example;

-- Use the database
USE node_example;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

-- Insert sample user (password is plain text for simplicity, in production use hashing)
INSERT INTO users (email, password) VALUES ('user@example.com', 'password123');