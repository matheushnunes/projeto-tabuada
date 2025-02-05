// Bibliotecas:
import { useMediaQuery } from 'react-responsive';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Icones:
import icone_setings from '../assets/images/icone_setings.svg'

// Componentes:
import Header from './header';
import Footer from './footer';
import GoTabuadas from './goTabuada';

export default function Home() {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}
  
  function Main () {
    const [onSetings, setOnSetings] = useState(true)
    function handleCLick() {
      setOnSetings(!onSetings)
    }

    return (
      <main>
        <h1 className='title'>Aprenda e teste seus conhecimentos em matemática</h1>
        <section className='section_operation'>
          {
            onSetings ?
            <>
              <button className='btn btn_fechar' onClick={handleCLick} >X</button>
              <EquationSetings />
            </>
            :
            <>
              <button className='btn btn_setings' onClick={handleCLick}> 
                <img src={icone_setings} />  
              </button>
              <Equation />
            </>
          }
        </section>
        <GoTabuadas />
      </main>
    )
  }
  
  function Equation () {
    return (
      <div className='div_equation'>
        <p>Digite o resultado da equação</p>
        <span className='equation'>5 x 8 ?</span>
        <div className='container_result'>
          Resultado: 
          <input id='equation_result' type='number'/>
          <button className='btn btn1'>Verificar</button>
        </div>
        <p className='feedback_result'></p>
      </div>
    )
  }
  
  function EquationSetings () {
    // Botões que selecionam ou desselecionam todos os números
    const [selectAll1, setSelectAll1] = useState(true)
    const [selectAll2, setSelectAll2] = useState(true)

    let allSelected = true

    // Números da esquerda:
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

    // Função que seleciona e desseleciona os inputs das 2 colunas
    function handleChangeSelectAll (id) {
      if (id === 'first') {
        setSelectAll1(!selectAll1)
        setNumbers1(numbers1.map(n => {
          return(
            {
              number: n.number,
              selected: !selectAll1
            }
          )
        }))
      } else {
        setSelectAll2(!selectAll2)
        setNumbers2(numbers2.map(n => {
          return(
            {
              number: n.number,
              selected: !selectAll2
            }
          )
        }))
      }
    }

    function handleChangeNumber (colum, number) {
      if (colum === "first") {
        setNumbers1(numbers1.map(n => {
          if (n.number === number) {
            return (
              {number: n.number, selected: !n.selected}
            )
          } else {
            return (
              {...n}
            )
          }
        }))

        numbers1.forEach(n => {
          if (n.selected) {
            allSelected = true
          } else {
            allSelected = false
          }
        })
        setSelectAll1(allSelected)
      } else {
        setNumbers2(numbers2.map(n => {
          if (n.number === number) {
            return (
              {number: n.number, selected: !n.selected}
            )
          } else {
            return (
              {...n}
            )
          }
        }))
      }
    }

    return (
      <form className='equationSetings'>
        <p>Selecione os números a serem usados nas equações</p>
        <div className='container_select_all'>
          <label htmlFor="selectAllfirst">
            <input 
              type='checkbox' 
              id='selectAllfirst'
              checked={selectAll1}
              onChange={() => {handleChangeSelectAll('first')}} 
            />
            <span>Selecionar tudo</span>
          </label>
          <label htmlFor="selectAllLast">
            <span>Selecionar tudo</span>
            <input
              type='checkbox'
              id="selectAllLast"
              checked={selectAll2}
              onChange={() => {handleChangeSelectAll('last')}}
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
                    onChange={() => {handleChangeNumber("first",c.number)}}
                  />
                  <span>{c.number}</span>
                </label>
              )
            })}
          </div>
          <label htmlFor='select_operator' className='container_select_operator'>
            Selecione o operador:
            <select id='select_operator'>
              <option>x</option>
              <option>-</option>
              <option>+</option>
              <option>/</option>
            </select>
          </label>
          <div className='select_numbers' id='select_number2'>
            {numbers2.map(c => {
              return (
                <label key={"n2"+c.number} htmlFor={"checkbox2_"+c.number}>
                  <input 
                    type='checkbox' 
                    id={"checkbox2_"+c.number}
                    checked={c.selected}
                    onChange={() => {handleChangeNumber("last",c.number)}}
                  />
                  <span>{c.number}</span>
                </label>
              )
            })}
          </div>
        </div>
        <button className='btn btn1 btn_apply'>Aplicar</button>
      </form>
    )
  }
  
  

  