import React from 'react'

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
}) {
  console.log(selectedStartMonth)
  console.log(selectedStartDay)

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
    setSelectedStartDay(
      selectedStartMonth.days.find((day) => day.day == selectedDay)
    )
    if (selectedStartDay.isBooked) {
      alert('Tag is bereits gebucht.')
      setSelectedStartDay(oldDay)
    }
  }
  function selectStartMonth(month) {
    setStartMonth(month)
    setSelectedStartDay({ day: '' })
  }
}
