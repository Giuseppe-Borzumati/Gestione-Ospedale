const mongoose = require('mongoose')
const { v4 } = require('uuid')
const Schema = mongoose.Schema
const DoctorSchema = new Schema({
  uuid: {
    type: String,
    required: true,
    default: v4()
  },
  name: {
    type: String
  },
  specialization: {
    type: String
  },
  patients: {
    type: [String]
  }
})
const DoctorModel = mongoose.model('Doctor', DoctorSchema, 'Doctors')
module.exports = { DoctorModel, DoctorSchema }
