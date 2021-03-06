import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import Calender from './Calender'
import BookingWindow from './BookingWindow'
import ConfirmationWindow from './ConfirmationWinow'

export default function CalendarPage({
  currentYear,
  setIsBookingInProgress,
  bookingData,
}) {
  const [isBookingWindowOpen, setIsBookingWindowOpen] = useState(false)
  const [isConfirmationWindowOpen, setIsConfirmationWindowOpen] = useState(
    false
  )
  const [selectedStartMonth, setSelectedStartMonth] = useState()
  const [selectedStartDay, setSelectedStartDay] = useState()
  const [selectedEndMonth, setSelectedEndMonth] = useState()
  const [selectedEndDay, setSelectedEndDay] = useState()
  const [possibleBookingPeriod, setPossibleBookingPeriod] = useState([])
  const [firstBookedMonth, setFirstBookedMonth] = useState()
  const [bookingDataChanged, setoBokingDataChanged] = useState(false)
  const [firstBookedDay, setFirstBookedDay] = useState()
  const [bookingPeriod, setBookingPeriod] = useState([])

  useEffect(() => {
    setoBokingDataChanged(false)
    setPossibleBookingPeriod(
      bookingData
        .filter((month) => month.year >= selectedStartMonth.year)
        .filter((month) =>
          month.year > selectedStartMonth.year
            ? month
            : month.month >= selectedStartMonth.month
        )
        .map((month) =>
          month.month === selectedStartMonth.month
            ? {
                ...month,
                days: month.days.filter(
                  (day) => day.day >= selectedStartDay.day
                ),
              }
            : month
        )
    )
    setTimeout(() => setoBokingDataChanged(true), 0)
  }, [selectedStartDay])

  useEffect(() => {
    setFirstBookedMonth(
      possibleBookingPeriod.find((month) =>
        month.days.find((day) => day.isBooked)
      )
    )
  }, [bookingDataChanged])

  useEffect(() => {
    firstBookedMonth &&
      setFirstBookedDay(firstBookedMonth.days.find((day) => day.isBooked))
  }, [firstBookedMonth])

  useEffect(() => {
    if (firstBookedMonth) {
      setPossibleBookingPeriod(
        possibleBookingPeriod
          .filter((month) => month.year <= firstBookedMonth.year)
          .filter((month) =>
            month.year < firstBookedMonth.year
              ? month
              : month.month <= firstBookedMonth.month
          )
          .map((month) =>
            month.month === firstBookedMonth.month
              ? {
                  ...month,
                  days: month.days.filter(
                    (day) => day.day < firstBookedDay.day
                  ),
                }
              : month
          )
      )
    }
  }, [firstBookedDay])

  useEffect(() => {
    setSelectedEndMonth(
      possibleBookingPeriod.find(
        (month) => month.month == selectedStartMonth.month
      )
    )
  }, [possibleBookingPeriod])

  useEffect(() => {
    selectedEndMonth &&
      setBookingPeriod(
        possibleBookingPeriod
          .filter((month) =>
            month.year < selectedEndMonth.year
              ? month
              : month.month <= selectedEndMonth.month
          )
          .map((month) =>
            month.month == selectedEndMonth.month
              ? {
                  ...month,
                  days: month.days.filter(
                    (day) => day.day <= selectedEndDay.day
                  ),
                }
              : month
          )
      )
  }, [possibleBookingPeriod, selectedEndMonth, selectedEndDay])

  return (
    <MainStyled>
      <BookingWindow
        isBookingWindowOpen={isBookingWindowOpen}
        selectedStartMonth={selectedStartMonth}
        selectedStartDay={selectedStartDay}
        setSelectedStartDay={setSelectedStartDay}
        setStartMonth={setStartMonth}
        bookingData={bookingData}
        possibleBookingPeriod={possibleBookingPeriod}
        selectedEndMonth={selectedEndMonth}
        setSelectedEndMonth={setSelectedEndMonth}
        selectedEndDay={selectedEndDay}
        setSelectedEndDay={setSelectedEndDay}
        bookFlat={bookFlat}
      />
      <ConfirmationWindow
        isConfirmationWindowOpen={isConfirmationWindowOpen}
        bookingPeriod={bookingPeriod}
        setIsConfirmationWindowOpen={setIsConfirmationWindowOpen}
      />
      <CalenderSection
        isBookingWindowOpen={isBookingWindowOpen}
        isConfirmationWindowOpen={isConfirmationWindowOpen}
      >
        <YearStyled>{currentYear}</YearStyled>
        {bookingData &&
          bookingData.map((month, index) => (
            <>
              {month.month === 1 && bookingData[0].month !== 1 ? (
                <YearStyled>{currentYear + 1}</YearStyled>
              ) : (
                ''
              )}
              <Calender
                month={month}
                openBookingWindow={openBookingWindow}
                currentYear={currentYear}
                key={index}
              />
            </>
          ))}
      </CalenderSection>
    </MainStyled>
  )
  function setStartMonth(month) {
    let selectedMonth = month
    setSelectedStartMonth(
      bookingData.find((month) => month.month == selectedMonth)
    )
  }

  function openBookingWindow(day, month) {
    if (day.isBooked) {
      alert('Tag is bereits gebucht.')
    } else {
      setIsBookingWindowOpen(true)
      setStartMonth(month.month)
      setSelectedStartDay(day)
      setSelectedEndDay('')
    }
  }

  function bookFlat() {
    bookingPeriod.forEach((month) =>
      month.days.forEach((day) => {
        sendAPIRequest(month, day)
      })
    )
    setIsBookingWindowOpen(false)
    setIsConfirmationWindowOpen(true)
  }

  function sendAPIRequest(month, day) {
    setIsBookingInProgress(true)
    console.log(month._id)
    console.log(day.day)
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

    const urlencoded = new URLSearchParams()
    urlencoded.append('monthId', month._id)
    urlencoded.append('day', day.day)
    urlencoded.append('bookerName', 'Caro')

    const requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow',
    }
    if (month.year === currentYear) {
      fetch('http://localhost:8080/currentyear', requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .then(() => setIsBookingInProgress(false))
        .catch((error) => console.log('error', error))
    } else {
      fetch('http://localhost:8080/nextyear', requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .then(() => setIsBookingInProgress(false))
        .catch((error) => console.log('error', error))
    }
  }
}

const MainStyled = styled.main`
  text-align: center;
`
const CalenderSection = styled.section`
  opacity: ${(props) =>
    props.isBookingWindowOpen || props.isConfirmationWindowOpen ? 0.3 : 1};
`

const YearStyled = styled.p`
  font-weight: 500;
  font-size: 22px;
`
