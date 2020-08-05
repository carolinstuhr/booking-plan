import React from 'react'
import { useState } from 'react'

export default function BookingWindow({
  isBookingWindowOpen,
  dataCurrentYear,
  dataNextYear,
  setSelectedStartMonth,
  selectedStartMonth,
  selectedStartDay,
  setSelectedStartDay,
  setStartMonth,
  bookingData,
  bookingPeriod,
  setBookingPeriod,
}) {
  console.log('selectedStartMonth', selectedStartMonth)
  console.log('selectedStartDay', selectedStartDay)
  console.log('bookingPeriod', bookingPeriod)

  return (
    <>
      {isBookingWindowOpen && (
        <>
          <label htmlFor="start">Start</label>
          <select
            name=""
            id="start"
            onChange={(event) => selectStartMonth(event.target.value)}
            value={selectedStartMonth.month}
          >
            {bookingData.map((month) => (
              <>
                <option value={month.month}>{month.monthName}</option>
              </>
            ))}
            {/* {dataNextYear.map((month) => (
              <>
                <option value={month.month}>{month.monthName}</option>
              </>
            ))} */}
          </select>
          {selectedStartMonth && (
            <select
              name=""
              id=""
              onChange={(event) => setStartDay(event.target.value)}
              value={selectedStartDay.day}
            >
              <option value=""></option>
              {selectedStartMonth.days.map((day) => (
                <option value={day.day}>{day.day}</option>
              ))}
            </select>
          )}

          <label htmlFor="end">Ende</label>
          <select name="" id="end">
            <option value=""></option>
          </select>
        </>
      )}
    </>
  )
  function setStartDay(day) {
    let oldDay = selectedStartDay
    let selectedDay = day
    if (selectedStartMonth.days.find((day) => day.day == selectedDay)) {
      alert('Tag is bereits gebucht.')
    } else {
      setSelectedStartDay(
        selectedStartMonth.days.find((day) => day.day == selectedDay)
      )
    }
    // setBookingPeriod(
    //   bookingData
    //     .filter((month) => month.month >= selectedStartMonth.month)
    //     .map((month) =>
    //       month.month === selectedStartMonth.month
    //         ? {
    //             ...month,
    //             days: month.days.filter((day) => day.day > selectedDay),
    //           }
    //         : month
    //     )
    // )
  }
  function selectStartMonth(month) {
    setStartMonth(month)
    setSelectedStartDay({ day: '' })
  }
}
