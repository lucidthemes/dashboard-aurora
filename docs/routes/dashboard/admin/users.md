# Users

## Overview

The users route displays the list of users and allows for actions like create, edit, and delete

## Route

`/users`

## Source

- [View on GitHub](<https://github.com/lucidthemes/dashboard-aurora/tree/main/src/app/(dashboard)/(admin)/users>)

## Responsibilities

- Display a list of users
- Allow users to be created, edited, deleted, and viewed
- Provide search by user ID or email address
- Provide filtering by role
- Handle pagination
- Handle changing the sort order
- Handle changing the number of items shown per page

## User flow

1. User navigates to `/users`
2. Users are fetched from the database using suspense to show a loading spinner
3. Results are displayed in the data table

### Create user

1. User clicks create user
2. Sheet is opened with create user form
3. User clicks the create user button to submit the form
4. Form is validated and an email is sent to the submitted email address to accept the new user invite

### Edit user

1. User clicks edit user
2. Sheet is opened with edit user form
3. User clicks the save changes button to submit the form
4. Form is validated and user is updated
5. Users route is revalidated to show updated data table

### Delete user

1. User clicks delete user
2. Delete user confirmation dialog is shown with the option to cancel or delete the user
   1. Delete
      1. User is deleted
      2. Users route is revalidated to show updated data table
   2. Cancel - delete dialog closed and user not deleted

### View user

1. User clicks view user
2. Sheet is opened with tabs showing user details and logs

## Structure

### Actions

- **create-user** - action used to create a new user
- **delete-user** - action used to delete a user
- **update-user** - action used to update an existing user

### Components

- **dialogs** - the user delete dialog components
- **list** - used to display the list of users in a data table
- **page** - used for page specific components like heading and wrapper
- **sheets** - the user create, edit, and view sheet components

### Data

- **get-logs** - fetches the list of logs for a specific user from Supabase
- **get-users** - fetches the list of users from Supabase

### Hooks

**use-create-form** - the create form hook using React Hook Form
**use-edit-form** - the edit form hook using React Hook Form
**use-logs** - used to fetch logs for a specific user

### Schemas

- **actions** - used for the users create, update, and delete actions
- **sheets** - used for the users create/edit forms validation
- **users-list** - used for the users list

### Store

- **users-store** - Zustand store containing the state and actions for the users route
