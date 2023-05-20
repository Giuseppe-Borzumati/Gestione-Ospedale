const { DoctorModel } = require('./doctor.model')
const { PatientModel } = require('../patient/patient.model')
const express = require('express')
const doctorRouter = express.Router()

// create CRUD routes

// get all exams

doctorRouter.get('/', async (req, res) => {
  try {
    const doctors = await DoctorModel.find({})
    if (!doctors) {
      return res.status(404).json({ message: 'No exams found' })
    }
    res.json(doctors)
  } catch (err) {
    res.status(500).json(err)
  }
})

// get doctor by uuid

doctorRouter.get('/:uuid', async (req, res) => {
  try {
    const doctor = await DoctorModel.findOne({ uuid: req.params.uuid })
    if (!doctor) {
      return res.status(404).json({ message: 'No doctor found' })
    }
    res.json(doctor)
  } catch (err) {
    res.status(500).json(err)
  }
})

// create doctor

doctorRouter.post('/', async (req, res) => {
  try {
    const doctor = new DoctorModel(req.body)
    const createdExam = await doctor.save()
    res.json(createdExam)
  } catch (err) {
    res.status(500).json(err)
  }
})

// update doctor

doctorRouter.put('/:uuid', async (req, res) => {
  try {
    const doctor = await DoctorModel.findOne({ uuid: req.params.uuid })
    if (!doctor) {
      return res.status(404).json({ message: 'No doctor found' })
    }
    doctor.set(req.body)
    const updatedExam = await doctor.save()
    res.json(updatedExam)
  } catch (err) {
    res.status(500).json(err)
  }
})

// delete doctor

doctorRouter.delete('/:uuid', async (req, res) => {
  try {
    const doctor = await DoctorModel.findOne({ uuid: req.params.uuid })
    if (!doctor) {
      return res.status(404).json({ message: 'No doctor found' })
    }
    await DoctorModel.deleteOne({ uuid: req.params.uuid })
    res.json({ message: 'Doctor deleted' })
  } catch (err) {
    console.log('err', err)
    res.status(500).json(err)
  }
})

doctorRouter.get('/:doctorId/patients', async (req, res) => {
  try {
    const doctor = await DoctorModel.findOne({ uuid: req.params.doctorId })
    if (!doctor) {
      return res.status(404).json({ message: 'No doctor found' })
    }
    const patients = await PatientModel.find({ uuid: { $in: doctor.patients } })
    res.json(patients)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = { doctorRouter }
