# Page

## Overview

Briefly explain what this route is responsible for and where it fits within the application.

### Routes

The route for the single page depends on the action, the edit action requires the UUID of the page being edited.

For example:

- **Create** - `/page?action=create`
- **Edit** - `/page?action=edit&id=12345`

### Source

- [View on GitHub](<https://github.com/lucidthemes/dashboard-aurora/tree/main/src/app/(dashboard)/(pages)/page>)

## Responsibilities

- Display a list of pages
- Allow pages to be created, edited and deleted
- Provide filtering/search
- Handle pagination

## User flow

### Create page

1. User navigates to `/pages`
2. Pages are fetched from the database
3. Results are displayed in the data table
4. User can create or edit a page
5. Form submission validates the data
6. The page is persisted and the UI is updated

### Edit page

1. User navigates to `/pages`
2. Pages are fetched from the database
3. Results are displayed in the data table
4. User can create or edit a page
5. Form submission validates the data
6. The page is persisted and the UI is updated

## Structure
