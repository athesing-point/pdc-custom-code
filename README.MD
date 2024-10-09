# Point.com Custom Code Repository

This repository manages and bundles custom code used on Point.com (PDC).

## Structure

Each folder corresponds to a specific page or feature on Point.com where the code is used:

- `/blog`: Custom code for the blog or blog post pages
- ...

## Setup and Usage

### Install dependencies

Run the following command to install the required dependencies:

```
npm install --save-dev gulp gulp-rename gulp-clean-css gulp-terser gulp-ifc
```

### Auto minification of js and css files

To start the process that minifies files on save, run:

```
npx gulp
```

The files will be minified and saved in the `min` folder.

## RTF Checklists

The `rtf-checklists` class provides customizable checklist styles. Here are some example attributes and their options:

### Check Style

- `check="yorange"`: Yellow-orange checkmark
- `check="pointblue"`: Point blue checkmark
- `check="white"`: White checkmark
- `check="grayLight1"`: Light gray checkmark
- `check="gray0"`: Very light gray checkmark (#f6f7f9)
- `check="gray1"`: Light gray checkmark (#e3e3e3)
- `check="gray2"`: Light gray checkmark (#e0e4eb)
- `check="gray3"`: Medium gray checkmark (#999999)
- `check="gray4"`: Dark gray checkmark (#707475)
- `check="c-purpleblue-white"`: Purple-blue circle with white checkmark
- `check="c-yorange-white"`: Yellow-orange circle with white checkmark
- `check="c-pointblack-white"`: Black circle with white checkmark

### List Item Gap

- `li-gap="0.25rem"`: 0.25rem gap between list items
- `li-gap="0.5rem"`: 0.5rem gap between list items
- `li-gap="0.75rem"`: 0.75rem gap between list items
- `li-gap="1rem"`: 1rem gap between list items
- `li-gap="1.5rem"`: 1.5rem gap between list items
- `li-gap="2rem"`: 2rem gap between list items

### Checkmark Size

- `check-size="1rem"`: 1rem checkmark size
- `check-size="1.25rem"`: 1.25rem checkmark size
- `check-size="1.5rem"`: 1.5rem checkmark size
- `check-size="1.75rem"`: 1.75rem checkmark size
- `check-size="2rem"`: 2rem checkmark size

Add all attributes to the a RTF that has the `rtf-checklists` class. Do not add them to the list items or the list itself.
