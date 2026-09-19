# Authentication

## Overview

The application uses Supabase Auth to manage authentication and user
sessions. Authentication is required to access the dashboard, while
the public-facing blog and shop remain accessible without signing in.

## Authentication flow

Describe the lifecycle:

1. User navigates to the login page.
2. Credentials are submitted.
3. Supabase Auth validates the credentials.
4. A session is established.
5. The user is redirected to the dashboard.
6. Subsequent requests use the authenticated session.

## User roles

admin
editor
customer

explain what each role can do.

## Session management

Explain how you retrieve and maintain the authenticated user's session.

For example:

- Where the Supabase client is created
- How server-side authentication is handled
- How client-side authentication is handled, if applicable
- How sessions are refreshed
- How expired sessions are handled

## Route protection

Explain how protected routes are enforced.

### Public routes

- `/`
- `/blog`
- `/shop`

### Protected routes

- `/dashboard`
- `/dashboard/posts`
- `/dashboard/products`
- ...

Explain where the protection occurs and what happens when an
unauthenticated user attempts to access a protected route.

## Authorization

Explain the distinction between authentication and authorization.

Describe how the application determines what an authenticated user
is allowed to do.

## Database security

Explain how Supabase Row Level Security (RLS) works alongside
authentication.

For example:

- Which tables have RLS enabled
- How authenticated users are identified
- What policies allow or deny
  operations
- Whether the application relies on RLS, server-side checks, or both

## Logout

Describe how users sign out and how the session is invalidated.

## Error handling

Explain how authentication errors are presented to the user and how
invalid/expired sessions are handled.

## Environment variables

List the environment variables required by the application, without
including their values.

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Security considerations

Briefly document important security decisions and constraints.
