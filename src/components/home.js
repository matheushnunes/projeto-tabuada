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
    return (
      <form className='equationSetings'>
        <p>Selecione os números a serem usados nas equações</p>
        <div className='container_select_all'>
          <label htmlFor="selectAllfirst">
            <input type='checkbox' id='selectAllfirst' />
            <span>Selecionar tudo</span>
          </label>
          <label htmlFor="selectAllLast">
            <span>Selecionar tudo</span>
            <input type='checkbox' id="selectAllLast" />
          </label>
        </div>
        <div className='container_select_numbers'>
          <div className='select_numbers' id='select_number1'>
            {[...Array(11).keys()].map(c => (
              <label key={c} htmlFor={"checkbox1_"+c}>
                <input type='checkbox' id={"checkbox1_"+c}/>
                <span>{c}</span>
              </label>
            ))}
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
            {[...Array(11).keys()].map(c => (
              <label key={c} htmlFor={"checkbox2_"+c}>
                <span>{c}</span>
                <input type='checkbox' id={"checkbox2_"+c}/>
              </label>
            ))}
          </div>
        </div>
        <button className='btn btn1 btn_apply'>Aplicar</button>
      </form>
    )
  }
  
  

  