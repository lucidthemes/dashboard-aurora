# Changelog

All notable changes to this project will be documented in this file.

## [0.3.0] - [Unreleased]

### Added

#### App

##### Dashboard

###### Customers

- customers page route
- customers components
- customers data
- customers hooks
- customers schemas
- customers store

###### Admin

- admin route group folder

- logs page route
- logs components
- logs data
- logs schemas

- users page route
- users actions
- users components
- users data
- users hooks
- users schemas
- users store

#### Components

- list sub folder
- list controls
- list filters
- list search
- list sort

#### Lib

- formatter for date and time
- supabase create admin client

#### Schemas

- customer

### Changed

#### App

##### Dashboard

- get current dashboard user to fetch customer data
- dashboard user context to store customer data

##### Auth

- login form password field to type password

#### Components

##### Dashboard

- app sidebar shop route links to not include shop within url
- nav menu group link highlights current page route
- nav menu group link automatically opens current route sub menu group
- split dashboard layout into wrapper component for client component to fix hydration error
- main header user to show customer first and last name
- main header user to show avatar using first and last name characters
- app sidebar to check user role for admin routes
- moved all dashboard components into dashboard app route

##### Dialogs

- split edit and delete dialogs into separate components within dialogs sub folder

##### Sheets

- split form and content sheets into separate components within sheets sub folder

##### UI

- data table actions column to align right

#### Lib

- moved media fetch files into media route
- removed media sub folder
- moved instagram fetch files into instagram feed route
- removed instagram feed sub folder

#### Schemas

- moved media schema into media route
- moved instagram feed schema into instagram feed route

#### Store

- moved media store into media route
- moved instagram feed store into instagram feed route
- removed store folder

### Fixed

#### Components

- main header user hydration issue when fetching user from supabase auth

## [0.2.0] - 2026-03-11

### Added

#### App

##### Auth

###### Forgot password

- forgot password form hook using react hook form
- forgot password form action using supabase auth
- loading spinner to forgot password form submit button
- disabled prop to forgot password form submit button when pending

###### Login

- login form hook using react hook form
- login form action using supabase auth
- loading spinner to login form submit button
- disabled prop to login form submit button when pending

###### Reset password

- reset password form hook using react hook form
- reset password form action using supabase auth
- loading spinner to reset password form submit button
- disabled prop to reset password form submit button when pending

##### Dashboard

- get current dashboard user using supabase auth
- user provider to store current user and role

###### Media

- delete media action using supabase
- image optimization using Nextjs image tag

#### Components

- loading spinner to sheet with form submit button
- disabled prop to sheet with form submit button when pending
- dropzone supabase media upload

##### Dashboard

- supabase auth logout to main header user logout button

##### UI

- delete media dialog

#### Hooks

- supabase upload

#### Lib

- supabase nextjs client
- supabase log event edge function invoke
- add get supabase storage public url for media

#### Schemas

- auth sub folder
- login form
- forgot password form
- reset password form

### Changed

#### Actions

- move instagram feed actions file into instagram feed route actions folder
- move media action file into media route actions folder
- renamed delete actions file to delete dialog
- delete dialog action to delete from supabase

#### App

##### Auth

- group folder of (auth) to route folder auth
- update password page to reset password
- login form link to forgot password to include auth
- forgot password form link to login to include auth
- update password form file name to reset password form
- login form hook to use tanstack query
- forgot password form hook to use tanstack query
- reset password form hook to use tanstack query

##### Dashboard

###### Instagram feed

- split instagram feed actions file into create and update action files
- feed form hook to use tanstack query mutation
- feed list to fetch from supabase
- feed form to fetch selected images for feed from supabase
- feed form to fetch media from supabase
- feed form to create new feed on supabase
- feed form to update existing feed on supabase
- feed form button checkbox field to show/hide link and text fields

###### Media

- edit form hook to use tanstack query mutation
- update media action to use supabase update
- moved call to useMediaEditForm hook into page wrapper to pass isPending to sheet component
- media edit form component to accept form and onSubmit props
- upload form to use supabase dropzone

#### Components

##### Auth

- moved login form component into app auth login page route
- moved forgot password form component into app auth forgot password page route
- moved reset password form component into app auth reset password page route

##### Dashboard

- main header user to show dashboard user email from supabase auth

#### Lib

##### Media

- add media sub folder
- move get media file into media sub folder
- connect get media to supabase to fetch images from storage

#### Store

- media store to use delete storage path instead of delete row id

### Fixed

#### App

##### Auth

- layout logo link width

## [0.1.1] - 2026-02-22

### Changed

- updated dependencies

## [0.1.0] - 2026-02-07

### Added

#### Actions

- media actions
- delete actions
- instagram feed actions

#### App

- auth route group folder
- dashboard route group folder
- not found page

##### Auth

- login page
- forgot password page
- update password page

##### Dashboard

- dashboard page
- dashboard layout

###### Media

- media page
- media page components
- media page hook

###### Instagram feed

- instagram feed page
- instagram feed components
- instagram feed hooks

#### Components

- auth sub folder
- dashboard sub folder
- ui sub folder
- theme switcher provider
- data table
- buttons
- dialogs
- sheets
- list controls
- loading
- page headings

##### Auth

- login form component
- forgot password form component
- update password form component

##### Dashboard

- dashboard component
- theme light/dark mode switcher

##### ui

- shadcn components

#### Hooks

- hooks folder
- shadcn use mobile

#### Lib

- lib folder
- metadata constants
- shadcn utils
- media
- instagram feed

#### Schemas

- schemas folder
- media schema
- instagram feed schema

#### Store

- media store
- instagram feed store

## [0.0.0] - 2026-01-15

- initial setup
