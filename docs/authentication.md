# Authentication

## Overview

The dashboard uses Supabase auth to manage authentication and user sessions. Authentication is required to access the dashboard.

## Authentication flow

1. User navigates to the login page
2. Credentials are submitted
3. Supabase auth validates the credentials
4. A session is established
5. The user is redirected to the dashboard
6. Subsequent requests use the authenticated session

## User roles

The dashboard has three different user roles: customer, editor, and admin. The role of customer is applied by default to new users that sign up on the frontend site and those users do not have access to the dashboard. Only user accounts with the role of editor or admin can log into the dashboard.

## Route protection

Once a user with the role of editor or admin has logged in, most routes within the dashboard are accessible.

There are two protected admin only routes within the dashboard of users and logs. These routes use a function called getUserWithRole which fetches the role for the currently authenticated user and checks that they have the role of admin. A user without the admin role that tries to access those routes is redirected.

## Action protection

When an server action happens, such as creating, editing, or deleting data, the user role is checked again using the function getUserWithRole to make sure that the user has the correct role for that action. If the user doesn't have the correct role, the action is stopped and an error is returned to the user.
