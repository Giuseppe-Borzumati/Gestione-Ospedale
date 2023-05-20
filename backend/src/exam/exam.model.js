const mongoose = require('mongoose')
const { v4 } = require('uuid')
const Schema = mongoose.Schema
const ExamSchema = new Schema({
  uuid: {
    type: String,
    required: true,
    default: v4()
  },
  name: {
    type: String
  },
  description: {
    type: String
  },
  patientUuid: {
    type: String
  }
})
const ExamModel = mongoose.model('Exam', ExamSchema, 'Exams')
module.exports = { ExamModel, ExamSchema }
