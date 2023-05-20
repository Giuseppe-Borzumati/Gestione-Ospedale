const Express = require('express')
const cors = require('cors')
const { connect } = require('mongoose')
const { reservationRouter } = require('./src/reservation/reservation.router')
const { illnessRouter } = require('./src/illness/illness.router')
const { examRouter } = require('./src/exam/exam.router')
const { patientRouter } = require('./src/patient/patient.router')
const { therapyRouter } = require('./src/therapy/therapy.router')
const { doctorRouter } = require('./src/doctor/doctor.router')
const app = new Express()
const port = 3000

// connect to mongodb
connect('mongodb://localhost:27017/medical', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
app.use(cors())
app.use(Express.json())

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.use('/reservations', reservationRouter)
app.use('/illnesses', illnessRouter)
app.use('/exams', examRouter)
app.use('/therapies', therapyRouter)
app.use('/patients', patientRouter)
app.use('/doctors', doctorRouter)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
