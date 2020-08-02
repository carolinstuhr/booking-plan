import React, { useState } from 'react'
import { useEffect } from 'react'

export default function BookingWindow({
  isBookingWindowOpen,
  dataCurrentYear,
  dataNextYear,
}) {
  const [selectedMonth, setSelectedMonth] = useState()
  const [daysForSelectedMonth, setDaysForSelectedMonth] = useState()

  useEffect(() => {
    setDaysForSelectedMonth(
      dataCurrentYear.find((month) => month.month == selectedMonth)
    )
  }, [selectedMonth])

  console.log(daysForSelectedMonth)
  console.log(selectedMonth)

  return (
    <>
      {isBookingWindowOpen && (
        <>
          <label htmlFor="start">Start</label>
          <select
            name=""
            id="start"
            onChange={(event) => setSelectedMonth(event.target.value)}
          >
            {dataCurrentYear.map((month) => (
              <>
                <option value={month.month}>{month.monthName}</option>
              </>
            ))}
          </select>
          {daysForSelectedMonth && (
            <select name="" id="">
              {daysForSelectedMonth.days.map((day) => (
                <option value="">{day.day}</option>
              ))}
            </select>
          )}

          <label htmlFor="ende">Ende</label>
        </>
      )}
    </>
  )
}
