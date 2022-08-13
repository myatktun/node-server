import { getData, updateData } from '../helpers/helpers.js'

export const getFromBooks = async (req, res) => {
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
        res.status(404).send({ total: totalResults, msg: 'No books found' })

    } catch (error) {
        res.status(404).send({ msg: 'Something went wrong' })
        console.log(error)
    }
}

export const postToBooks = async (req, res) => {
    try {
        if (req.body.read) {
            await updateData(req)
            return res.status(200).send({ msg: `Updated book: ${req.params.book}` })
        }
        res.status(200).send({ msg: 'No data to update' })
    } catch (error) {
        res.status(404).send({ msg: 'Invalid data provided' })
        console.log(error)
    }
}
