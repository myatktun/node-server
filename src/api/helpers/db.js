const Authors = async (mainQueryArray) => {
  const queryArray = mainQueryArray
  queryArray.unshift({
    $group: {
      _id: `$author`,
      books: { $addToSet: "$book" }
    }
  },
    { $sort: { _id: 1 } })
  return queryArray
}

const Books = async (mainQueryArray, search) => {
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
      }
    ]
  }
  return queryArray
}

const Book = async (search) => {
  let queryArray = [
    {
      $match: {
        book: search
      }
    }
  ]
  return queryArray
}

const similarBooks = async (search, category) => {
  let queryArray = [
    {
      $match: {
        $and: [
          { book: { $ne: `${search}` } }, { category: { $eq: `${category}` } }
        ]
      }
    }
  ]
  return queryArray
}

const createQueryArray = async (type, limit, skip, search = '', category) => {
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

  if (type === 'author') {
    return await Authors(mainQueryArray)
  }

  else if (type === 'books') {
    return await Books(mainQueryArray, search)
  }

  else if (type === 'book') {
    return await Book(search, category)
  }
  else {
    return await similarBooks(search, category)
  }
}

export default createQueryArray
