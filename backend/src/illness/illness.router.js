const { IllnessModel } = require('./illness.model')
const express = require('express')
const illnessRouter = express.Router()

illnessRouter.get('/', async (req, res) => {
  try {
    const illnesses = await IllnessModel.find({})
    if (!illnesses) {
      return res.status(404).json({ message: 'No illnesses found' })
    }
    res.json(illnesses)
  } catch (err) {
    res.status(500).json(err)
  }
})

// get illness by uuid

illnessRouter.get('/:uuid', async (req, res) => {
  try {
    const illness = await IllnessModel.findOne({ uuid: req.params.uuid })
    if (!illness) {
      return res.status(404).json({ message: 'No illness found' })
    }
    res.json(illness)
  } catch (err) {
    res.status(500).json(err)
  }
})

// create illness

illnessRouter.post('/', async (req, res) => {
  try {
    const illness = new IllnessModel(req.body)
    const createdIllness = await illness.save()
    res.json(createdIllness)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

// update illness

illnessRouter.put('/:uuid', async (req, res) => {
  try {
    const illness = await IllnessModel.findOne({ uuid: req.params.uuid })
    if (!illness) {
      return res.status(404).json({ message: 'No illness found' })
    }
    illness.set(req.body)
    const updatedIllness = await illness.save()
    res.json(updatedIllness)
  } catch (err) {
    res.status(500).json(err)
  }
})

// delete illness

illnessRouter.delete('/:uuid', async (req, res) => {
  try {
    const illness = await IllnessModel.findOne({ uuid: req.params.uuid })
    if (!illness) {
      return res.status(404).json({ message: 'No illness found' })
    }
    await illness.deleteOne({ uuid: req.params.uuid })
    res.json({ message: 'Illness deleted' })
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = { illnessRouter }
