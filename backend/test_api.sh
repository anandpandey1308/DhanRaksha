#!/bin/bash

# Create Income
curl --location --request POST 'http://localhost:5000/income' \
--header 'Content-Type: application/json' \
--data-raw '{
    "source": "Freelance Work",
    "amount": 5000,
    "date": "2025-08-01",
    "category": "Work"
}'

# Get All Incomes
curl --location --request GET 'http://localhost:5000/income'

# Get Income by ID
curl --location --request GET 'http://localhost:5000/income/0'

# Update Income
curl --location --request PUT 'http://localhost:5000/income/0' \
--header 'Content-Type: application/json' \
--data-raw '{
    "source": "Updated Freelance Work",
    "amount": 6000,
    "date": "2025-08-02",
    "category": "Updated Work"
}'

# Delete Income
curl --location --request DELETE 'http://localhost:5000/income/0'

# Filter Income by Month
curl --location --request GET 'http://localhost:5000/income/filter-by-month?month=8&year=2025'

# Category Breakdown for Income
curl --location --request GET 'http://localhost:5000/income/category-breakdown'

# Create Expense
curl --location --request POST 'http://localhost:5000/expense' \
--header 'Content-Type: application/json' \
--data-raw '{
    "description": "Groceries",
    "amount": 200,
    "date": "2025-08-01",
    "category": "Food"
}'

# Get All Expenses
curl --location --request GET 'http://localhost:5000/expense'

# Get Expense by ID
curl --location --request GET 'http://localhost:5000/expense/0'

# Update Expense
curl --location --request PUT 'http://localhost:5000/expense/0' \
--header 'Content-Type: application/json' \
--data-raw '{
    "description": "Updated Groceries",
    "amount": 250,
    "date": "2025-08-02",
    "category": "Updated Food"
}'

# Delete Expense
curl --location --request DELETE 'http://localhost:5000/expense/0'

# Filter Expense by Month
curl --location --request GET 'http://localhost:5000/expense/filter-by-month?month=8&year=2025'

# Category Breakdown for Expense
curl --location --request GET 'http://localhost:5000/expense/category-breakdown'