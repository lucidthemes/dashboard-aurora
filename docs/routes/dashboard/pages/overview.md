# Pages

## Overview

The pages route group folder is split into two route folders:

- **Pages** - outputs the list of created pages
- **Page** - create/edit a page using the editor

## Pages

### Route

`/pages`

### Docs

- [View docs](https://github.com/lucidthemes/dashboard-aurora/blob/main/docs/routes/dashboard/pages/pages.md)

### Source

- [View on GitHub](<https://github.com/lucidthemes/dashboard-aurora/tree/main/src/app/(dashboard)/(pages)/pages/>)

## Page

### Routes

The route for the single page depends on the action, the edit action requires the UUID of the page being edited.

For example:

- **Create** - `/page?action=create`
- **Edit** - `/page?action=edit&id=12345`

### Docs

- [View docs](https://github.com/lucidthemes/dashboard-aurora/blob/main/docs/routes/dashboard/pages/page.md)

### Source

- [View on GitHub](<https://github.com/lucidthemes/dashboard-aurora/tree/main/src/app/(dashboard)/(pages)/page>)
