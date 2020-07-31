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
`
const HeadlineStyled = styled.h1``
