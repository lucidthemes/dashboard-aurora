# Editor

## Overview

The editor folder contains the editor used when creating/editing blog posts and pages

## Source

- [View on GitHub](https://github.com/lucidthemes/dashboard-aurora/tree/main/src/components/editor)

## Features

The main features of the editor include:

- List of 12 blocks
- Drag and drop reordering of blocks
- Floating toolbar options for each block
- Rich text enabled content for certain blocks
- History with undo and redo
- Editing options of block or code
- Sidebars
  - Blocks - insert a block into the editor
  - Document - reorder or delete blocks within the editor
  - Post - options for status, slug, author, image, excerpt, categories, tags, related posts, and options
  - Block - individual options for the currently selected block within the editor

## Structure

### Actions

- **page** - the page create and update actions
- **post** -the post create and update actions

### Blocks

The blocks folder contains all the available blocks within the editor

#### Block structure

Each of the blocks contains the following:

- **block.json** - used within the editor for each block to define its metadata. This provides the editor with things including the blocks type, title, category, description, icon, what generic options it supports, and custom options only for that specific block.
- **create** - the create function for each block is used to create a new instance of the block within the editor. This function creates the block and sets default values for its attributes
- **render** - the render function is what outputs the block with the editor. This constructs the HTML for each block, adds relevant data attributes, and adds the event handlers to blocks which have content edited using contentEditable
- **schema** - used to define the Zod schema for the block and create the types required for the block
- **style.module** - the styles for the block which are used when rendering the block on the frontend site
- **style-editor.module** - the styles used for the block when rendering the block in the dashboard editor

#### Block supports

The supports for a block are used within the editor to allow generic options for a block. The support options for a block are specified within the block.json file for each block. The list of supports that are available to blocks includes: width, align, richText, anchor, and customClasses.

An example of how the supports are structured within the block.json file for a block:

```json
"supports": {
  "width": {
    "options": ["standard", "wide", "full"]
  },
  "align": {
    "options": ["left", "center", "right"]
  },
  "richText": true,
  "anchor": true,
  "customClasses": true
}
```

#### Block options

The options for a block are specific options that only apply to that block and are set within the block.json file for each block. The options for a block currently support a number of different formats including dropdown, form, slider, and toggle.

An example of how the options are structured within the block.json file for a block:

```json
"options": [
{
  "type": "dropdown",
  "name": "media-position",
  "attribute": "mediaPosition",
  "title": "Media position",
  "icon": "<svg ...><path .../></svg>",
  "items": [
    {
      "id": "media-position-left",
      "label": "Left",
      "icon": "<svg ...><path .../></svg>",
      "value": "left"
    },
    {
      "id": "media-position-right",
      "label": "Right",
      "icon": "<svg ...><path .../></svg>",
      "value": "right"
    }
  ],
  "showInToolbar": true,
  "changeIconOnUpdate": false
}
```

#### Block attributes

The attributes for a block are the properties within a blocks JSON that are modified when a block is updated within the editor. These attributes are stored within the blocks JSON in the database and are used for rendering in both the editor and the frontend site.

The structure of each attribute is a type and value property. The supported types include: plain-text, rich-text, number, boolean, and array. Attributes that have a type of either plain-text or rich-text are sanitized using DOMPurify to ensure the content does not contain tags it shouldn't. For blocks with rich-text supported attributes, DOMPurify is passed the following list of HTML tags that are allowed and any not in the list are stripped from the content of the attribute: strong, i, a, u, s

An example of how the attributes are structured within a block:

```json
"attributes": {
  "width": {
    "type": "plain-text",
    "value": "standard"
  },
  "content": {
    "type": "rich-text",
    "value": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  }
}
```

#### Block rich text

The editor features a custom implementation of rich text using the [selection API](https://developer.mozilla.org/en-US/docs/Web/API/Selection) to apply and remove rich text elements from text nodes instead of using the legacy method of execCommand.

The currently supported rich text formats are bold, italic, link, underline, and strikethrough.

##### Source

- [View on GitHub](https://github.com/lucidthemes/dashboard-aurora/blob/main/src/components/editor/blocks/use-blocks-rich-text.ts)

##### How it works

The rich text works primarily using the range from the selection API to determine whether the range is collapsed or not.

- **Range is not collapsed**

  If the range is not collapsed, the user has selected a piece of text and rich text needs to be applied to it. The works by using an onMouseDown event on the block toolbar rich text buttons which call the function setRichTextSelection to get the currently selected text using the selection API and then store that in a React ref.

  Once the text selection has been stored in the ref, it can be manipulated to apply the correct rich text type. Three functions are used to correctly apply or remove rich text where needed:
  - **applyRichTextTypeToRange** - used when plain text is selected that does not contain rich text already. This function simply applies the rich text type to the selected range of text.
  - **applyRichTextTypeToMixedRange** - used when a selected piece of text already contains rich text. This function is used to expand rich text elements to include more text, such as when a user selects text before or after a current rich text element. It's also used to move and expand rich text elements when a piece of selected text contains multiple rich text types, such as a piece of text being bold and italic.
  - **removeRichTextTypeFromRange** - used to remove a rich text type from the selected text. This works to remove rich text from both cases of a simple piece of text with only a single type of rich text applied and also more complex cases where multiple rich text types are applied and the selection to remove is only wanted for part of the text.

- **Range is collapsed**

  If the range is collapsed, the user has not selected a piece of text to modify with rich text, and instead one of the rich text buttons has been clicked. This allows the user to type and have the rich text type selected applied to all subsequent text nodes until the rich text button is clicked again to stop formatting the text.

#### Block registry

The block registry serves as a single place to work with a specific block. The registry contains each block and within each block are the following three properties:

- **meta** - used to retrieve the information from the blocks block.json file
- **render** - used to render that specific block by dynamically importing its render component file
- **create** - used to call the create function for that specific block

#### List of blocks

The list of editor blocks includes:

- **Button** - displays a button
  - Supports: width, align, anchor, custom classes
  - Options: link, new tab
- **Code** - displays a styled snippet
  - Supports: width, anchor, custom classes
- **Gallery** - displays a gallery of images
  - Supports: width, anchor, custom classes
  - Options: columns
- **Heading** - displays a heading
  - Supports: width, align, rich text, anchor, custom classes
  - Options: heading level
- **Image** - displays an image
  - Supports: width, align, anchor, custom classes
  - Options: size, aspect ratio
- **List** - displays a list of text
  - Supports: width, align, rich text, anchor, custom classes
  - Options: list style
- **Media & Text** - displays an image or video with text alongside it
  - Supports: width, align, rich text, anchor, custom classes
  - Options: media position, media width, media size, media aspect ratio, text position
- **Paragraph** - displays a paragraph of text
  - Supports: width, align, rich text, anchor, custom classes
- **Pullquote** - displays a pullquote with quote and a cite
  - Supports: width, align, anchor, custom classes
- **Quote** - displays a quote and a cite
  - Supports: width, align, anchor, custom classes
- **Separator** - displays a horizontal line break
  - Supports: width, anchor, custom classes
- **Video** - displays a video
  - Supports: width, align, anchor, custom classes
  - Options: size, aspect ratio

#### Example block

An example of a how a block is structured in JSON within the content blocks array. Each block includes the block id, type, and attributes:

```json
{
  "id": "1ac09c26-780d-4403-a925-6a1d415bab95",
  "type": "paragraph",
  "attributes": {
    "align": {
      "type": "plain-text",
      "value": "left"
    },
    "width": {
      "type": "plain-text",
      "value": "standard"
    },
    "content": {
      "type": "rich-text",
      "value": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    }
  }
}
```

### Components

- **content** - the content block components including block wrapper, code editor, and floating toolbar
- **header** - the editor header components
- **media** - the media overlay components
- **sidebars** - the components for the editor blocks, document, and settings sidebars

### Data

- **media** - fetches the list of media from Supabase
- **sidebars** - fetches the options used in the sidebar from Supabase that include authors, categories, image, options, related posts, and tags

### Hooks

- **content** - used for the content blocks
- **media** - used for the media overlay
- **sidebars** - used for sidebar settings options

### Schemas

- **actions** - used for post and page create/edit actions
- **content** - used for the content blocks
- **media** - used for the media overlay
- **sidebars** - used for sidebar settings options
- **new-page** - used when creating a new page
- **new-post** - used when creating a new post

### Store

- **editor-store** - Zustand store containing the state and actions for the editor

### Styles

- **editor.module** - styles used within the editor

### Utils

- **sanitization** - used for block content sanitization using DOMPurify
- **block-supports** - used to check if a block has a specific support or attribute value
- **create-new-page** - used for creating a new page
- **create-new-post** - used for creating a new post
