# Posts - tags

## Overview

The posts tags route displays the list of created tags and allows for actions like create, edit, and delete

## Route

`/posts/tags`

## Source

- [View on GitHub](<https://github.com/lucidthemes/dashboard-aurora/tree/main/src/app/(dashboard)/(blog)/posts/(routes)/tags>)

## Responsibilities

- Display a list of tags
- Allow tags to be created, edited, and deleted
- Provide search by tag name
- Handle pagination
- Handle changing the sort order
- Handle changing the number of items shown per page

## User flow

1. User navigates to `/posts/tags`
2. Tags are fetched from the database using suspense to show a loading spinner
3. Results are displayed in the data table

### Create tag

1. User clicks create tag
2. Sheet is opened with create tag form
3. User clicks the create tag button to submit the form
4. Form is validated and a new tag created
5. Posts tags route is revalidated to show updated data table

### Edit tag

1. User clicks edit tag
2. Sheet is opened with edit tag form
3. User clicks the save changes button to submit the form
4. Form is validated and tag is updated
5. Posts tags route is revalidated to show updated data table

### Delete tag

1. User clicks delete tag
2. Delete tag confirmation dialog is shown with the option to cancel or delete the tag
   1. Delete
      1. Tag is deleted
      2. Posts tags route is revalidated to show updated data table
   2. Cancel - delete dialog closed and tag not deleted

## Structure

### Actions

- **create-post-tag** - action used to create a new post tag
- **update-post-tag** - action used to update an existing post tag

### Components

- **form** - used to display the tag edit form
- **list** - used to display the list of tags in a data table
- **page** - used for page specific components like heading and wrapper

### Data

- **get-posts-tags** - fetches the list of posts tags from Supabase

### Hooks

**use-create-form** - the create form hook using React Hook Form
**use-edit-form** - the edit form hook using React Hook Form

### Schemas

- **form** - used for the posts tag form validation
- **tags-list** - used for the posts tags list

### Store

- **posts-tags-store** - Zustand store containing the state and actions for the posts tags route
