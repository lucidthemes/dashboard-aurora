# Media

## Overview

The media route displays the list of uploaded media and allows for actions like upload, view, and delete

## Route

`/media`

## Source

- [View on GitHub](<https://github.com/lucidthemes/dashboard-aurora/tree/main/src/app/(dashboard)/media>)

## Responsibilities

- Display a list of media with tabs to switch between images and videos
- Allow media to be uploaded, deleted, and viewed
- Provide layout style option of grid or list
- Handle pagination
- Handle changing the sort order
- Handle changing the number of items shown per page

## User flow

1. User navigates to `/media`
2. User clicks one of the media section tabs:
   1. Images - media is fetched from the database with the type of image
   2. Videos - media is fetched from the database with the type of video
3. Results are displayed in the data table

### Upload media

1. User clicks upload image or video
2. Sheet is opened with a dropzone to upload an image or video
3. Image or video is uploaded to Supabase storage
4. Media route is revalidated to show updated data table

### Edit media

1. User clicks edit image or video
2. Sheet is opened with edit media form
3. User clicks the save changes button to submit the form
4. Form is validated and image or video is updated
5. Media route is revalidated to show updated data table

### Delete media

1. User clicks delete image or video
2. Delete media confirmation dialog is shown with the option to cancel or delete the media
   1. Delete
      1. Image or video is deleted
      2. Media route is revalidated to show updated data table
   2. Cancel - delete dialog closed and media not deleted

### View media

1. User clicks view image or video
2. Dialog is opened with the image or video shown as an overlay. The video is playable.

## Structure

### Actions

- **delete-media** - action used to delete media
- **update-media** - action used to update media

### Components

- **dialogs** - the media delete and view dialog components
- **forms** - the media edit and upload form components
- **page** - used for page specific components like heading and wrapper
- **tabs** - used for the tabs of images and videos

### Data

- **get-media** - fetches the list of media from Supabase

### Hooks

**use-edit-form** - the edit form hook using React Hook Form
**use-tabs-list** - used to change the URL parameters when a tab is clicked

### Schemas

- **actions** - used for the media delete and update actions
- **edit-form** - used for the media edit form validation

### Store

- **media-store** - Zustand store containing the state and actions for the media route
