import Notes from '../models/Note.js'

export const getNotes = async (req, res) => {
  try {

    const { sort } = req.query

    const totalNotes = await Notes.countDocuments()
    let result = Notes.find()

    if (sort) {
      const sortList = sort.split(',').join(' ')
      result = result.sort(sortList)
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 20
    const skip = (page - 1) * limit

    result = result.skip(skip).limit(limit)
    const notes = await result

    if (notes.length > 0) {
      return res.status(200).send({ total: totalNotes, page: page, limit_per_page: limit, results_in_page: notes.length, results: notes })
    }
    res.status(404).send({ total: totalNotes, results_in_page: notes.length, msg: 'No notes found' })

  } catch (error) {
    res.status(404).send({ msg: 'Error not found' })
    console.log(error)
  }
}

export const searchNotes = async (req, res) => {
  try {
    const { name, sort } = req.query
    const queryObject = {}

    if (name) {
      queryObject.name = { $regex: name, $options: 'i' }
    }
    const totalNotes = await Notes.countDocuments()
    let result = Notes.find(queryObject)

    if (sort) {
      const sortList = sort.split(',').join(' ')
      result = result.sort(sortList)
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 20
    const skip = (page - 1) * limit

    result = result.skip(skip).limit(limit)
    const notes = await result

    if (notes.length > 0) {
      return res.status(200).send({ total: totalNotes, page: page, limit_per_page: limit, results_in_page: notes.length, results: notes })
    }
    res.status(404).send({ total: totalNotes, results_in_page: notes.length, msg: 'No notes found' })

  } catch (error) {
    res.status(404).send({ msg: 'Error not found' })
    console.log(error)
  }
}
