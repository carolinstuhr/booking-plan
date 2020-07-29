import { Router } from 'express'
import mongoose from 'mongoose'
const router = Router()
mongoose.connect('mongodb://localhost:27017/bookings')

const daysScheme = {
  day: { type: Number },
  isBooked: { type: Boolean },
  bookedBy: { type: String },
}

const months = mongoose.model('months', {
  month: { type: Number },
  monthName: { type: String },
  days: daysScheme,
  // january: { type: Object },
  // february: { type: Object },
  // march: { type: Object },
  // april: { type: Object },
  // may: { type: Object },
  // june: { type: Object },
  // july: { type: Object },
  // august: { type: Object },
  // september: { type: Object },
  // october: { type: Object },
  // november: { type: Object },
  // december: { type: Object },
})

router.get('/months', (req, res) => {
  months.find().then((data) => {
    res.json(data)
  })
})

router.put('/months', (req, res) => {})

const february = mongoose.model('february', {
  day: { type: Number },
  isBooked: { type: Boolean },
  bookedBy: { type: String },
})

router.post('/february', (req, res) => {
  february
    .create(req.body)
    .then(() => {
      res.json({ created: true })
    })
    .catch(() => response.json({ created: false }))
})
router.get('/februaryget', (req, res) => {
  february
    .find()
    .then((data) => {
      res.json(data)
    })
    .catch(() => response.json({ get: false }))
})

export default router
