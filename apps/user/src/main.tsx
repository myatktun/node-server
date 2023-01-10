import { StrictMode } from "react"
import * as ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

import App from "./app/app"
import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
    <StrictMode>
        <BrowserRouter>
            <App />
            <GlobalStyle />
        </BrowserRouter>
    </StrictMode>
)
