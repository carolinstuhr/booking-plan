import React from 'react'
import styled from 'styled-components/macro'

export default function Calender({ month, bookFlat }) {
  return (
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
            <DateStyled
              isBooked={day.isBooked}
              onClick={() => bookFlat(month._id, day.day)}
            >
              {day.day}
            </DateStyled>
          </>
        ))}
      </CalenderSection>
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
  justify-content: center;
`
