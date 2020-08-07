import React, { useEffect, useState } from 'react'
import CalendarPage from './CalendarPage'
import Header from './Header'

export default function App() {
  const [dataCurrentYear, setDataCurrentYear] = useState([])
  const [isCurrentYearLoaded, setIsCurrentYearLoaded] = useState()
  const [allDataCurrentYear, setAllDataCurrentYear] = useState([])
  const [dataNextYear, setDataNextYear] = useState([])
  const [isNextYearLoaded, setIsNextYearLoaded] = useState()
  const [allDataNextYear, setAllDataNextYear] = useState([])
  const [bookingData, setBookingData] = useState([])
  const [IsBookingInProgress, setIsBookingInProgress] = useState(false)

  const today = new Date()
  const currentMonth = today.getMonth() + 1
  const currentYear = today.getFullYear()

  let emptyDays = []

  useEffect(() => {
    setIsCurrentYearLoaded(false)
    fetch('http://localhost:8080/currentyear')
      .then((res) => res.json())
      .then((data) => setAllDataCurrentYear(data))
      .then(() => setIsCurrentYearLoaded(true))
      .catch((error) => console.log('error', error))
  }, [IsBookingInProgress])

  useEffect(() => {
    setIsNextYearLoaded(false)
    fetch('http://localhost:8080/nextyear')
      .then((res) => res.json())
      .then((data) => setAllDataNextYear(data))
      .then(() => setIsNextYearLoaded(true))
      .catch((error) => console.log('error', error))
  }, [IsBookingInProgress])

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

  useEffect(() => {
    setDataCurrentYear(
      allDataCurrentYear
        .filter((month) => month.month >= currentMonth)
        .map(function (month) {
          let thisMonth = month.month
          return {
            ...month,
            emptyDays: emptyDays.find((month) => month.month === thisMonth),
          }
        })
    )
  }, [isCurrentYearLoaded])

  useEffect(() => {
    setDataNextYear(
      allDataNextYear
        .filter((month) => month.month < currentMonth)
        .map(function (month) {
          let thisMonth = month.month
          return {
            ...month,
            emptyDays: emptyDays.find((month) => month.month === thisMonth),
          }
        })
    )
  }, [isNextYearLoaded])

  useEffect(() => {
    setBookingData(dataCurrentYear.concat(dataNextYear))
  }, [dataNextYear, dataCurrentYear])

  return (
    <>
      <Header />
      <CalendarPage
        dataCurrentYear={dataCurrentYear}
        dataNextYear={dataNextYear}
        currentYear={currentYear}
        setIsBookingInProgress={setIsBookingInProgress}
        bookingData={bookingData}
      />
    </>
  )
}
