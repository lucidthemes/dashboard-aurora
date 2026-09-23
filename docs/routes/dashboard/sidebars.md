# Sidebars

## Overview

The sidebars route displays the list of created sidebars and allows for actions like create, edit, and delete

## Route

`/sidebars`

## Source

- [View on GitHub](<https://github.com/lucidthemes/dashboard-aurora/tree/main/src/app/(dashboard)/sidebars>)

## Responsibilities

- Display a list of sidebars
- Allow posts to be created, edited, and deleted
- Provide search by sidebar ID, name, or title
- Handle pagination
- Handle changing the sort order
- Handle changing the number of items shown per page

## User flow

1. User navigates to `/sidebars`
2. Sidebars are fetched from the database using suspense to show a loading spinner
3. Results are displayed in the data table

### Create sidebar

1. User clicks create sidebar
2. Sheet is opened with create sidebar form
3. User clicks the create sidebar button to submit the form
4. Form is validated and a new sidebar created
5. Sidebars route is revalidated to show updated data table

### Edit sidebar

1. User clicks edit sidebar
2. Sheet is opened with edit sidebar form
3. User clicks the save changes button to submit the form
4. Form is validated and sidebar is updated
5. Sidebars route is revalidated to show updated data table

### Delete sidebar

1. User clicks delete sidebar
2. Delete sidebar confirmation dialog is shown with the option to cancel or delete the sidebar
   1. Delete
      1. Sidebar is deleted
      2. Sidebars route is revalidated to show updated data table
   2. Cancel - delete dialog closed and sidebar not deleted

## Structure

### Actions

- **create-sidebar** - action used to create a new sidebar
- **update-sidebar** - action used to update an existing sidebar

### Components

- **form** - used to display the sidebar edit form
- **list** - used to display the list of sidebars in a data table
- **page** - used for page specific components like heading and wrapper

### Data

- **get-sidebars** - fetches the list of sidebars from Supabase

### Hooks

**use-create-form** - the create form hook using React Hook Form
**use-edit-form** - the edit form hook using React Hook Form
**use-form-widgets-media** - the hook used for the media overlay
**use-form-widgets** - the hook used for the form widgets

### Schemas

- **form** - used for the sidebar form validation and sidebar form widgets
- **list** - used for the sidebars list

### Store

- **sidebars-store** - Zustand store containing the state and actions for the sidebars route
