# Database

## Overview

The application uses Supabase/Postgres as its database.

## Schema

Brief explanation of the main entities and how they relate.

[Database schema diagram/image]

For the complete generated schema, see [`schema.md`](./schema.md).

## Key relationships

Explain the important relationships:

- A post belongs to an author.
- A post can belong to multiple categories.
- A post can have multiple tags.
- Comments belong to a post.
- ...

## Row Level Security

Explain your RLS policies and why they're configured that way.

## Migrations

Explain how schema changes are managed and deployed.

## Tables

### Posts

#### Structure

Stores blog posts.

| Column   | Type   | Description             |
| -------- | ------ | ----------------------- |
| `id`     | `uuid` | Unique identifier       |
| `title`  | `text` | Post title              |
| `slug`   | `text` | URL-friendly identifier |
| `status` | `...`  | Publication status      |
| ...      | ...    | ...                     |

#### RLS policies

| Name | Command | Applied to |
| ---- | ------- | ---------- |

### `posts`

| Policy                                    | Command | Roles         | USING                            | WITH CHECK                       |
| ----------------------------------------- | ------- | ------------- | -------------------------------- | -------------------------------- |
| `Enable read access for all users`        | SELECT  | public        | `true`                           | —                                |
| `Admin and editor users can create posts` | INSERT  | authenticated | —                                | `is_admin_or_editor(auth.uid())` |
| `Admin and editor users can update posts` | UPDATE  | authenticated | `is_admin_or_editor(auth.uid())` | `is_admin_or_editor(auth.uid())` |
| `Admin and editor users can delete posts` | DELETE  | authenticated | `is_admin_or_editor(auth.uid())` | —                                |

### Categories

...

### Products

...
