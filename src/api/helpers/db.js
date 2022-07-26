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

const singleBook = async (book) => {
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

const Authors = async (mainQueryArray, author = '') => {
  const queryArray = mainQueryArray
  queryArray.unshift(
    {
      $group: {
        _id: `$author`,
        books: { $addToSet: '$book' }
      }
    },
    {
      $match: {
        _id: { $regex: author, $options: 'i' }
      }
    }
  )
  return queryArray
}

const Categories = async (mainQueryArray, category = '') => {
  const queryArray = mainQueryArray
  queryArray.unshift(
    {
      $group: {
        _id: `$category`,
        books: { $addToSet: '$book' }
      }
    },
    {
      $match: {
        _id: { $regex: category, $options: 'i' }
      }
    }
  )
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

  if (route.path.includes('/books')) {
    if (route.path.includes('/:book')) {
      return await singleBook(params.book)
    } else if (route.path.includes('/authors')) {
      return await Authors(mainQueryArray, query.search || params.author)
    } else if (route.path.includes('/categories')) {
      return await Categories(mainQueryArray, query.search || params.category)
    }
    return await Books(mainQueryArray, query.search)
  }
}

export default createQueryArray
