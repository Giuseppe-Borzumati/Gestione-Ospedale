const { v4 } = require('uuid')
const mongoose = require('mongoose')
const { IllnessSchema } = require('../illness/illness.model')
const { ExamSchema } = require('../exam/exam.model')
const { TherapySchema } = require('../therapy/therapy.model')
const PatientSchema = new mongoose.Schema({
  uuid: {
    type: String,
    required: true,
    default: v4()
  },
  name: {
    type: String
  },
  surname: {
    type: String
  },
  address: {
    type: String
  },
  email: {
    type: String
  },
  telephone: {
    type: String
  },
  birthDate: {
    type: String,
    format: 'date-time'
  },
  illnesses: {
    type: [IllnessSchema]
  },
  exams: {
    type: [ExamSchema]
  },
  therapies: {
    type: [TherapySchema]
  },
  doctorId: {
    type: String
  }
})

const PatientModel = mongoose.model('Patient', PatientSchema, 'Patients')
module.exports = { PatientModel, PatientSchema }
