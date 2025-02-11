import { useContext, useEffect, useReducer, useRef, useState } from 'react'
import { StatesContext } from '../routes'
import { useFetcher } from 'react-router-dom'

export default function Equation () {
    // Números e operador selecionados para gerar a equação:  
    const {numbers1, numbers2, operator} = useContext(StatesContext)
    
    const [randomNumber1, setRandomNumber1] = useState() // Número gerado para a equação
    const [randomNumber2, setRandomNumber2] = useState()

    const [result, setResult] = useState("") //Resultado digitado pelo usuário
    
    const [mensage, setMensage] = useState("") //Mensagem que será apresentada ao usuário caso ele tenha acertado ou não
    const [showMensage, setShowMensage] = useState(false) // Controla a visibilidade da mensagem

    const inputRef = useRef(null) // Referência para o input do resultado
    
    function gerateNumber () {
      // Gera um número aleatório para a equação

      // Colunas onde so haverá os números selecionados:
      let collum1 = []
      let collum2 = []
      
      let num1 = numbers1.filter(e => e.selected) // Pega somente os números selecionados
      num1.map(e => {
        collum1.push(e.number) // Adiciona o número na coluna
      })
      let num2 = numbers2.filter(e => e.selected)
      num2.map(e => {
        collum2.push(e.number)
      })
      
      // Gera um indice aleatório de acordo com o tamanho das colunas:
      const indiceAleatorio1 = Math.floor(Math.random() * num1.length)
      const indiceAleatorio2 = Math.floor(Math.random() * num2.length)
  
      // Atribui o número gerado para a equação
      setRandomNumber1(collum1[indiceAleatorio1])
      setRandomNumber2(collum2[indiceAleatorio2])
    }

    // Chama a função somente ao montar o componente
    useEffect (() => {
      gerateNumber()
    }, [])  

    useEffect(() => {
      // Quando a mensagem for apresentada, cria um timeout para:
      if (showMensage) { // Evita que o timeout seja criado mais de uma vez
        let timer = mensage.includes('acertou') ? 1000 : 2500
        const timeout = setTimeout(() => {
          setMensage("") // Limpa o state da mensagem
          setShowMensage(false)// Oculta a mensagem
          inputRef.current.focus() // Foca no input do resultado
          setResult("") // Limpa o input do resultado
          gerateNumber() // Gera um novo número para a equação
        },timer)
        return () => clearTimeout(timeout) // Limpa o timeout se o componente for desmontado
      }
    }, [showMensage])
  
    function handleChangeResult (e) {
      // Função que modifica o state do input do resultado quando ele for digitado
      setResult(e.target.value)
    }
  
    function handleClickVerfy () {
      const operations = { // Objeto com as funções de cada operação
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        'X': (a, b) => a * b,
        '/': (a, b) => a / b,
      }
      
      if (operations[operator](randomNumber1, randomNumber2) == result) {
        setMensage("Parabéns, acertou!")
      } else {
        setMensage("Errou, resultado correto: " + operations[operator](randomNumber1, randomNumber2))
      }
      
      setShowMensage(true)
    }

    function handleKeyDown (e) {
      if (e.key === 'Enter') {
        handleClickVerfy()
      }
    }
  
    return (
      <div className='div_equation'>
        <p>Digite o resultado da equação</p>
        <span className='equation'>{randomNumber1} {operator} {randomNumber2} ?</span>
        <div className='container_result'>
          Resultado: 
          <input 
            ref={inputRef}
            id='equation_result' 
            type='number'
            max={3}
            onChange={(e) => {handleChangeResult(e)}}
            onKeyDown={handleKeyDown}
            value={result}
          />
          <button 
            className='btn btn1'
            onClick={handleClickVerfy}
          >
            Verificar
          </button>
        </div>
        {showMensage && <p className={mensage.includes('acertou') ? 'acertou' : 'errou'}>{mensage}</p>}
      </div>
    )
  }