import React from 'react'
import styled from 'styled-components/macro'
import { GiJugglingSeal } from 'react-icons/gi'
import { FaUmbrellaBeach } from 'react-icons/fa'
import { GrAnchor } from 'react-icons/gr'

export default function ConfirmationWinow({
  isConfirmationWindowOpen,
  bookingPeriod,
  setIsConfirmationWindowOpen,
}) {
  return (
    <>
      {isConfirmationWindowOpen && (
        <WindowSection>
          <p>
            Auf geht's nach Sylt vom {bookingPeriod[0].days[0].day}
            {'. '}
            {bookingPeriod[0].monthName} {bookingPeriod[0].year} bis zum{' '}
            {
              bookingPeriod[bookingPeriod.length - 1].days[
                bookingPeriod[0].days.length - 1
              ].day
            }
            {'. '}
            {bookingPeriod[bookingPeriod.length - 1].monthName}{' '}
            {bookingPeriod[bookingPeriod.length - 1].year}
          </p>
          <GiJugglingSeal />
          <FaUmbrellaBeach />
          <GrAnchor />
          <br />
          <button onClick={() => setIsConfirmationWindowOpen(false)}>
            Alles klar!
          </button>
        </WindowSection>
      )}
    </>
  )
}

const WindowSection = styled.section`
  position: absolute;
  text-align: center;
  top: 180px;
  left: 46px;
  background: #f7f8f9;
  opacity: 1;
  padding: 8px;
  z-index: 2;
  border-radius: 4px;
  width: 280px;

  button {
    background: #032b45;
    padding: 8px;
    color: white;
    border-radius: 8px;
    margin-top: 8px;
  }
`
