# About

Simple node-express api using:

* Node.js v16.16.0
* Express
* Mongoose

It returns information about books and notes about each book. It exposes /v1 with endpoints:

* /books
    - /:books
* /authors
    - /:author
* /categories
    - /:category
* /notes
    - /:notes

## Purpose of the project

To easily find what books I have, which books I'm reading or have read, and related notes about
each book. Also making a front-end React site to be used with.

## Features

* Easily search books based on Name, Author or Category (✓)
* Show notes about each book (✓)
* Add notes or reviews about books from users (x)

## Documentation

For more details, documentation in [markdown](./docs/markdown/README.md) or [html](./docs/html/index.html).

<sub>Currently still in development. Docker files are just for practice. Test data is provided
in [/src/api/db/bookData.json](/src/api/db/bookData.json)</sub>
