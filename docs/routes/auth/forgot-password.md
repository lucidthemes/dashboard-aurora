# Forgot password

## Overview

The forgot password route displays the auth forgot password form

## Route

`/auth/forgot-password`

## Source

- [View on GitHub](https://github.com/lucidthemes/dashboard-aurora/tree/main/src/app/auth/forgot-password)

## Responsibilities

- Display a form with an email field
- Validate submitted form data on form submission
- Create reset Supabase auth password event

## User flow

1. User navigates to `/auth/forgot-password`
2. Enters email into form field and submits form
3. Reset password email sent to the email that the user submitted

## Structure

The route contains the following files:

- **form** - the form component
- **use-form** - the form hook using React Hook Form
- **forgot-password.schema** - the schema used for the form field
- **forgot-password.action** - the action used when the form is successfully submited
