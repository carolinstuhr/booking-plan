import React from 'react'
import Calender from './Calender'

export default function CalendarPage({
  bookingData,
  dataCurrentYear,
  dataNextYear,
  currentYear,
}) {
  return (
    <>
      <p>{currentYear}</p>
      {bookingData &&
        dataCurrentYear.map((month) => <Calender month={month} />)}
      <p>{currentYear + 1}</p>
      {bookingData && dataNextYear.map((month) => <Calender month={month} />)}
    </>
  )
}
