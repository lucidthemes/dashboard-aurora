# Pages

## Overview

The pages route displays the list of created pages and allows for actions like create, edit, and delete

## Route

`/pages`

## Source

- [View on GitHub](<https://github.com/lucidthemes/dashboard-aurora/tree/main/src/app/(dashboard)/(pages)/pages/>)

## Responsibilities

- Display a list of pages
- Allow pages to be created, edited, duplicated, deleted, and viewed
- Provide search by page title
- Provide filtering by status of draft or published
- Handle pagination
- Handle changing the number of items shown per page

## User flow

1. User navigates to `/pages`
2. Pages are fetched from the database using suspense to show a loading spinner
3. Results are displayed in the data table

### Create/edit page

1. User clicks either create or edit page
2. Single page route is then loaded to create/edit a page using the editor

### Duplicate page

1. User clicks duplicate page
2. Page is duplicated
3. Pages route is revalidated to show updated data table

### Delete page

1. User clicks delete page
2. Delete page confirmation dialog is shown with the option to cancel or delete the page
   1. Delete
      1. Page is deleted
      2. Pages route is revalidated to show updated data table
   2. Cancel - delete dialog closed and page not deleted

### View page

1. User clicks view page
2. Page is opened on the frontend site in a new tab

## Structure

### Actions

- **duplicate-page** - duplicates the selected page by fetching that page from Supabase, creating a new object of that page from the returned data, appending "- copy" to the title and slug, setting the status to draft, and then inserting the new page to Supabase

### Components

- **list** - used to display the list of pages in a data table
- **page** - used for page specific components like heading and wrapper

### Data

- **get-pages** - fetches the list of pages from Supabase

### Schemas

- **duplicate-page** - used for the duplicate page action
- **pages-list** - used for the pages list

### Store

- **pages-store** - Zustand store containing the state and actions for the pages route
