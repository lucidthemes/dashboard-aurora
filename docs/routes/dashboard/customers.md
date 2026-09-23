# Customers

## Overview

The customers route displays the list of customers and allows for a customer to be viewed

## Route

`/customers`

## Source

- [View on GitHub](<https://github.com/lucidthemes/dashboard-aurora/tree/main/src/app/(dashboard)/customers>)

## Responsibilities

- Display a list of customers
- Allow customers to be viewed
- Provide search by customer ID or email address
- Handle pagination
- Handle changing the sort order
- Handle changing the number of items shown per page

## User flow

1. User navigates to `/customers`
2. Customers are fetched from the database using suspense to show a loading spinner
3. Results are displayed in the data table

### View customer

1. User clicks view customer
2. Sheet is opened with tabs showing customer details, orders, and reviews

## Structure

### Components

- **list** - used to display the list of customers in a data table
- **page** - used for page specific components like heading and wrapper
- **view-sheet** - used for the customer view sheet

### Data

- **get-customers** - fetches the list of customers from Supabase
- **get-orders** - fetches the list of orders for a specific customer from Supabase
- **get-reviews** - fetches the list of reviews for a specific customer from Supabase

### Hooks

**use-orders** - used to fetch orders for a specific customer
**use-reviews** - used to fetch reviews for a specific customer

### Schemas

- **view-sheet** - used for the customer view sheet orders and reviews
- **customers-list** - used for the customers list
- **list-search-form** - used for the customers list search form

### Store

- **customers-store** - Zustand store containing the state and actions for the customers route
