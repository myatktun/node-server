import { getData } from '../helpers/helpers.js'

export const getFromNotes = async (req, res) => {
    try {
        const { totalResults, totalPages, page, limit, data, latest } = await getData(req)

        if (data.length) {
            return res.status(200).send({
                total: totalResults, total_pages: totalPages,
                page: page, limit_per_page: limit,
                results_in_page: data.length, results: data,
                latest: latest
            })
        }
        res.status(404).send({ total: totalResults, msg: 'No notes found' })

    } catch (error) {
        res.status(404).send({ msg: 'Something went wrong' })
        console.log(error)
    }
}
