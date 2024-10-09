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
