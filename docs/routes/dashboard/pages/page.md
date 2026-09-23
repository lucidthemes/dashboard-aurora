# Page

## Overview

The single page route displays the page within the editor

### Routes

The route for the single page depends on the action, the edit action requires the UUID of the page being edited.

For example:

- **Create** - `/page?action=create`
- **Edit** - `/page?action=edit&id=12345`

### Source

- [View on GitHub](<https://github.com/lucidthemes/dashboard-aurora/tree/main/src/app/(dashboard)/(pages)/page>)

## Responsibilities

- Display a single page with the editor
- Allow content blocks to be added, edited, and removed
- Allow page options to be changed
- Handle publishing a new page
- Handle updating an existing page

## User flow

### Create page

1. User navigates to `/page?action=create`
2. User adds content blocks to the editor
3. User changes options within the page sidebar
4. Status option:
   1. Draft - user clicks save draft button
   2. Published - user clicks publish button
5. Page is validated and a new page is created

### Edit page

1. User navigates to `/page?action=edit&id=12345`
2. User updates content blocks within the editor
3. User changes options within the page sidebar
4. User clicks save the button
5. Page is validated and page is updated

## Structure

The route contains the following files:

- **content** - renders the editor and passes the fetched page from Supabase to it
- **get-page** - fetches the page from Supabase
