import { createGlobalStyle } from 'styled-components/macro'

export default createGlobalStyle`
* {
    box-sizing: border-box;
}
body {
    font-family: 'Rajdhani', sans-serif;
    color: #032b45;
    margin: 0;
}
#root {
    display: grid;
    grid-template-rows: 56px auto;
    height: 100vh;
}
main {
    overflow: scroll
}
`
