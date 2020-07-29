import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'

export default function App() {
  const [bookingData, setBookingData] = useState([])
  const [dataCurrentYear, setDataCurrentYear] = useState([])
  const [dataNextYear, setDataNextYear] = useState([])

  const today = new Date()
  const day = today.getDate()
  const currentMonth = today.getMonth() + 1
  const currentYear = today.getFullYear()

  let emptyDays = []

  useEffect(() => {
    fetch('http://localhost:8080/months')
      .then((res) => res.json())
      .then((data) => setBookingData(data))
      .catch((error) => console.log('error', error))
  }, [])

  useEffect(() => {
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
      console.log('month', newMonth)
      console.log('firstDay', firstDay)
      for (let i = 0; i < firstDay; i++) {
        amount.push('')
      }
      emptyDays = [...emptyDays, { month: newMonth, amount: amount }]
    }

    setDataCurrentYear(
      bookingData
        .filter((month) => month.month >= currentMonth)
        .map(function (month) {
          let thisMonth = month.month
          return {
            ...month,
            emptyDays: emptyDays.find((month) => month.month === thisMonth),
          }
        })
    )

    setDataNextYear(
      bookingData
        .filter((month) => month.month < currentMonth)
        .map(function (month) {
          let thisMonth = month.month
          return {
            ...month,
            emptyDays: emptyDays.find((month) => month.month === thisMonth),
          }
        })
    )
  }, [bookingData])

  console.log(dataNextYear)
  console.log(dataCurrentYear)
  console.log(currentMonth)

  return (
    <>
      <header>Belegungsplan Sylt</header>
      <p>{currentYear}</p>
      {bookingData &&
        dataCurrentYear.map((month) => (
          <>
            <p>{month.monthName}</p>
            <CalenderSection>
              <span>Mo</span>
              <span>Di</span>
              <span>Mi</span>
              <span>Do</span>
              <span>Fr</span>
              <span>Sa</span>
              <span>So</span>
              {month.emptyDays.amount.map((day) => (
                <span>{day}</span>
              ))}
              {month.days.map((day) => (
                <>
                  <DateStyled isBooked={day.isBooked}>{day.day}</DateStyled>
                </>
              ))}
            </CalenderSection>
          </>
        ))}
      <p>{currentYear + 1}</p>
      {bookingData &&
        dataNextYear.map((month) => (
          <>
            <p>{month.monthName}</p>
            <CalenderSection>
              <span>Mo</span>
              <span>Di</span>
              <span>Mi</span>
              <span>Do</span>
              <span>Fr</span>
              <span>Sa</span>
              <span>So</span>
              {month.emptyDays.amount.map((day) => (
                <span>{day}</span>
              ))}
              {month.days.map((day) => (
                <>
                  <DateStyled isBooked={day.isBooked}>{day.day}</DateStyled>
                </>
              ))}
            </CalenderSection>
          </>
        ))}
    </>
  )
}
const DateStyled = styled.span`
  background: ${(props) => (props.isBooked ? 'red' : 'green')};
  margin-left: 4px;
  padding: 4px;
`

const CalenderSection = styled.section`
  display: grid;
  grid-template-columns: repeat(7, 30px);
`
