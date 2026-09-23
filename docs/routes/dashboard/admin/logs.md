# Logs

## Overview

The logs route displays the list of event logs

## Route

`/logs`

## Source

- [View on GitHub](<https://github.com/lucidthemes/dashboard-aurora/tree/main/src/app/(dashboard)/(admin)/logs>)

## Responsibilities

- Display a list of event logs
- Provide search by user ID
- Provide filtering by log level, event name, or source
- Handle pagination
- Handle changing the sort order
- Handle changing the number of items shown per page

## User flow

1. User navigates to `/logs`
2. Users are fetched from the database using suspense to show a loading spinner
3. Results are displayed in the data table

## Structure

### Components

- **list** - used to display the list of logs in a data table
- **page** - used for page specific components like heading and wrapper

### Data

- **get-logs** - fetches the list of logs from Supabase

### Schemas

- **logs-list** - used for the logs list
