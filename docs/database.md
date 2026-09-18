# Database

## Overview

The dashboard uses a Postgres database that is hosted on Supabase

## Schema

The generated schema can be viewed in full [here](https://github.com/lucidthemes/dashboard-aurora/blob/main/docs/schema.png).

## Row Level Security

Every table has RLS enabled on them for SELECT, INSERT, UPDATE, and DELETE commands.

The majority of tables have the role public for the SELECT command except certain dashboard routes that are admin only, such as the users and logs routes.

The commands of INSERT, UPDATE, and DELETE within the dashboard require the role of authenticated. Two functions are also used within the dashboard to check whether the currently authenticated user has the correct user role for the command. These functions are:

- **is_admin_or_editor** - checks whether an authenticated user has a user role of either admin or editor. This is the main function used as the majority of the dashboard can be used by either an admin or editor user.
- **is_admin** - checks whether an authenticated user has the user role of admin. Used on the admin only routes like users and logs.

## Migrations

Schema changes are made using migrations through the Supabase CLI. These migrations are deployed to the staging and production sites using GitHub actions workflows.

## Custom Types / Enums

### Pages status

Used within the pages table

#### Name

`pages_status`

#### Values

`draft` | `published`

### Posts status

Used within the posts table

#### Name

`posts_status`

#### Values

`draft` | `published`

### Posts comments status

Used within the posts comments table

#### Name

`posts_comments_status`

#### Values

`approved` | `pending` | `rejected`

### User role

Used within the user roles table

#### Name

`user_role`

#### Values

`customer` | `admin` | `editor`

### Log source

Used within the logs table

#### Name

`log_source`

#### Values

`frontend` | `dashboard`

## Tables

### Pages

Stores pages

#### Name

`pages`

#### Columns

| Name         | Type           | Constraints |
| ------------ | -------------- | ----------- |
| `options`    | `jsonb`        | Nullable    |
| `title`      | `text`         |             |
| `slug`       | `text`         | Unique      |
| `content`    | `jsonb`        | Nullable    |
| `id`         | `uuid`         | Primary     |
| `status`     | `pages_status` |             |
| `created_at` | `timestamptz`  | Nullable    |
| `updated_at` | `timestamptz`  | Nullable    |

#### RLS policies

| Policy                                    | Command | Roles         | USING                            | WITH CHECK                       |
| ----------------------------------------- | ------- | ------------- | -------------------------------- | -------------------------------- |
| `Enable read access for all users`        | SELECT  | public        | `true`                           | —                                |
| `Admin and editor users can create pages` | INSERT  | authenticated | —                                | `is_admin_or_editor(auth.uid())` |
| `Admin and editor users can update pages` | UPDATE  | authenticated | `is_admin_or_editor(auth.uid())` | `is_admin_or_editor(auth.uid())` |
| `Admin and editor users can delete pages` | DELETE  | authenticated | `is_admin_or_editor(auth.uid())` | —                                |

### Posts

Stores blog posts

#### Name

`posts`

#### Columns

| Name         | Type           | Constraints |
| ------------ | -------------- | ----------- |
| `options`    | `jsonb`        | Nullable    |
| `title`      | `text`         |             |
| `slug`       | `text`         | Unique      |
| `author_id`  | `uuid`         |             |
| `media_id`   | `uuid`         |             |
| `excerpt`    | `text`         | Nullable    |
| `content`    | `jsonb`        | Nullable    |
| `id`         | `uuid`         | Primary     |
| `status`     | `posts_status` |             |
| `created_at` | `timestamptz`  | Nullable    |
| `updated_at` | `timestamptz`  | Nullable    |

#### RLS policies

| Policy                                    | Command | Roles         | USING                            | WITH CHECK                       |
| ----------------------------------------- | ------- | ------------- | -------------------------------- | -------------------------------- |
| `Enable read access for all users`        | SELECT  | public        | `true`                           | —                                |
| `Admin and editor users can create posts` | INSERT  | authenticated | —                                | `is_admin_or_editor(auth.uid())` |
| `Admin and editor users can update posts` | UPDATE  | authenticated | `is_admin_or_editor(auth.uid())` | `is_admin_or_editor(auth.uid())` |
| `Admin and editor users can delete posts` | DELETE  | authenticated | `is_admin_or_editor(auth.uid())` | —                                |

### Post categories

Stores blog post categories

#### Name

`post_categories`

#### Columns

| Name          | Type          | Constraints |
| ------------- | ------------- | ----------- |
| `name`        | `text`        |             |
| `slug`        | `text`        | Unique      |
| `description` | `text`        | Nullable    |
| `id`          | `uuid`        | Primary     |
| `created_at`  | `timestamptz` | Nullable    |

#### RLS policies

| Policy                                              | Command | Roles         | USING                            | WITH CHECK                       |
| --------------------------------------------------- | ------- | ------------- | -------------------------------- | -------------------------------- |
| `Admin and editor users can delete post categories` | DELETE  | authenticated | `is_admin_or_editor(auth.uid())` | —                                |
| `Enable read access for all users`                  | SELECT  | public        | `true`                           | —                                |
| `Admin and editor users can create post categories` | INSERT  | authenticated | —                                | `is_admin_or_editor(auth.uid())` |
| `Admin and editor users can update post categories` | UPDATE  | authenticated | `is_admin_or_editor(auth.uid())` | `is_admin_or_editor(auth.uid())` |

### Post tags

Stores blog post tags

#### Name

`post_tags`

#### Columns

| Name          | Type          | Constraints |
| ------------- | ------------- | ----------- |
| `name`        | `text`        |             |
| `slug`        | `text`        | Unique      |
| `description` | `text`        | Nullable    |
| `id`          | `uuid`        | Primary     |
| `created_at`  | `timestamptz` | Nullable    |

#### RLS policies

| Policy                                        | Command | Roles         | USING                            | WITH CHECK                       |
| --------------------------------------------- | ------- | ------------- | -------------------------------- | -------------------------------- |
| `Enable read access for all users`            | SELECT  | public        | `true`                           | —                                |
| `Admin and editor users can create post tags` | INSERT  | authenticated | —                                | `is_admin_or_editor(auth.uid())` |
| `Admin and editor users can update post tags` | UPDATE  | authenticated | `is_admin_or_editor(auth.uid())` | `is_admin_or_editor(auth.uid())` |
| `Admin and editor users can delete post tags` | DELETE  | authenticated | `is_admin_or_editor(auth.uid())` | —                                |

### Post authors

Stores blog post author

#### Name

`post_authors`

#### Columns

| Name          | Type          | Constraints |
| ------------- | ------------- | ----------- |
| `name`        | `text`        |             |
| `slug`        | `text`        | Unique      |
| `description` | `text`        | Nullable    |
| `id`          | `uuid`        | Primary     |
| `created_at`  | `timestamptz` | Nullable    |

#### RLS policies

| Policy                                           | Command | Roles         | USING                            | WITH CHECK                       |
| ------------------------------------------------ | ------- | ------------- | -------------------------------- | -------------------------------- |
| `Enable read access for all users`               | SELECT  | public        | `true`                           | —                                |
| `Admin and editor users can create post authors` | INSERT  | authenticated | —                                | `is_admin_or_editor(auth.uid())` |
| `Admin and editor users can update post authors` | UPDATE  | authenticated | `is_admin_or_editor(auth.uid())` | `is_admin_or_editor(auth.uid())` |
| `Admin and editor users can delete post authors` | DELETE  | authenticated | `is_admin_or_editor(auth.uid())` | —                                |

### Posts categories

Junction table used to store blog post categories assigned to posts

#### Name

`posts_categories`

#### Columns

| Name          | Type   | Constraints |
| ------------- | ------ | ----------- |
| `category_id` | `uuid` |             |
| `id`          | `uuid` | Primary     |
| `post_id`     | `uuid` |             |

#### RLS policies

| Policy                                               | Command | Roles         | USING                            | WITH CHECK                       |
| ---------------------------------------------------- | ------- | ------------- | -------------------------------- | -------------------------------- |
| `Enable read access for all users`                   | SELECT  | public        | `true`                           | —                                |
| `Admin and editor users can create posts categories` | INSERT  | authenticated | —                                | `is_admin_or_editor(auth.uid())` |
| `Admin and editor users can update posts categories` | UPDATE  | authenticated | `is_admin_or_editor(auth.uid())` | `is_admin_or_editor(auth.uid())` |
| `Admin and editor users can delete posts categories` | DELETE  | authenticated | `is_admin_or_editor(auth.uid())` | —                                |

### Posts tags

Junction table used to store blog post tags assigned to posts

#### Name

`posts_tags`

#### Columns

| Name      | Type   | Constraints |
| --------- | ------ | ----------- |
| `tag_id`  | `uuid` |             |
| `id`      | `uuid` | Primary     |
| `post_id` | `uuid` |             |

#### RLS policies

| Policy                                         | Command | Roles         | USING                            | WITH CHECK                       |
| ---------------------------------------------- | ------- | ------------- | -------------------------------- | -------------------------------- |
| `Enable read access for all users`             | SELECT  | public        | `true`                           | —                                |
| `Admin and editor users can create posts tags` | INSERT  | authenticated | —                                | `is_admin_or_editor(auth.uid())` |
| `Admin and editor users can update posts tags` | UPDATE  | authenticated | `is_admin_or_editor(auth.uid())` | `is_admin_or_editor(auth.uid())` |
| `Admin and editor users can delete posts tags` | DELETE  | authenticated | `is_admin_or_editor(auth.uid())` | —                                |

### Posts comments

Stores blog post comments

#### Name

`posts_comments`

#### Columns

| Name         | Type                    | Constraints |
| ------------ | ----------------------- | ----------- |
| `post_id`    | `uuid`                  |             |
| `reply_to`   | `uuid`                  | Nullable    |
| `name`       | `text`                  |             |
| `comment`    | `text`                  |             |
| `id`         | `uuid`                  | Primary     |
| `status`     | `posts_comments_status` |             |
| `created_at` | `timestamptz`           | Nullable    |

#### RLS policies

| Policy                                             | Command | Roles         | USING                            | WITH CHECK                       |
| -------------------------------------------------- | ------- | ------------- | -------------------------------- | -------------------------------- |
| `Enable read access for all users`                 | SELECT  | public        | `true`                           | —                                |
| `Enable insert access for all users`               | INSERT  | public        | —                                | `true`                           |
| `Admin and editor users can update posts comments` | UPDATE  | authenticated | `is_admin_or_editor(auth.uid())` | `is_admin_or_editor(auth.uid())` |
| `Admin and editor users can delete posts comments` | DELETE  | authenticated | `is_admin_or_editor(auth.uid())` | —                                |

### Posts related posts

Junction table used to store blog post related posts assigned to posts

#### Name

`posts_related_posts`

#### Columns

| Name              | Type   | Constraints |
| ----------------- | ------ | ----------- |
| `related_post_id` | `uuid` |             |
| `post_id`         | `uuid` |             |
| `id`              | `uuid` | Primary     |

#### RLS policies

| Policy                                                  | Command | Roles         | USING                            | WITH CHECK                       |
| ------------------------------------------------------- | ------- | ------------- | -------------------------------- | -------------------------------- |
| `Enable read access for all users`                      | SELECT  | public        | `true`                           | —                                |
| `Admin and editor users can create posts related posts` | INSERT  | authenticated | —                                | `is_admin_or_editor(auth.uid())` |
| `Admin and editor users can update posts related posts` | UPDATE  | authenticated | `is_admin_or_editor(auth.uid())` | `is_admin_or_editor(auth.uid())` |
| `Admin and editor users can delete posts related posts` | DELETE  | authenticated | `is_admin_or_editor(auth.uid())` | —                                |

### Customers

Stores customers

#### Name

`customers`

#### Columns

| Name               | Type          | Constraints |
| ------------------ | ------------- | ----------- |
| `id`               | `uuid`        | Primary     |
| `first_name`       | `text`        | Nullable    |
| `last_name`        | `text`        | Nullable    |
| `shipping_address` | `jsonb`       | Nullable    |
| `billing_address`  | `jsonb`       | Nullable    |
| `created_at`       | `timestamptz` | Nullable    |
| `updated_at`       | `timestamptz` | Nullable    |

#### RLS policies

| Policy                                        | Command | Roles         | USING                            | WITH CHECK          |
| --------------------------------------------- | ------- | ------------- | -------------------------------- | ------------------- |
| `Users can manage their own customer profile` | ALL     | public        | `(auth.uid() = id)`              | `(auth.uid() = id)` |
| `Admin and editor users can view customers`   | SELECT  | authenticated | `is_admin_or_editor(auth.uid())` | —                   |

### Media

Stores media

#### Name

`media`

#### Columns

| Name           | Type          | Constraints |
| -------------- | ------------- | ----------- |
| `type`         | `text`        |             |
| `storage_path` | `text`        | Unique      |
| `alt_text`     | `text`        | Nullable    |
| `id`           | `uuid`        | Primary     |
| `created_at`   | `timestamptz` | Nullable    |

#### RLS policies

| Policy                                    | Command | Roles         | USING                            | WITH CHECK                       |
| ----------------------------------------- | ------- | ------------- | -------------------------------- | -------------------------------- |
| `Enable read access for all users`        | SELECT  | public        | `true`                           | —                                |
| `Admin and editor users can upload media` | INSERT  | authenticated | —                                | `is_admin_or_editor(auth.uid())` |
| `Admin and editor users can update media` | UPDATE  | authenticated | `is_admin_or_editor(auth.uid())` | `is_admin_or_editor(auth.uid())` |
| `Admin and editor users can delete media` | DELETE  | authenticated | `is_admin_or_editor(auth.uid())` | —                                |

### Sidebars

Stores sidebars

#### Name

`sidebars`

#### Columns

| Name         | Type          | Constraints |
| ------------ | ------------- | ----------- |
| `id`         | `uuid`        | Primary     |
| `created_at` | `timestamptz` | Nullable    |
| `name`       | `text`        | Unique      |
| `title`      | `text`        |             |
| `widgets`    | `jsonb`       | Nullable    |

#### RLS policies

| Policy                                       | Command | Roles         | USING                            | WITH CHECK                       |
| -------------------------------------------- | ------- | ------------- | -------------------------------- | -------------------------------- |
| `Enable read access for all users`           | SELECT  | public        | `true`                           | —                                |
| `Admin and editor users can create sidebars` | INSERT  | authenticated | —                                | `is_admin_or_editor(auth.uid())` |
| `Admin and editor users can update sidebars` | UPDATE  | authenticated | `is_admin_or_editor(auth.uid())` | `is_admin_or_editor(auth.uid())` |
| `Admin and editor users can delete sidebars` | DELETE  | authenticated | `is_admin_or_editor(auth.uid())` | —                                |

### Instagram feeds

Stores Instagram feeds

#### Name

`instagram_feeds`

#### Columns

| Name         | Type          | Constraints |
| ------------ | ------------- | ----------- |
| `name`       | `text`        |             |
| `id`         | `uuid`        | Primary     |
| `created_at` | `timestamptz` | Nullable    |
| `layout`     | `jsonb`       |             |
| `button`     | `jsonb`       |             |

#### RLS policies

| Policy                                              | Command | Roles         | USING                            | WITH CHECK                       |
| --------------------------------------------------- | ------- | ------------- | -------------------------------- | -------------------------------- |
| `Enable read access for all users`                  | SELECT  | public        | `true`                           | —                                |
| `Admin and editor users can create instagram feeds` | INSERT  | authenticated | —                                | `is_admin_or_editor(auth.uid())` |
| `Admin and editor users can update instagram feeds` | UPDATE  | authenticated | `is_admin_or_editor(auth.uid())` | `is_admin_or_editor(auth.uid())` |
| `Admin and editor users can delete instagram feeds` | DELETE  | authenticated | `is_admin_or_editor(auth.uid())` | —                                |

### Instagram feed media

Junction table used to store media assigned to Instagram feeds

#### Name

`instagram_feed_media`

#### Columns

| Name                | Type   | Constraints |
| ------------------- | ------ | ----------- |
| `instagram_feed_id` | `uuid` |             |
| `media_id`          | `uuid` |             |
| `position`          | `int4` |             |
| `id`                | `uuid` | Primary     |

#### RLS policies

| Policy                                                   | Command | Roles         | USING                            | WITH CHECK                       |
| -------------------------------------------------------- | ------- | ------------- | -------------------------------- | -------------------------------- |
| `Enable read access for all users`                       | SELECT  | public        | `true`                           | —                                |
| `Admin and editor users can create instagram feed media` | INSERT  | authenticated | —                                | `is_admin_or_editor(auth.uid())` |
| `Admin and editor users can delete instagram feed media` | DELETE  | authenticated | `is_admin_or_editor(auth.uid())` | —                                |

### User roles

Stores users with their role

#### Name

`user_roles`

#### Columns

| Name      | Type        | Constraints |
| --------- | ----------- | ----------- |
| `user_id` | `uuid`      |             |
| `role`    | `user_role` |             |
| `id`      | `uuid`      | Primary     |

#### RLS policies

| Policy                              | Command | Roles         | USING                    | WITH CHECK                                           |
| ----------------------------------- | ------- | ------------- | ------------------------ | ---------------------------------------------------- |
| `Users can read their own role`     | SELECT  | public        | `(auth.uid() = user_id)` | —                                                    |
| `Admin users can view user roles`   | SELECT  | authenticated | `is_admin(auth.uid())`   | —                                                    |
| `Admin users can update user roles` | UPDATE  | authenticated | `is_admin(auth.uid())`   | `(is_admin(auth.uid()) AND (user_id <> auth.uid()))` |

### Logs

Stores logs

#### Name

`logs`

#### Columns

| Name         | Type          | Constraints |
| ------------ | ------------- | ----------- |
| `log_level`  | `text`        |             |
| `event_name` | `text`        |             |
| `user_id`    | `uuid`        | Nullable    |
| `message`    | `text`        | Nullable    |
| `id`         | `uuid`        | Primary     |
| `created_at` | `timestamptz` |             |
| `source`     | `log_source`  |             |

#### RLS policies

| Policy                      | Command | Roles         | USING                  | WITH CHECK |
| --------------------------- | ------- | ------------- | ---------------------- | ---------- |
| `Admin users can view logs` | SELECT  | authenticated | `is_admin(auth.uid())` | —          |

### Newsletter subscribers

Stores newsletter subscribers

#### Name

`newsletter_subscribers`

#### Columns

| Name         | Type          | Constraints |
| ------------ | ------------- | ----------- |
| `email`      | `text`        | Unique      |
| `id`         | `uuid`        | Primary     |
| `created_at` | `timestamptz` |             |

#### RLS policies

| Policy                                       | Command | Roles  | USING | WITH CHECK |
| -------------------------------------------- | ------- | ------ | ----- | ---------- |
| `Allow public newsletter subscribers insert` | INSERT  | public | —     | `true`     |
