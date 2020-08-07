import React from 'react'
import styled from 'styled-components/macro'

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
        <BookingSection>
          <StartSection>
            <label htmlFor="start">Start</label>
            <select
              name=""
              id="start"
              onChange={(event) => selectStartMonth(event.target.value)}
              value={selectedStartMonth.month}
            >
              {bookingData.map((month, index) => (
                <>
                  <option value={month.month} key={index}>
                    {month.monthName.charAt(0).toUpperCase() +
                      month.monthName.slice(1)}{' '}
                    {month.year}
                  </option>
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
                {selectedStartMonth.days.map((day, index) => (
                  <option value={day.day} key={index}>
                    {day.day}
                  </option>
                ))}
              </select>
            )}
          </StartSection>
          <EndSection>
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
              {possibleBookingPeriod.map((month, index) => (
                <option value={month.month} key={index}>
                  {month.monthName.charAt(0).toUpperCase() +
                    month.monthName.slice(1)}{' '}
                  {month.year}
                </option>
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
                {selectedEndMonth.days.map((day, index) => (
                  <option value={day.day} key={index}>
                    {day.day}
                  </option>
                ))}
              </select>
            )}
          </EndSection>
          <button onClick={bookFlat}>Buchen</button>
        </BookingSection>
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

const BookingSection = styled.section`
  position: absolute;
  top: 180px;
  left: 74px;
  background: #f7f8f9;
  opacity: 1;
  padding: 20px;
  z-index: 2;
  border-radius: 4px;
  label {
    display: block;
    margin: 8px;
    font-size: 18px;
    font-weight: 600;
  }
  select {
    background: #f7f8f9;
    margin-bottom: 12px;
    color: #032b45;
    padding: 2px;
    border-radius: 4px;
    font-size: 14px;
  }
  button {
    background: #032b45;
    padding: 8px;
    color: white;
    border-radius: 8px;
    margin-top: 8px;
    font-size: 14px;
  }
`
const StartSection = styled.section``
const EndSection = styled.section``
