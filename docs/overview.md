# Documentation: Dashboard - Aurora

## Overview

A Next.js dashboard featuring pages, blog posts, products, orders, customers, media, sidebars, users, logs, and more. Designed to be used as the dashboard for our Aurora frontend site project [here](https://github.com/lucidthemes/aurora-sb)

## Structure

### Public

The public folder contains images used for the header logo and login page.

### Src

The main src folder is split into the following folders:

#### Actions

The actions folder contains the following actions:

- **delete-dialog** - used with the delete dialog throughout the app to delete data using a passed through table name and row id
- **supabase-upload** - used with the Supabase dropzone to upload files to the Supabase storage bucket

#### App

The app folder is split into two folders of auth and dashboard:

##### Auth

The documentation for each route within the auth folder:

- [Login](https://github.com/lucidthemes/dashboard-aurora/blob/main/docs/routes/auth/login.md)
- [Forgot password](https://github.com/lucidthemes/dashboard-aurora/blob/main/docs/routes/auth/forgot-password.md)
- [Reset password](https://github.com/lucidthemes/dashboard-aurora/blob/main/docs/routes/auth/reset-password.md)

##### Dashboard

The documentation for each route within the dashboard route group folder:

- [Admin](https://github.com/lucidthemes/dashboard-aurora/blob/main/docs/routes/dashboard/admin/overview.md)
- [Blog](https://github.com/lucidthemes/dashboard-aurora/blob/main/docs/routes/dashboard/blog/overview.md)
- [Pages](https://github.com/lucidthemes/dashboard-aurora/blob/main/docs/routes/dashboard/pages/overview.md)
- [Account](https://github.com/lucidthemes/dashboard-aurora/blob/main/docs/routes/dashboard/account.md)
- [Customers](https://github.com/lucidthemes/dashboard-aurora/blob/main/docs/routes/dashboard/customers.md)
- [Instagram feed](https://github.com/lucidthemes/dashboard-aurora/blob/main/docs/routes/dashboard/instagram-feed.md)
- [Media](https://github.com/lucidthemes/dashboard-aurora/blob/main/docs/routes/dashboard/media.md)
- [Sidebars](https://github.com/lucidthemes/dashboard-aurora/blob/main/docs/routes/dashboard/sidebars.md)

#### Components

The components folder contains the following components:

- **Dialogs** - used for delete and edit dialogs
- **[Editor](https://github.com/lucidthemes/dashboard-aurora/blob/main/docs/components/editor.md)** - used for the single page and single post routes
- **List** - used to create the data table used throughout the app and includes controls, pagination, filters, search, and sort
- **Sheets** - used for the content and form sheets throughout the app
- **[ui](https://github.com/lucidthemes/dashboard-aurora/blob/main/docs/components/ui.md)** - shadcn components used throughout app
- **Buttons** - used to create buttons throughout the app which are wrappers for the shadcn button component
- **Dropzone** - Supabase dropzone component for uploading media
- **Loading** - the loading spinner used throughout the app
- **Page-headings** - the page headings used throughout the app
- **Query-client-provider** - enables the use of Tanstack query within the app
- **Theme-provider** - used for the light and dark theme mode options

#### Hooks

The hooks folder contains the following hooks:

- **use-mobile** - used to determine if the app is being viewed on mobile or not by checking the size of the window
- **use-supabase-upload** - used for the Supabase dropzone upload component used on the media page

#### Lib

The lib folder contains the following files:

- **Supabase** - Supabase functions used to create a client, create an admin client, create a server client, fetch current user with role, and fetch Supabase public storage URL
- **Formatters** - date formatters
- **Metadata** - default metadata for app used as a default for pages with no metadata set
- **Utils** - cn function used by shadcn to concatenate CSS class names

#### Schemas

The schemas folder contains the following Zod schemas:

- **Page** - used within the editor when creating/editing pages and also with the pages route list
- **Post** - used within the editor when creating/editing posts and also with the posts route list
- **Customer** - used within the customers route list
- **Media** - used when fetching media on the media route, Instagram feed route, sidebars route, and editor

## Deployment

### Pull requests

Deploys to: [staging](https://dashboard-aurora-sb-staging.vercel.app/)

Process:

1. Open pull request
2. Workflow: [CI (pull request)](https://github.com/lucidthemes/dashboard-aurora/blob/main/.github/workflows/ci-pr.yml)
   - Success - can proceed
   - Fail - can't proceed
3. Merge branch into main
4. Workflow: [Deploy to Staging](https://github.com/lucidthemes/dashboard-aurora/blob/main/.github/workflows/deploy-staging.yml)

### Releases

Deploys to: [production](https://dashboard-aurora-sb.vercel.app/)

Process:

1. Create new tag for version of app
2. Open pull request
3. Workflow: [CI (pull request)](https://github.com/lucidthemes/dashboard-aurora/blob/main/.github/workflows/ci-pr.yml)
   - Success - can proceed
   - Fail - can't proceed
4. Merge branch into main
5. Create a new release from the tag
6. Publish the new release
7. Workflow: [Deploy to Production](https://github.com/lucidthemes/dashboard-aurora/blob/main/.github/workflows/deploy-production.yml)
