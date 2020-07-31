import React from 'react'
import styled from 'styled-components/macro'

export default function Header() {
  return (
    <HeaderStyled>
      <HeadlineStyled>Belegungsplan Sylt</HeadlineStyled>
    </HeaderStyled>
  )
}
const HeaderStyled = styled.header`
  text-align: center;
  background: #e0e4e8;
  margin-top: 0;
`
const HeadlineStyled = styled.h1`
  font-family: 'Merienda', cursive;
  margin-top: 0;
  padding: 8px;
`
