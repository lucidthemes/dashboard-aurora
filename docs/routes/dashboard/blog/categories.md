# Posts - categories

## Overview

The posts categories route displays the list of created categories and allows for actions like create, edit, and delete

## Route

`/posts/categories`

## Source

- [View on GitHub](<https://github.com/lucidthemes/dashboard-aurora/tree/main/src/app/(dashboard)/(blog)/posts/(routes)/categories>)

## Responsibilities

- Display a list of categories
- Allow categories to be created, edited, and deleted
- Provide search by category name
- Handle pagination
- Handle changing the sort order
- Handle changing the number of items shown per page

## User flow

1. User navigates to `/posts/categories`
2. Categories are fetched from the database using suspense to show a loading spinner
3. Results are displayed in the data table

### Create category

1. User clicks create category
2. Sheet is opened with create category form
3. User clicks the create category button to submit the form
4. Form is validated and a new category created
5. Posts categories route is revalidated to show updated data table

### Edit category

1. User clicks edit category
2. Sheet is opened with edit category form
3. User clicks the save changes button to submit the form
4. Form is validated and category is updated
5. Posts categories route is revalidated to show updated data table

### Delete category

1. User clicks delete category
2. Delete category confirmation dialog is shown with the option to cancel or delete the category
   1. Delete
      1. Category is deleted
      2. Posts categories route is revalidated to show updated data table
   2. Cancel - delete dialog closed and category not deleted

## Structure

### Actions

- **create-post-category** - action used to create a new post category
- **update-post-category** - action used to update an existing post category

### Components

- **form** - used to display the category edit form
- **list** - used to display the list of categories in a data table
- **page** - used for page specific components like heading and wrapper

### Data

- **get-posts-categories** - fetches the list of posts categories from Supabase

### Hooks

**use-create-form** - the create form hook using React Hook Form
**use-edit-form** - the edit form hook using React Hook Form

### Schemas

- **form** - used for the posts category form validation
- **categories-list** - used for the posts categories list

### Store

- **posts-categories-store** - Zustand store containing the state and actions for the posts categories route
