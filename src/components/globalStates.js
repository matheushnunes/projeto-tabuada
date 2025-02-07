import { createContext, useContext, useState } from "react"

const StatesContext = createContext()

function ContextProvider ({ children }) {
  const [numbers1, setNumbers1] = useState([
    {number: 0, selected: true},
    {number: 1, selected: true},
    {number: 2, selected: true},
    {number: 3, selected: true},
    {number: 4, selected: true},
    {number: 5, selected: true},
    {number: 6, selected: true},
    {number: 7, selected: true},
    {number: 8, selected: true},
    {number: 9, selected: true},
    {number: 10, selected: true},
  ])

  const [onSetings, setOnSetings] = useState(false)

  // Números da direita
  const [numbers2, setNumbers2] = useState([
    {number: 0, selected: true},
    {number: 1, selected: true},
    {number: 2, selected: true},
    {number: 3, selected: true},
    {number: 4, selected: true},
    {number: 5, selected: true},
    {number: 6, selected: true},
    {number: 7, selected: true},
    {number: 8, selected: true},
    {number: 9, selected: true},
    {number: 10, selected: true},
  ])

  // Operador
  const [operator, setOperator] = useState("X")

  // Tema escuro ou claro
  const [isDarkTheme, setIsDarkTheme] = useState(true)

  return (
    <StatesContext.Provider
      value={{
        numbers1,
        setNumbers1,
        numbers2,
        setNumbers2,
        onSetings,
        setOnSetings,
        operator,
        setOperator,
        isDarkTheme,
        setIsDarkTheme
      }}
    >
      {children}
    </StatesContext.Provider>
  )
}

export {StatesContext, ContextProvider}