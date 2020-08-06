import React from 'react'
import { useState } from 'react'

export default function BookingWindow({
  isBookingWindowOpen,
  selectedStartMonth,
  selectedStartDay,
  setSelectedStartDay,
  setStartMonth,
  bookingData,
  possibleBookingPeriod,
  selectedEndMonth,
  setSelectedEndMonth,
  selectedEndDay,
  setSelectedEndDay,
  bookFlat,
}) {
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
          <select
            name=""
            id="end"
            onChange={(event) =>
              setSelectedEndMonth(
                possibleBookingPeriod.find(
                  (month) => month.month == event.target.value
                )
              )
            }
          >
            {possibleBookingPeriod.map((month) => (
              <option value={month.month}>{month.monthName}</option>
            ))}
          </select>
          {selectedEndMonth && (
            <select
              name=""
              id=""
              value={selectedEndDay.day}
              onChange={(event) =>
                setSelectedEndDay(
                  selectedEndMonth.days.find(
                    (day) => day.day == event.target.value
                  )
                )
              }
            >
              <option value=""></option>
              {selectedEndMonth.days.map((day) => (
                <option value={day.day}>{day.day}</option>
              ))}
            </select>
          )}
          <button onClick={bookFlat}>Buchen</button>
        </>
      )}
    </>
  )
  function setStartDay(day) {
    let selectedDay = day
    if (selectedStartMonth.days.find((day) => day.day == selectedDay)) {
      alert('Tag is bereits gebucht.')
    } else {
      setSelectedStartDay(
        selectedStartMonth.days.find((day) => day.day == selectedDay)
      )
    }
  }
  function selectStartMonth(month) {
    setStartMonth(month)
    setSelectedStartDay({ day: '' })
  }
}
