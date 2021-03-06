import React from 'react'
import styled from 'styled-components/macro'
import { GiSeahorse } from 'react-icons/gi'

export default function Calender({ month, openBookingWindow }) {
  const weekdays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']

  return (
    <>
      <MonthStyled>
        <SeahorseStyled />
        <p>
          {month.monthName.charAt(0).toUpperCase() + month.monthName.slice(1)}
        </p>
      </MonthStyled>
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
          {month.days.map((day, index) => (
            <>
              <DateStyled
                isBooked={day.isBooked}
                onClick={() => openBookingWindow(day, month)}
                key={index}
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
const MonthStyled = styled.section`
  margin: 12px;
  margin-top: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    margin: 0;
    margin-left: 4px;
  }
`
const SeahorseStyled = styled(GiSeahorse)``
