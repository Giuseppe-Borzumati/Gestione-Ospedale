const { TherapyModel } = require('./therapy.model')
const express = require('express')
const therapyRouter = express.Router()

// create CRUD routes

// get all therapies

therapyRouter.get('/', async (req, res) => {
  try {
    const therapies = await TherapyModel.find({})
    if (!therapies) {
      return res.status(404).json({ message: 'No therapies found' })
    }
    res.json(therapies)
  } catch (err) {
    res.status(500).json(err)
  }
})

// get therapy by uuid

therapyRouter.get('/:uuid', async (req, res) => {
  try {
    const therapy = await TherapyModel.findOne({ uuid: req.params.uuid })
    if (!therapy) {
      return res.status(404).json({ message: 'No therapy found' })
    }
    res.json(therapy)
  } catch (err) {
    res.status(500).json(err)
  }
})

// create therapy

therapyRouter.post('/', async (req, res) => {
  try {
    const therapy = new TherapyModel(req.body)
    const createdTherapy = await therapy.save()
    res.json(createdTherapy)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

// update therapy

therapyRouter.put('/:uuid', async (req, res) => {
  try {
    const therapy = await TherapyModel.findOne({ uuid: req.params.uuid })
    if (!therapy) {
      return res.status(404).json({ message: 'No therapy found' })
    }
    therapy.set(req.body)
    const updatedTherapy = await therapy.save()
    res.json(updatedTherapy)
  } catch (err) {
    res.status(500).json(err)
  }
})

// delete therapy

therapyRouter.delete('/:uuid', async (req, res) => {
  try {
    const therapy = await TherapyModel.findOne({ uuid: req.params.uuid })
    if (!therapy) {
      return res.status(404).json({ message: 'No therapy found' })
    }
    await therapy.deleteOne({ uuid: req.params.uuid })
    res.json({ message: 'Therapy deleted' })
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = { therapyRouter }
