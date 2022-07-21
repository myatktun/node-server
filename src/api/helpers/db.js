const Authors = async (queryObject) => {
  const newArray = queryObject
  newArray.unshift({
    $group: {
      _id: `$author`,
      books: { $addToSet: "$book" }
    }
  },
    { $sort: { _id: 1 } })
  return newArray
}

const Books = async (queryObject, search) => {
  search = search.replace(/[+]/g, '\\W')
  const newArray = queryObject
  newArray.unshift(
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
    newArray.at(-1)['$facet']['latest'] = [
      {
        $sort: { dateAdded: -1 }
      }
    ]
  }
  return newArray
}

const Book = async (search) => {
  let newArray = [
    {
      $match: {
        book: search
      }
    }
  ]
  return newArray
}

const similarBooks = async (search, category) => {

  let newArray = [
    {
      $match: {
        $and: [
          { book: { $ne: `${search}` } }, { category: { $eq: `${category}` } }
        ]
      }
    }
  ]
  return newArray
}

const createQueryObject = async (type, limit, skip, search = '', category) => {
  let queryObject = [
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
    const result = await Authors(queryObject)
    return result
  }

  if (type === 'books') {
    const result = await Books(queryObject, search)
    return result
  }

  if (type === 'book') {
    const result = await Book(search)
    return result
  }
  if (type === 'similar') {
    const result = await similarBooks(search, category)
    return result
  }
}

export default createQueryObject
