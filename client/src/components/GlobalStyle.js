import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

* {
  margin: 0px;
  padding: 0px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

#root {
  min-height: 100vh;
}

body {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

html {
  height: 100%;
}


footer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  margin-top: auto;
  flex-shrink: 0;
  font-size: 13px;
}

footer p {
  margin-bottom: 0;
}

.box-shadow {
  box-shadow: 0 0 4px rgb(143, 141, 141);
}

.full-page {
  min-height: 95vh;
}

input {
  border-radius: 2px;
  border: 0.1px solid black;
}

/* Make search not appear rounded on safari mobile */
input[type="search"] {
  -webkit-appearance: none;
}

/* input:focus{
  outline: none;
  border: 2px solid #fdc108;
} */

.btn:focus{
  outline: none;
  
}

hr {
  margin: 10px 0px 20px 0px;
}

img:-moz-loading {
    visibility: hidden;
}
`;

export default GlobalStyle;
