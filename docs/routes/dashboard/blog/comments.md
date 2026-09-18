# Posts - comments

## Overview

The posts comments route displays the list of submitted comments and allows for actions like accept and reject

## Route

`/posts/comments`

## Source

- [View on GitHub](<https://github.com/lucidthemes/dashboard-aurora/tree/main/src/app/(dashboard)/(blog)/posts/(routes)/comments>)

## Responsibilities

- Display a list of comments
- Allow comments to be approved or rejected
- Provide search by comment name
- Provide filtering by status
- Handle pagination
- Handle changing the sort order
- Handle changing the number of items shown per page

## User flow

1. User navigates to `/posts/comments`
2. Comments are fetched from the database using suspense to show a loading spinner
3. Results are displayed in the data table

### Approve comment

1. User clicks approve comment
2. Comment is approved and status updated to approved
3. Posts comments route is revalidated to show updated data table

### Reject comment

1. User clicks reject comment
2. Comment is rejected and status updated to rejected
3. Posts comments route is revalidated to show updated data table

## Structure

### Actions

- **approve-post-comment** - action used to approve a comment
- **reject-post-comment** - action used to reject a comment

### Components

- **filters** - used to display the comments list data table filters
- **list** - used to display the list of comments in a data table

### Data

- **get-posts-comments** - fetches the list of posts comments from Supabase

### Schemas

- **actions** - used for the approve and reject actions
- **comments-list** - used for the posts comments list
