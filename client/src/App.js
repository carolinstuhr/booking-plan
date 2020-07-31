import React, { useEffect, useState } from 'react'
import CalendarPage from './CalendarPage'
import Header from './Header'

export default function App() {
  const [bookingData, setBookingData] = useState([])
  const [dataCurrentYear, setDataCurrentYear] = useState([])
  const [dataNextYear, setDataNextYear] = useState([])
  const [IsBookingInProgress, setIsBookingInProgress] = useState(false)

  const today = new Date()
  const currentMonth = today.getMonth() + 1
  const currentYear = today.getFullYear()

  let emptyDays = []

  useEffect(() => {
    fetch('http://localhost:8080/months')
      .then((res) => res.json())
      .then((data) => setBookingData(data))
      .catch((error) => console.log('error', error))
  }, [IsBookingInProgress])

  useEffect(() => {
    for (let i = 0; i < 12; i++) {
      let newMonth = today.getMonth() + 1 + i
      let newYear = today.getFullYear()
      let amount = []
      if (newMonth > 12) {
        newMonth -= 12
        newYear += 1
      }
      let firstDay = new Date(newYear + '-' + newMonth + '-01').getDay() - 1
      if (firstDay === -1) {
        firstDay = 6
      }
      for (let i = 0; i < firstDay; i++) {
        amount.push('')
      }
      emptyDays = [...emptyDays, { month: newMonth, amount: amount }]
    }

    setDataCurrentYear(
      bookingData
        .filter((month) => month.month >= currentMonth)
        .map(function (month) {
          let thisMonth = month.month
          return {
            ...month,
            emptyDays: emptyDays.find((month) => month.month === thisMonth),
          }
        })
    )

    setDataNextYear(
      bookingData
        .filter((month) => month.month < currentMonth)
        .map(function (month) {
          let thisMonth = month.month
          return {
            ...month,
            emptyDays: emptyDays.find((month) => month.month === thisMonth),
          }
        })
    )
  }, [bookingData])

  return (
    <>
      <Header />
      <CalendarPage
        bookingData={bookingData}
        dataCurrentYear={dataCurrentYear}
        dataNextYear={dataNextYear}
        currentYear={currentYear}
        setIsBookingInProgress={setIsBookingInProgress}
      />
    </>
  )
}
