# Account

## Overview

The account route displays current profile information and allows for actions like changing name, email, and password

## Route

`/account`

## Source

- [View on GitHub](<https://github.com/lucidthemes/dashboard-aurora/tree/main/src/app/(dashboard)/account>)

## Responsibilities

- Display a user account information
- Allow name to be updated
- Allow email to be updated
- Allow password to be updated
- Allow appearance option to be changed
- Allow user account to be deleted

## User flow

1. User navigates to `/account`
2. Current account information is shown

### Update name

1. User clicks update name
2. Form is shown with fields to update name
3. User clicks the save changes button
4. Form validated and user name is updated

### Update email

1. User clicks update email
2. Form is shown with a field to update email
3. User clicks the save changes button
4. Form validated and user email is updated

### Update password

1. User clicks update password
2. Form is shown with fields to update password
3. User clicks the save changes button
4. Form validated and user password is updated

### Update appearance

1. User clicks the appearance option they prefer - light, dark, or system
2. App theme appearance is updated
3. App styling updates to reflect selection

### Delete account

1. User clicks delete account
2. Delete tag confirmation dialog is shown with the option to cancel or delete the account
   1. Delete
      1. User is required to type "DELETE" into the form to confirm the action
      2. Form is validated to check the user confirmed the action
      3. User account is deleted
      4. User auth session is deleted and the user will be redirected to the login page
   2. Cancel - delete dialog closed and account not deleted

## Structure

### Actions

- **delete-account** - action used to delete a user account
- **edit-email** - action used to update a users email
- **edit-name** - action used to update a users name
- **edit-password** - action used to update a users password

### Components

**appearance** - the update appearance form components
**delete** - the delete account form components
**email** - the update email form components
**name** - the update name form components
**password** - the update password form components

### Hooks

**delete** - the delete account form hook using React Hook Form
**email** - the update email form hook using React Hook Form
**name** - the update name form hook using React Hook Form
**password** - the update password form hook using React Hook Form

### Schemas

- **actions** - used for the delete account action
- **delete-form** - used for the delete account form validation
- **email-form** - used for the update email form validation
- **name-form** - used for the update name form validation
- **password-form** - used for the update password form validation
