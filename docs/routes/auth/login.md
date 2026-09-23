# Login

## Overview

The login route displays the auth login form

## Route

`/auth/login`

## Source

- [View on GitHub](https://github.com/lucidthemes/dashboard-aurora/tree/main/src/app/auth/login)

## Responsibilities

- Display a form with email and password fields
- Validate submitted form data on form submission
- If successful sign in, redirect user to the dashboard
- If unsuccessful sign in, show an error message to the user

## User flow

1. User navigates to `/auth/login`
2. Enters email and password into form fields and submits form
3. Supabase auth sign in response:
   1. Success - user is redirected to the dashboard
   2. Error - user is shown an error

## Structure

The route contains the following files:

- **form** - the form component
- **use-form** - the form hook using React Hook Form
- **login.schema** - the schema used for the form field
- **sign-in.action** - the action used when the form is successfully submitted
