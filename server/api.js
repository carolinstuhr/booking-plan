import { Router } from 'express'
import mongoose from 'mongoose'
const router = Router()
mongoose.connect('mongodb://localhost:27017/bookings')

const currentDate = new Date()
const currentYearDate = currentDate.getFullYear().toString()
const nextYearDate = (currentDate.getFullYear() + 1).toString()

const currentYear = mongoose.model(currentYearDate, {
  year: { type: Number },
  month: { type: Number },
  monthName: { type: String },
  days: { type: Array },
})

const nextYear = mongoose.model(nextYearDate, {
  year: { type: Number },
  month: { type: Number },
  monthName: { type: String },
  days: { type: Array },
})

router.get('/currentyear', (req, res) => {
  currentYear.find().then((data) => {
    res.json(data)
  })
})
router.get('/nextyear', (req, res) => {
  nextYear.find().then((data) => {
    res.json(data)
  })
})

router.patch('/currentyear', (req, res) => {
  currentYear
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

router.patch('/nextyear', (req, res) => {
  nextYear
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

export default router
