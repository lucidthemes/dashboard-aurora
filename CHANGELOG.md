# Changelog

All notable changes to this project will be documented in this file.

## [0.2.0] - [Unreleased]

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

##### Dashboard

- get current dashboard user using supabase auth
- user provider to store current user and role

#### Components

- loading spinner to sheet with form submit button
- disabled prop to sheet with form submit button when pending

##### Dashboard

- supabase auth logout to main header user logout button

#### Lib

- supabase nextjs client
- supabase log event edge function invoke

#### Schemas

- auth sub folder
- login form
- forgot password form
- reset password form

### Changed

#### Actions

- move instagram feed actions file into instagram feed route actions folder
- move media action file into media route actions folder

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

###### Media

- edit form hook to use tanstack query mutation
- update media action to use supabase update
- moved call to useMediaEditForm hook into page wrapper to pass isPending to sheet component
- media edit form component to accept form and onSubmit props

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
- add get supabase storage public urls for media images and videos

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
