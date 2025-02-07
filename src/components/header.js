// Icones e imagens:
import icone_menu from "../assets/images/icone_menu.svg"
import icone_dark_mode from '../assets/images/icone_dark_mode.svg'
import icone_light_mode from '../assets/images/icone_light_mode.svg'
import icone_setings from '../assets/images/icone_setings.svg'

// Bibliotecas:
import { useMediaQuery } from 'react-responsive';
import { useState, useRef, useEffect, createContext, useContext } from 'react';

// Componentes:
import { StatesContext } from "./globalStates";

export default function Header() {
    const isMobile = useMediaQuery({query: '(max-width: 480px)'})
    const [classMenu, setClassMenu] = useState('open')
    const [menuAberto, setMenuAberto] = useState(false)
    const {isDarkTheme, setIsDarkTheme} = useContext(StatesContext)
    const popUp = useRef(null)
    
    function toggleMenu () {
      if (popUp.current) {
        if (classMenu == 'open') {
          setClassMenu('close')
        } else {
          setClassMenu('open')
        }
      }
      if (menuAberto) { // Se o menu estiver aberto
        setClassMenu('close') // Fecha o menu com a animação
        setTimeout(() => { // Apos o fim da animação esconde o menu
          setMenuAberto(!menuAberto)
        }, 200);
      }else {
        setClassMenu('open')
        setMenuAberto(true)
      }
    }

    // Função para fechar o menu quado clicar fora dele
    function handleClickOut (e) {
      console.log(e.target)
      if (popUp.current && !popUp.current.contains(e.target)) {
        toggleMenu()
      }
    } 
   
    // Função para adiconar e remover o event listener da tela:
    useEffect(() => {
      // Adiciona o event listener quando o menu está aberto
      if (menuAberto) {
        document.addEventListener('mousedown', handleClickOut);
      } else {
        document.removeEventListener('mousedown', handleClickOut)
      }

      // Limpa o event listener quando o componente é desmontado
      return () => {
        document.removeEventListener('mousedown', handleClickOut);
      };
    }, [menuAberto]);

    // Função para alternar entre temas:
    function handleTheme () {
      const root = document.documentElement;
      setIsDarkTheme(!isDarkTheme)

      // Altera as variáveis CSS
      if (isDarkTheme) { // Se o tema estiver escuro
        root.style.setProperty('--main_color', '#292929');
        root.style.setProperty('--secondary_color', '#ffffff');
        root.style.setProperty('--primary_color', '#000957');
        root.style.setProperty('--primary_color_light', '#353744');
        root.style.setProperty('--primary_color_medium', '#000E8B');
        root.style.setProperty('--complementary_color', '#835e00');
        root.style.setProperty('--background-color', '#3c3c3c');
        root.style.setProperty('--background_page_color', '#353744');
        root.style.setProperty('--ok_color', '#a0ffa0');
        root.style.setProperty('--error_color', '#ffd3d3');
      } else { // Se o tema estiver claro
        root.style.setProperty('--main_color', '#fff');
        root.style.setProperty('--secondary_color', '#000');
        root.style.setProperty('--primary_color', '#000E8B');
        root.style.setProperty('--primary_color_light', '#CED6FD');
        root.style.setProperty('--primary_color_medium', '#000E8B');
        root.style.setProperty('--complementary_color', '#C28B00');
        root.style.setProperty('--background-color', '#F0F0F0');
        root.style.setProperty('--background_page_color', '#E5EAFF');
        root.style.setProperty('--ok_color', '#007500');
        root.style.setProperty('--error_color', '#630000');
      }
    }

    return(
      <>
        <header className='header'>
          {/* Se tamanho da tela for menor que 480px:   */}
          {isMobile ? 
            <>
              <button className='btn' onClick={toggleMenu}>
                <img src={icone_menu} />
              </button>
            </>
            : 
            <nav className='nav'>
              <MenuNav />
            </nav>
          }
          <button className='btn' onClick={handleTheme}>
            {isDarkTheme ?
              <img src={icone_dark_mode} /> 
            : 
              <img src={icone_light_mode} />}

          </button>
        </header>
        
        {/* Se a tela for menor que 480px e o botão do menu for clicado */}
        {/* O menu dropdown irá aparecer */}
        {(isMobile && menuAberto) && 
          <div 
            className={'popUp_header '+ classMenu} 
            ref={popUp}
          >
            <MenuNav />
          </div>
        }
      </>
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