# Posts - authors

## Overview

The posts authors route displays the list of created authors and allows for actions like create, edit, and delete

## Route

`/posts/authors`

## Source

- [View on GitHub](<https://github.com/lucidthemes/dashboard-aurora/tree/main/src/app/(dashboard)/(blog)/posts/(routes)/authors>)

## Responsibilities

- Display a list of authors
- Allow authors to be created, edited, and deleted
- Provide search by author name
- Handle pagination
- Handle changing the sort order
- Handle changing the number of items shown per page

## User flow

1. User navigates to `/posts/authors`
2. Authors are fetched from the database using suspense to show a loading spinner
3. Results are displayed in the data table

### Create author

1. User clicks create author
2. Sheet is opened with create author form
3. User clicks the create author button to submit the form
4. Form is validated and a new author created
5. Posts authors route is revalidated to show updated data table

### Edit author

1. User clicks edit author
2. Sheet is opened with edit author form
3. User clicks the save changes button to submit the form
4. Form is validated and author is updated
5. Posts authors route is revalidated to show updated data table

### Delete author

1. User clicks delete author
2. Delete author confirmation dialog is shown with the option to cancel or delete the author
   1. Delete
      1. Author is deleted
      2. Posts authors route is revalidated to show updated data table
   2. Cancel - delete dialog closed and author not deleted

## Structure

### Actions

- **create-post-author** - action used to create a new post author
- **update-post-author** - action used to update an existing post author

### Components

- **form** - used to display the author edit form
- **list** - used to display the list of authors in a data table
- **page** - used for page specific components like heading and wrapper

### Data

- **get-posts-authors** - fetches the list of posts authors from Supabase

### Hooks

**use-create-form** - the create form hook using React Hook Form
**use-edit-form** - the edit form hook using React Hook Form

### Schemas

- **form** - used for the posts author form validation
- **authors-list** - used for the posts authors list

### Store

- **posts-authors-store** - Zustand store containing the state and actions for the posts authors route
