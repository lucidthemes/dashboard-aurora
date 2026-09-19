# Blog

## Overview

The blog route group folder is split into two route folders:

- **Posts** - outputs the list of created posts and also contains the following sub routes:
  - **Authors** - outputs the list authors
  - **Categories** - outputs the list categories
  - **Comments** - outputs the list comments
  - **Tags** - outputs the list tags
- **Post** - create/edit a post using the editor

## Posts

### Route

`/posts`

### Docs

- [View docs](https://github.com/lucidthemes/dashboard-aurora/blob/main/docs/routes/dashboard/blog/posts.md)

### Source

- [View on GitHub](<https://github.com/lucidthemes/dashboard-aurora/tree/main/src/app/(dashboard)/(blog)/posts>)

## Posts - authors

### Route

`/posts/authors`

### Docs

- [View docs](https://github.com/lucidthemes/dashboard-aurora/blob/main/docs/routes/dashboard/blog/authors.md)

### Source

- [View on GitHub](<https://github.com/lucidthemes/dashboard-aurora/tree/main/src/app/(dashboard)/(blog)/posts/(routes)/authors>)

## Posts - categories

### Route

`/posts/categories`

### Docs

- [View docs](https://github.com/lucidthemes/dashboard-aurora/blob/main/docs/routes/dashboard/blog/categories.md)

### Source

- [View on GitHub](<https://github.com/lucidthemes/dashboard-aurora/tree/main/src/app/(dashboard)/(blog)/posts/(routes)/categories>)

## Posts - comments

### Route

`/posts/comments`

### Docs

- [View docs](https://github.com/lucidthemes/dashboard-aurora/blob/main/docs/routes/dashboard/blog/comments.md)

### Source

- [View on GitHub](<https://github.com/lucidthemes/dashboard-aurora/tree/main/src/app/(dashboard)/(blog)/posts/(routes)/comments>)

## Posts - tags

### Route

`/posts/tags`

### Docs

- [View docs](https://github.com/lucidthemes/dashboard-aurora/blob/main/docs/routes/dashboard/blog/tags.md)

### Source

- [View on GitHub](<https://github.com/lucidthemes/dashboard-aurora/tree/main/src/app/(dashboard)/(blog)/posts/(routes)/tags>)

## Post

### Routes

The route for the single post depends on the action, the edit action requires the UUID of the post being edited.

For example:

- **Create** - `/post?action=create`
- **Edit** - `/post?action=edit&id=12345`

### Docs

- [View docs](https://github.com/lucidthemes/dashboard-aurora/blob/main/docs/routes/dashboard/blog/page.md)

### Source

- [View on GitHub](<https://github.com/lucidthemes/dashboard-aurora/tree/main/src/app/(dashboard)/(blog)/post>)
