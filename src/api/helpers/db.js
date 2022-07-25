const Authors = async (mainQueryArray) => {
  const queryArray = mainQueryArray
  queryArray.unshift(
    {
      $group: {
        _id: `$author`,
        books: { $addToSet: '$book' }
      }
    },
  )
  return queryArray
}

const Books = async (mainQueryArray, search = '') => {
  search = search.replace(/[+]/g, '\\W')
  const queryArray = mainQueryArray
  queryArray.unshift(
    {
      $match: {
        $or: [
          { book: { $regex: search, $options: 'i' } },
          { author: { $regex: search, $options: 'i' } },
          { category: { $regex: search, $options: 'i' } },
          { isbn: Number(search) }
        ]
      }
    },
  )
  if (!search) {
    queryArray.at(-1)['$facet']['latest'] = [
      {
        $sort: { dateAdded: -1 }
      },
      {
        $limit: 1
      }
    ]
  }
  return queryArray
}

const Book = async (book) => {
  let queryArray = [
    {
      $match: {
        book: book
      }
    },
    {
      $lookup: {
        from: "books",
        let: { book: "$book", category: "$category" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $ne: ["$$book", "$book"] },
                  { $eq: ["$$category", "$category"] }
                ]
              }
            }
          }
        ],
        as: "similar"
      }
    }
  ]
  return queryArray
}

const createQueryArray = async (req, limit, skip) => {
  const { route, query, params } = req
  let mainQueryArray = [
    {
      $facet: {
        total: [
          {
            $count: "total"
          }
        ],
        data: [
          {
            $skip: skip
          },
          {
            $limit: limit
          }
        ]
      }
    }
  ]
  if (query.sort) {
    mainQueryArray.unshift(
      {
        $sort: {
          [`${query.sort}`]: Number(query.sortOrder) || 1
        }
      }
    )
  }

  if (route.path === '/books/authors') {
    return await Authors(mainQueryArray)
  } else if (route.path === '/books') {
    return await Books(mainQueryArray, query.search)
  }
  return await Book(params.book)
}

export default createQueryArray
