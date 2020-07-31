import React from 'react'
import styled from 'styled-components/macro'
import Calender from './Calender'

export default function CalendarPage({
  bookingData,
  dataCurrentYear,
  dataNextYear,
  currentYear,
  setIsBookingInProgress,
}) {
  return (
    <MainStyled>
      <YearStyled>{currentYear}</YearStyled>
      {bookingData &&
        dataCurrentYear.map((month) => (
          <Calender month={month} bookFlat={bookFlat} />
        ))}
      <YearStyled>{currentYear + 1}</YearStyled>
      {bookingData &&
        dataNextYear.map((month) => (
          <Calender month={month} bookFlat={bookFlat} />
        ))}
    </MainStyled>
  )
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
