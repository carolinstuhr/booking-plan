import { Router } from 'express'
import mongoose from 'mongoose'
const router = Router()
mongoose.connect('mongodb://localhost:27017/bookings')

const daysScheme = [
  { day: { type: Number } },
  { isBooked: { type: Boolean } },
  { bookedBy: { type: String } },
]

const months = mongoose.model('months', {
  month: { type: Number },
  monthName: { type: String },
  days: { type: Array },
})

router.get('/months', (req, res) => {
  months.find().then((data) => {
    res.json(data)
  })
})

router.patch('/months', (req, res) => {
  months
    .updateOne(
      {
        _id: req.body.monthId,
        days: {
          day: parseInt(req.body.day, 10),
          isBooked: false,
          bookedBy: '',
        },
      },
      {
        $set: {
          'days.$.day': req.body.day,
          'days.$.isBooked': true,
          'days.$.bookedBy': req.body.bookerName,
        },
      }
    )
    .then((response) => {
      res.json({ response: response })
    })
    .catch((error) =>
      res.json({
        error: error,
        put: false,
        monthId: req.body.monthId,
        day: req.body.day,
        bookedBy: req.body.bookerName,
      })
    )
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
