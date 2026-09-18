# Post

## Overview

The single post route displays the post within the editor

## Routes

The route for the single post depends on the action, the edit action requires the UUID of the post being edited.

For example:

- **Create** - `/post?action=create`
- **Edit** - `/post?action=edit&id=12345`

## Source

- [View on GitHub](<https://github.com/lucidthemes/dashboard-aurora/tree/main/src/app/(dashboard)/(blog)/post>)

## Responsibilities

- Display a single post with the editor
- Allow content blocks to be added, edited, and removed
- Allow post options to be changed
- Handle publishing a new post
- Handle updating an existing post

## User flow

### Create post

1. User navigates to `/post?action=create`
2. User adds content blocks to the editor
3. User changes options within the post sidebar
4. Status option:
   1. Draft - user clicks save draft button
   2. Published - user clicks publish button
5. Post is validated and a new post is created

### Edit post

1. User navigates to `/post?action=edit&id=12345`
2. User updates content blocks within the editor
3. User changes options within the post sidebar
4. User clicks the save button
5. Post is validated and post is updated

## Structure

The route contains the following files:

- **content** - renders the editor and passes the fetched post from Supabase to it
- **get-post** - fetches the post from Supabase
