const { PatientModel } = require('./patient.model')
const express = require('express')
const patientRouter = express.Router()

// create CRUD routes

// get all patients

patientRouter.get('/', async (req, res) => {
  try {
    const patients = await PatientModel.find({})
    if (!patients) {
      return res.status(404).json({ message: 'No patients found' })
    }
    res.json(patients)
  } catch (err) {
    console.log('err', err)
    res.status(500).json(err)
  }
})

// get patient by uuid

patientRouter.get('/:uuid', async (req, res) => {
  try {
    const patient = await PatientModel.findOne({ uuid: req.params.uuid })
    if (!patient) {
      return res.status(404).json({ message: 'No patient found' })
    }
    res.json(patient)
  } catch (err) {
    console.log('err', err)
    res.status(500).json(err)
  }
})

// create patient

patientRouter.post('/', async (req, res) => {
  try {
    const patient = new PatientModel(req.body)
    const createdPatient = await patient.save()
    res.json(createdPatient)
  } catch (err) {
    console.log('err', err)
    res.status(500).json(err)
  }
})

// update patient

patientRouter.put('/:uuid', async (req, res) => {
  try {
    const patient = await PatientModel.findOne({ uuid: req.params.uuid })
    if (!patient) {
      return res.status(404).json({ message: 'No patient found' })
    }
    patient.set(req.body)
    const updatedPatient = await patient.save()
    res.json(updatedPatient)
  } catch (err) {
    console.log('err', err)
    res.status(500).json(err)
  }
})

// delete patient

patientRouter.delete('/:uuid', async (req, res) => {
  try {
    const patient = await PatientModel.findOne({ uuid: req.params.uuid })
    if (!patient) {
      return res.status(404).json({ message: 'No patient found' })
    }
    await PatientModel.deleteOne({ uuid: req.params.uuid })
    res.json({ message: 'Patient deleted' })
  } catch (err) {
    console.log('err', err)
    res.status(500).json(err)
  }
})

module.exports = { patientRouter }
