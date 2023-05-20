const express = require('express')
const { ReservationModel } = require('./reservation.model')
// create router
const reservationRouter = express.Router()
// get all reservations
reservationRouter.get('/', async (req, res) => {
  try {
    const reservations = await ReservationModel.find({})
    if (!reservations) {
      return res.status(404).json({ message: 'No reservations found' })
    }
    res.json(reservations)
  } catch (err) {
    res.status(500).json(err)
  }
})

// get reservation by uuid
reservationRouter.get('/:uuid', async (req, res) => {
  try {
    const reservation = await ReservationModel.findOne({ uuid: req.params.uuid })
    if (!reservation) {
      return res.status(404).json({ message: 'No reservation found' })
    }
    res.json(reservation)
  } catch (err) {
    res.status(500).json(err)
  }
})

// create reservation
reservationRouter.post('/', async (req, res) => {
  try {
    const reservation = new ReservationModel(req.body)
    const createdReservation = await reservation.save()
    res.json(createdReservation)
  } catch (err) {
    res.status(500).json(err)
  }
})

// update reservation
reservationRouter.put('/:uuid', async (req, res) => {
  try {
    const reservation = await ReservationModel.findOne({ uuid: req.params.uuid })
    if (!reservation) {
      return res.status(404).json({ message: 'No reservation found' })
    }
    reservation.set(req.body)
    const updatedReservation = await reservation.save()
    res.json(updatedReservation)
  } catch (err) {
    res.status(500).json(err)
  }
})

// delete reservation

reservationRouter.delete('/:uuid', async (req, res) => {
  try {
    const reservation = await ReservationModel.findOne({ uuid: req.params.uuid })
    if (!reservation) {
      return res.status(404).json({ message: 'No reservation found' })
    }
    await reservation.deleteOne({ uuid: req.params.uuid })
    res.json({ message: 'Reservation deleted' })
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = { reservationRouter }
