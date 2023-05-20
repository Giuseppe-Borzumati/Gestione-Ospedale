const { ExamModel } = require('./exam.model')
const express = require('express')
const examRouter = express.Router()

// create CRUD routes

// get all exams

examRouter.get('/', async (req, res) => {
  try {
    const exams = await ExamModel.find({})
    if (!exams) {
      return res.status(404).json({ message: 'No exams found' })
    }
    res.json(exams)
  } catch (err) {
    res.status(500).json(err)
  }
})

// get exam by uuid

examRouter.get('/:uuid', async (req, res) => {
  try {
    const exam = await ExamModel.findOne({ uuid: req.params.uuid })
    if (!exam) {
      return res.status(404).json({ message: 'No exam found' })
    }
    res.json(exam)
  } catch (err) {
    res.status(500).json(err)
  }
})

// create exam

examRouter.post('/', async (req, res) => {
  try {
    const exam = new ExamModel(req.body)
    const createdExam = await exam.save()
    res.json(createdExam)
  } catch (err) {
    res.status(500).json(err)
  }
})

// update exam

examRouter.put('/:uuid', async (req, res) => {
  try {
    const exam = await ExamModel.findOne({ uuid: req.params.uuid })
    if (!exam) {
      return res.status(404).json({ message: 'No exam found' })
    }
    exam.set(req.body)
    const updatedExam = await exam.save()
    res.json(updatedExam)
  } catch (err) {
    res.status(500).json(err)
  }
})

// delete exam

examRouter.delete('/:uuid', async (req, res) => {
  try {
    const exam = await ExamModel.findOne({ uuid: req.params.uuid })
    if (!exam) {
      return res.status(404).json({ message: 'No exam found' })
    }
    await ExamModel.deleteOne({ uuid: req.params.uuid })
    res.json({ message: 'Exam deleted' })
  } catch (err) {
    console.log('err', err)
    res.status(500).json(err)
  }
})

module.exports = { examRouter }
