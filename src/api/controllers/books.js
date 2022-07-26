import queryDB from '../helpers/helpers.js'

const cleanQueryResult = async (req) => {
  const { result, page, limit } = await queryDB(req)
  const { total, data, latest } = result[0]
  const totalResults = total[0] ? total[0].total : 0
  const totalPages = Math.ceil(totalResults / limit)
  return { totalResults, totalPages, page, limit, data, latest }
}

export const getFromBooks = async (req, res) => {
  try {
    const { totalResults, totalPages, page, limit, data, latest } = await cleanQueryResult(req)

    if (data.length) {
      return res.status(200).send({
        total: totalResults, total_pages: totalPages,
        page: page, limit_per_page: limit,
        results_in_page: data.length, results: data,
        latest: latest
      })
    }
    res.status(404).send({ total: totalResults, msg: 'No books found' })

  } catch (error) {
    res.status(404).send({ msg: 'Something went wrong' })
    console.log(error)
  }
}
