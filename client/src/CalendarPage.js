import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import Calender from './Calender'
import BookingWindow from './BookingWindow'

export default function CalendarPage({
  currentYear,
  setIsBookingInProgress,
  bookingData,
}) {
  const [isBookingWindowOpen, setIsBookingWindowOpen] = useState(false)
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

  console.log('bookingPeriod', bookingPeriod)
  console.log('possibleBookingPeriod', possibleBookingPeriod)

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
      <YearStyled>{currentYear}</YearStyled>
      {bookingData &&
        bookingData.map((month) => (
          <Calender month={month} openBookingWindow={openBookingWindow} />
        ))}
      <YearStyled>{currentYear + 1}</YearStyled>
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

const YearStyled = styled.p`
  font-weight: 500;
  font-size: 22px;
`
