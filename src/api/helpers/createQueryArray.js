import { Books, Authors, Categories } from './queryArrays.js'

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
    if (route.path.includes('/authors')) {
      return await Authors(mainQueryArray, query.search || params.author)
    } else if (route.path.includes('/categories')) {
      return await Categories(mainQueryArray, query.search || params.category)
    }
    return await Books(mainQueryArray, query.search || params.book, Object.keys(params).length)
  }
}

export default createQueryArray
