const mongoose = require('mongoose')
const { v4 } = require('uuid')
const IllnessSchema = new mongoose.Schema({
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
const IllnessModel = mongoose.model('Illness', IllnessSchema, 'Illnesses')
module.exports = { IllnessModel, IllnessSchema }
