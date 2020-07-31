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
              onClick={() => bookFlat(month._id, day)}
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
  background: ${(props) => (props.isBooked ? '#941523' : '#2c6225')};
  margin-left: 4px;
  padding: 4px;
  color: #e0e4e8;
`

const CalenderSection = styled.section`
  display: inline-grid;
  grid-template-columns: repeat(7, 30px);
  justify-content: center;
  border: 1px solid #032b45;
`
