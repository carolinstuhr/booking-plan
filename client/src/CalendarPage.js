import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import Calender from './Calender'
import BookingWindow from './BookingWindow'

export default function CalendarPage({
  bookingData,
  dataCurrentYear,
  dataNextYear,
  currentYear,
  setIsBookingInProgress,
}) {
  const [isBookingWindowOpen, setIsBookingWindowOpen] = useState(false)
  const [selectedStartMonth, setSelectedStartMonth] = useState()
  const [selectedStartDay, setSelectedStartDay] = useState()

  return (
    <MainStyled>
      <BookingWindow
        isBookingWindowOpen={isBookingWindowOpen}
        dataCurrentYear={dataCurrentYear}
        dataNextYear={dataNextYear}
        selectedStartMonth={selectedStartMonth}
        setSelectedStartMonth={setSelectedStartMonth}
        selectedStartDay={selectedStartDay}
        setSelectedStartDay={setSelectedStartDay}
        setStartMonth={setStartMonth}
      />
      <YearStyled>{currentYear}</YearStyled>
      {bookingData &&
        dataCurrentYear.map((month) => (
          <Calender month={month} openBookingWindow={openBookingWindow} />
        ))}
      <YearStyled>{currentYear + 1}</YearStyled>
      {bookingData &&
        dataNextYear.map((month) => (
          <Calender month={month} openBookingWindow={openBookingWindow} />
        ))}
    </MainStyled>
  )
  function setStartMonth(month) {
    let selectedMonth = month
    setSelectedStartMonth(
      dataCurrentYear.find((month) => month.month == selectedMonth) ||
        dataNextYear.find((month) => month.month == selectedMonth)
    )
  }

  function openBookingWindow(day, month) {
    setIsBookingWindowOpen(true)
    setStartMonth(month.month)
    setSelectedStartDay(day)
  }

  function bookFlat(month, day) {
    if (day.isBooked) {
      alert('Tag ist bereits gebucht')
    }
    setIsBookingInProgress(true)
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

    const urlencoded = new URLSearchParams()
    urlencoded.append('monthId', month)
    urlencoded.append('day', day.day)
    urlencoded.append('bookerName', 'Caro')

    const requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow',
    }

    fetch('http://localhost:8080/months', requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .then(() => setIsBookingInProgress(false))
      .catch((error) => console.log('error', error))
  }
}

const MainStyled = styled.main`
  text-align: center;
`

const YearStyled = styled.p`
  font-weight: 500;
  font-size: 22px;
`
