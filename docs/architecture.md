# Architecture

## Frontend

The frontend of the dashboard app is built using the following:

- **Next.js** - the React framework used. The dashboard is built on the newer Next.js App Router which supports server components instead of the older Pages Router
- **TypeScript** - the primary language used
- **Tailwind CSS** - the CSS framework used
- **Shadcn** - the UI component library used
- **Zod** - the validation library used to create schemas and types
- **Zustand** - the state management library used
- **TanStack Query (React query)** - library used for client component data fetching
- **TanStack Table (React Table)** - library used for data tables
- **React Hook Form** - library used for forms
- **dnd kit** - drag and drop library used within the editor
- **Floating UI** - library used to position floating elements used within the editor
- **DOMPurify** - used for editor block content sanitization within client components
- **Isomorphic DOMPurify** - used for editor block content sanitization within server components

## Database

The dashboard uses a Postgres database that is hosted on [Supabase](https://supabase.com/database)

The docs for the dashboard database structure can be found [here](https://github.com/lucidthemes/dashboard-aurora/blob/main/docs/database.md)

## Authentication

The dashboard uses [Supabase Auth](https://supabase.com/auth) for user authentication and sessions

The docs for the dashboard authentication can be found [here](https://github.com/lucidthemes/dashboard-aurora/blob/main/docs/authentication.md)

## Storage

The dashboard uses [Supabase storage](https://supabase.com/storage) for the storage of media - images and videos

## Data

### Fetching

Data is fetched within the dashboard in both server and client components:

- **Server** - Routes that load initial data, such as pages or posts, fetch the data from Supabase in a server component. That component is wrapped in React suspense to show a loading spinner whilst the data is being fetched. Once the data is fetched, it gets passed to a component to display the data, such as the pages list or posts list.

- **Client** - Routes that have data which needs to be loaded after the initial page, normally when the user interacts with something, is done using TanStack query. An example of this being within the editor there are sections within the settings sidebar for categories, tags, and related posts. Those sections are only loaded when a user clicks on that section within the sidebar. Each data fetching query provided by TanStack query has a cache key which will show cached results if the same query is run again. TanStack query also provides the pagination used on multiple routes and the infinite query used within the media overlay for the load more button.

### Updating

Data is updated primarily using TanStack query mutations. Most routes that have data which can be updated use forms provided by React Hook Form and when the submit button is clicked by the user, the data is passed through to a mutation function which then passes it to the relevant server action.

### Validation

Zod schemas are used to validate data both when it's fetched and updated using actions:

- **Fetching** - after data has been fetched from Supabase, it passes through a Zod schema to ensure that it correctly matches the expected structure. If it doesn't pass the schema parse, an error will be returned.
- **Actions** - when a server action happens, such as creating, editing, or deleting data, the data is first parsed through a Zod schema to ensure that it validates correctly. The schema used within the action is typically the same schema used to validate the data when it was fetched. If the schema parse within the action doesn't succeed, the action is stopped and an error is returned.
