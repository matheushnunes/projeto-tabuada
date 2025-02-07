// bibliotecas
import React, { useState, useEffect, useContext } from 'react'
import { StatesContext } from './globalStates'

export default function EquationSetings () {
    const { 
      numbers1, 
      setNumbers1, 
      numbers2, 
      setNumbers2,
      onSetings,
      setOnSetings,
      operator,
      setOperator 
    } = useContext(StatesContext)
  
    // Botões que selecionam ou desselecionam todos os números
    const [selectAll1, setSelectAll1] = useState(true)
    const [selectAll2, setSelectAll2] = useState(true)
  
    // Marca ou desmarca os selects all de acordo com
    // A quantidade de checkboxes marcados na primeira coluna
    useEffect(() => {
      const checked = [] 
      numbers1.map(e => {
        // Pega somente os valores booleanos dos checkboxes
        checked.push(e.selected)
      }) 
      // Retorna true se todos os valores do "checked" forem true:
      const allChecked = checked.every(e => e) 
      setSelectAll1(allChecked)
    }, [numbers1])
  
    // Segunda coluna
    useEffect(() => {
      const checked = []
      numbers2.map(e => {
        checked.push(e.selected)
      })
      const allChecked = checked.every(e => e)
      setSelectAll2(allChecked)
    })
  
    // Função que seleciona e desseleciona os inputs "Select All"
    // E modifica todos os checkboxes dos números de acordo com o "Select All" 
    function handleChangeSelectAll (
      setNumber, // função que altera os inputs checkboxes com seus números
      setSelectAll, // Função que atera a state do input "selecionar todos"
      selectAll // estado atual do input "selecionar todos"
    ) {
      setSelectAll(!selectAll) // Modifica o estado do selectAll
      setNumber(numbers1.map(n => {
        // Modifica o estado de todos os inputs checkbox de acordo com o estado do selectAll
        return(
          {
            number: n.number, // Mantem o número
            selected: !selectAll // Altera o input 
          }
        )
      }))
    }
  
    // Função que seleciona e desseleciona os inputs das 2 colunas
    function handleChangeNumber (
      setNumber, // Função para modificar state do input
      number, // Coluna atual selecionado
      actualNumber // Número atual selecionado
    ) {
      setNumber(number.map(n => {
        // Altera somente o número atual selecionado 
        if (n.number === actualNumber) {
          return (
            {number: n.number, selected: !n.selected}
          )
        } else { // Se não for o número atual retorna o objeto sem alterações
          return (
            {...n}
          )
        }
      }))
    }
  
    function handleChangeOperator(e) {
      setOperator(e.target.value)
    }
  
    function handleSubmit(e) {
      e.preventDefault()
      setOnSetings(false)
    }
  
    return (
      <form className='equationSetings' onSubmit={handleSubmit}>
        <p>Selecione os números a serem usados nas equações</p>
  
        <div className='container_select_all'>
          <label htmlFor="selectAllfirst">
            <input 
              type='checkbox' 
              id='selectAllfirst'
              checked={selectAll1}
              onChange={() => {handleChangeSelectAll(setNumbers1, setSelectAll1, selectAll1)}} 
            />
            <span>Selecionar tudo</span>
          </label>
  
          <label htmlFor="selectAllLast">
            <span  className='text_align_right'>Selecionar tudo</span>
            <input
              type='checkbox'
              id="selectAllLast"
              checked={selectAll2}
              onChange={() => {handleChangeSelectAll(setNumbers2, setSelectAll2, selectAll2)}}
            />
          </label>
        </div>
  
        <div className='container_select_numbers'>
          <div className='select_numbers' id='select_number1'>
            {numbers1.map(c => {
              return (
                <label key={"n1"+c.number} htmlFor={"checkbox1_"+c.number}>
                  <input 
                    type='checkbox' 
                    id={"checkbox1_"+c.number}
                    checked={c.selected}
                    onChange={() => {handleChangeNumber(setNumbers1, numbers1, c.number)}}
                  />
                  <span>{c.number}</span>
                </label>
              )
            })}
          </div>
  
          <label htmlFor='select_operator' className='container_select_operator'>
            Selecione o operador:
            <select 
              id='select_operator' 
              onChange={(e) => {handleChangeOperator(e)}}
              value={operator}
            >
              <option value={"x"}>x</option>
              <option value={"/"}>/</option>
              <option value={"-"}>-</option>
              <option value={"+"}>+</option>
            </select>
          </label>
  
          <div className='select_numbers' id='select_number2'>
            {numbers2.map(c => {
              return (
                <label key={"n2"+c.number} htmlFor={"checkbox2_"+c.number}>
                  <span>{c.number}</span>
                  <input 
                    type='checkbox' 
                    id={"checkbox2_"+c.number}
                    checked={c.selected}
                    onChange={() => {handleChangeNumber(setNumbers2, numbers2, c.number)}}
                  />
                </label>
              )
            })}
          </div>
        </div>
        <button className='btn btn1 btn_apply'>
          Aplicar
        </button>
      </form>
    )
  }