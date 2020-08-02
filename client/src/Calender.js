import React from 'react'
import styled from 'styled-components/macro'

export default function Calender({ month, bookFlat, setIsBookingWindowOpen }) {
  const weekdays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']

  return (
    <>
      <p>{month.monthName}</p>
      <CalenderSection>
        <WeekdaySection>
          {weekdays.map((weekday) => (
            <WeekdaysStyled>{weekday}</WeekdaysStyled>
          ))}
        </WeekdaySection>
        <DaysSection>
          {month.emptyDays.amount.map((day) => (
            <span>{day}</span>
          ))}
          {month.days.map((day) => (
            <>
              <DateStyled
                isBooked={day.isBooked}
                onClick={() => setIsBookingWindowOpen(true)}
              >
                {day.day}
              </DateStyled>
            </>
          ))}
        </DaysSection>
      </CalenderSection>
    </>
  )
}
const WeekdaysStyled = styled.span`
  padding: 4px;
  background: #032b45;
  color: #e0e4e8;
`

const DateStyled = styled.span`
  background: ${(props) => (props.isBooked ? '#941523' : '#2c6225')};
  padding: 4px;
  color: #e0e4e8;
  cursor: default;
`

const CalenderSection = styled.section`
  display: inline-grid;
  grid-template-rows: auto auto;
`

const WeekdaySection = styled.section`
  border: 1px solid #032b45;
  margin-bottom: 2px;
  display: inline-grid;
  grid-template-columns: repeat(7, 30px);
  justify-content: center;
`

const DaysSection = styled.section`
  display: inline-grid;
  grid-template-columns: repeat(7, 30px);
  justify-content: center;
  border: 1px solid #032b45;
  row-gap: 2px;
`
