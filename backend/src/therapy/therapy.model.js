const { v4 } = require('uuid')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const TherapySchema = new Schema({
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
  price: {
    type: Number
  },
  patientUuid: {
    type: String
  }
})

const TherapyModel = mongoose.model('Therapy', TherapySchema, 'Therapies')
module.exports = { TherapyModel, TherapySchema }
