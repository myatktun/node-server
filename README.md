# About

Simple node-express api using:

* Node.js v16.16.0
* Express
* Mongoose

It returns information about books and notes about each book. It exposes /api/v1 with
endpoints:

* /books
    - /books
        - /:book
    - /authors
        - /:author
    - /categories
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

## Response Format

The response is JSON object, always in the same format.

```json
{
    "total": number,
    "total_pages": number,
    "page": number,
    "limit_per_page": number,
    "results_in_page": number,
    "results": array
}
```

Only '**/books/books**' with no query parameters contains extra object, '**latest**', which is an array.
'**results**' is always an array, no matter the route, with objects as elements.
Each book in the results from '**/books/books**' contains the following:

1. _id: id created by mongo
2. book: book name
3. author, category: author and category of book
4. dateAdded: time the book is added in the format 'YYYY:MM:DD hh:mm:ssTZD'
5. isbn, olid: isbn and Open Library ID
6. read: status of book

A book from '**/books/books/:book**' contains the same with extra fields:

1. similar: similar books, with each book containing same fields as above
2. notes: an array containing notes about the book (will be an empty array if there are no notes)
3. relatedNotes: an array containing notes about books in same category (will be an empty array
if there are no notes)

Each author in the results from '**/books/authors**' and '**/books/authors/:author**' contains
the following:

1. _id: name of author
2. books: books written by the author

Each category in the results from '**/books/categories**' and '**/books/categories/:category**'
contains the following:

1. _id: name of category
2. books: books with the category

Each note in the results from '**/notes**' and '**/notes/:note**' contains the following:

1. _id: id created by mongo
2. name: name of the note
3. category: category of note
4. data: data of note

<sub>Currently still in development. Docker files are just for practice. Test data is provided
in [/src/api/db/bookData.json](/src/api/db/bookData.json)</sub>
