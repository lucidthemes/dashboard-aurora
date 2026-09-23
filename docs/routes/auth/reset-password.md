# Reset password

## Overview

The reset password route displays the auth reset password form

## Route

`/auth/reset-password`

## Source

- [View on GitHub](https://github.com/lucidthemes/dashboard-aurora/tree/main/src/app/auth/reset-password)

## Responsibilities

- Display a form with a password field
- Validate submitted form data on form submission
- Create update user Supabase event with new password

## User flow

1. User receives an email with a link to reset the password
2. User clicks on the link and navigates to `/auth/forgot-password`
3. Enters password into form field and submits form
4. Supabase auth user is updated with the new password

## Structure

The route contains the following files:

- **form** - the form component
- **use-form** - the form hook using React Hook Form
- **reset-password.schema** - the schema used for the form field
- **reset-password.action** - the action used when the form is successfully submitted
