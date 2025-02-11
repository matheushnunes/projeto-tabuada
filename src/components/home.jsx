// Bibliotecas:
import { useMediaQuery } from 'react-responsive';
import { useEffect, useState, useRef, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Icones:
import icone_setings from '../assets/images/icone_setings.svg'

// Componentes:
import Header from './header';
import Footer from './footer';
import Equation  from './equation';
import EquationSetings from './equationSetings';
import GoTabuadas from './goTabuada';
import { ContextProvider, StatesContext } from '../routes';

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
  const { onSetings, setOnSetings, isDarkTheme } = useContext(StatesContext)

  const main = useRef(null)

  function handleCLick() {
    setOnSetings(!onSetings)
  }

  return (
    <main ref={main}>
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
              <img 
              src={icone_setings} 
              className={!isDarkTheme? 'img_invert' : 'img'} />  
            </button>
            <Equation />
          </>
        }
      </section>
      <GoTabuadas />
    </main>
  )
}
  