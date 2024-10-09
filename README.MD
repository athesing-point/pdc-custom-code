# Point.com Custom Code Repository

This repository manages and bundles custom code used on Point.com (PDC).

## Structure

Each folder corresponds to a specific page or feature on Point.com where the code is used:

- `/blog`: Custom code for the blog or blog post pages
- ...

## Usage

[Add brief instructions on how to use or integrate this code with Point.com]

## Contributing

[Add guidelines for contributing to this repository]

## Deployment

[Add information about how this code is deployed to Point.com]

## Setup auto minification of js and css files.

Run the following command to install the dependencies:

```
npm install --save-dev gulp gulp-rename gulp-clean-css gulp-terser gulp-ifc
```

And then run the following command to start the process that minfies on save:

```
npx gulp
```
