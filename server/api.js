import { Router } from 'express'
import mongoose from 'mongoose'
const router = Router()
mongoose.connect('mongodb://localhost:27017/bookings')

const months = mongoose.model('months', {
  january: { type: Array },
  february: { type: Array },
  march: { type: Array },
  april: { type: Array },
  may: { type: Array },
  june: { type: Array },
  july: { type: Array },
  august: { type: Array },
  september: { type: Array },
  october: { type: Array },
  november: { type: Array },
  december: { type: Array },
})

router.get('/months', (req, res) => {
  months.find().then((data) => {
    res.json(data)
  })
})

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
