import { useMediaQuery } from 'react-responsive';

import icone_menu from "../assets/images/icone_menu.svg"
import icone_dark_mode from '../assets/images/icone_dark_mode.svg'
import icone_light_mode from '../assets/images/icone_light_mode.svg'

import { useState } from 'react';

export default function Header() {
    const isMobile = useMediaQuery({query: '(max-width: 480px)'})
    const [displayMenu, setDisplayMenu] = useState('none')

    function toggleMenu () {
      setDisplayMenu(displayMenu === 'block' ? "none" : "block")
    }

    return(
      <header className='header'>
        {/* Se tamanho da tela for menor que 480px:   */}
        {
         isMobile ? 
          <>
            <button className='btn' onClick={toggleMenu}>
              <img src={icone_menu} />
            </button>
            <div className='popUp_header' style={{display: displayMenu}}>
              <MenuNav />
            </div>
          </>
          : 
          <nav className='nav'>
            <MenuNav />
          </nav>
        }
        <button className='btn'>
          <img src={icone_dark_mode} />
        </button>
      </header>
    )
}

function MenuNav () {
    return (
      <ul>
        <li>Inicio</li>
        <li>Sobre</li>
        <li>Contato</li>
      </ul>
    )
  }