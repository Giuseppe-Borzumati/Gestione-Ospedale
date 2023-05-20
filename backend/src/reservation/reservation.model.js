const { v4 } = require('uuid')
const mongoose = require('mongoose')
const { PatientSchema } = require('../patient/patient.model')
const ReservationSchema = new mongoose.Schema({
  uuid: {
    type: String,
    required: true,
    default: v4()
  },
  date: {
    type: String,
    format: 'date-time'
  },
  patient: {
    type: PatientSchema
  },
  confirmed: {
    type: Boolean
  },
  name: {
    type: String
  },
  doctor: {
    type: String
  },
  type: {
    type: String,
    enum: ['exam', 'therapy', 'visit']
  }
})

const ReservationModel = mongoose.model('Reservation', ReservationSchema, 'Reservations')
module.exports = { ReservationModel, ReservationSchema }
