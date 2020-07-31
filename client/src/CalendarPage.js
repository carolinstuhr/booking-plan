import React from 'react'
import styled from 'styled-components/macro'
import Calender from './Calender'

export default function CalendarPage({
  bookingData,
  dataCurrentYear,
  dataNextYear,
  currentYear,
}) {
  return (
    <SectionStyled>
      <p>{currentYear}</p>
      {bookingData &&
        dataCurrentYear.map((month) => (
          <Calender month={month} bookFlat={bookFlat} />
        ))}
      <p>{currentYear + 1}</p>
      {bookingData &&
        dataNextYear.map((month) => (
          <Calender month={month} bookFlat={bookFlat} />
        ))}
    </SectionStyled>
  )
  function bookFlat(month, day) {
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

    const urlencoded = new URLSearchParams()
    urlencoded.append('monthId', month)
    urlencoded.append('day', day)
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
      .catch((error) => console.log('error', error))
  }
}

const SectionStyled = styled.section`
  text-align: center;
`
