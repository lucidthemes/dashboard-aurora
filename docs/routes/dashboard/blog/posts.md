# Posts

## Overview

The posts route displays the list of created posts and allows for actions like create, edit, and delete

## Route

`/posts`

## Source

- [View on GitHub](<https://github.com/lucidthemes/dashboard-aurora/tree/main/src/app/(dashboard)/(blog)/posts>)

## Responsibilities

- Display a list of posts
- Allow posts to be created, edited, duplicated, deleted, and viewed
- Provide search by post title
- Provide filtering by author, category, tag, or status
- Handle pagination
- Handle changing the sort order
- Handle changing the number of items shown per page

## User flow

1. User navigates to `/posts`
2. Posts are fetched from the database using suspense to show a loading spinner
3. Results are displayed in the data table

### Create/edit post

1. User clicks either create or edit post
2. Single post route is then loaded to create/edit a post using the editor

### Duplicate post

1. User clicks duplicate post
2. Post is duplicated
3. Posts route is revalidated to show updated data table

### Delete post

1. User clicks delete post
2. Delete post confirmation dialog is shown with the option to cancel or delete the post
   1. Delete
      1. Post is deleted
      2. Posts route is revalidated to show updated data table
   2. Cancel - delete dialog closed and post not deleted

### View post

1. User clicks view post
2. Post is opened on the frontend site in a new tab

## Structure

### Actions

- **duplicate-post** - duplicates the selected post by fetching that post from Supabase, creating a new object of that post from the returned data, appending "- copy" to the title and slug, setting the status to draft, and then inserting the new post to Supabase

### Components

- **list** - used to display the list of posts in a data table
- **page** - used for page specific components like heading and wrapper

### Data

- **get-authors** - fetches the list of authors from Supabase to use within posts list author filter
- **get-categories** - fetches the list of categories from Supabase to use within posts list category filter
- **get-tags** - fetches the list of tags from Supabase to use within posts list tag filter
- **get-posts** - fetches the list of posts from Supabase

### Schemas

- **duplicate-post** - used for the duplicate post action
- **author** - used for the posts list author filter
- **category** - used for the posts list category filter
- **tag** - used for the posts list tag filter
- **posts-list** - used for the posts list

### Store

- **posts-store** - Zustand store containing the state and actions for the posts route
