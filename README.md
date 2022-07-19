Simple node-express api using:

* Node.js v16.16.0
* Express
* Mongoose

Return information about books and related notes about each book. It exposes /api/v1 with
endpoints:

* /books
  - /category
  - /book/:book
  - /authors
    - /:author
* /notes

Currently still in development and only /books works. Docker files for just for training
purpose.
