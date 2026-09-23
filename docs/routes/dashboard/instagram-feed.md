# Instagram feed

## Overview

The Instagram feed route displays the list of created feeds and allows for actions like create, edit, and delete

## Route

`/instagram-feed`

## Source

- [View on GitHub](<https://github.com/lucidthemes/dashboard-aurora/tree/main/src/app/(dashboard)/instagram-feed>)

## Responsibilities

- Display a list of Instagram feeds
- Allow feeds to be created, edited, and deleted
- Provide search by feed ID or name
- Handle pagination
- Handle changing the sort order
- Handle changing the number of items shown per page

## User flow

1. User navigates to `/instagram-feed`
2. Feeds are fetched from the database using suspense to show a loading spinner
3. Results are displayed in the data table

### Create feed

1. User clicks create feed
2. Sheet is opened with create feed form
3. User clicks the create feed button to submit the form
4. Form is validated and a new feed created
5. Instagram feed route is revalidated to show updated data table

### Edit feed

1. User clicks edit feed
2. Sheet is opened with edit feed form
3. User clicks the save changes button to submit the form
4. Form is validated and feed is updated
5. Instagram feed route is revalidated to show updated data table

### Delete feed

1. User clicks delete feed
2. Delete feed confirmation dialog is shown with the option to cancel or delete the feed
   1. Delete
      1. Feed is deleted
      2. Instagram feed route is revalidated to show updated data table
   2. Cancel - delete dialog closed and feed not deleted

## Structure

### Actions

- **create-feed** - action used to create a new feed
- **update-feed** - action used to update an existing feed

### Components

- **form** - the Instagram feed form components
- **list** - used to display the list of Instagram feeds in a data table
- **page** - used for page specific components like heading and wrapper

### Data

- **get-feeds** - fetches the list of Instagram feeds from Supabase
- **get-form-images** - fetches the list of images for a feed from Supabase to use in the form
- **get-form-media** - fetches the list of media from Supabase to use in the form

### Hooks

**use-create-form** - the create form hook using React Hook Form
**use-edit-form** - the edit form hook using React Hook Form
**use-form-images** - the hook used for the Instagram feed images
**use-form-media** - the hook used for the media overlay

### Schemas

- **feed** - used for the Instagram feed validation
- **form** - used for the Instagram feed form validation

### Store

- **instagram-feed-store** - Zustand store containing the state and actions for the Instagram feed route
