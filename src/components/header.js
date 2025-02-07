// Icones e imagens:
import icone_menu from "../assets/images/icone_menu.svg"
import icone_dark_mode from '../assets/images/icone_dark_mode.svg'
import icone_light_mode from '../assets/images/icone_light_mode.svg'
import icone_setings from '../assets/images/icone_setings.svg'

// Bibliotecas:
import { useMediaQuery } from 'react-responsive';
import { useState, useRef, useEffect, createContext, useContext } from 'react';

export default function Header({ setTheme }) {
    const isMobile = useMediaQuery({query: '(max-width: 480px)'})
    const [classMenu, setClassMenu] = useState('open')
    const [menuAberto, setMenuAberto] = useState(false)
    const popUp = useRef(null)
    
    if (setTheme) { // Verifica se a funcao foi passada
      setTheme(isDarkTheme)
    }

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
      // Verifica o tema atual
      const currentBackground = getComputedStyle(root).getPropertyValue('--main_color').trim();
      const isDarkTheme = currentBackground === '#000';

      // Altera as variáveis CSS
      if (isDarkTheme) {
        root.style.setProperty('--main_color', '#fff');
        root.style.setProperty('--secondary-color', '#2ecc71');
        root.style.setProperty('--background-color', '#ffffff');
        root.style.setProperty('--text-color', '#000000');
      } else {
        root.style.setProperty('--main_color', '#000');
        root.style.setProperty('--secondary-color', '#27ae60');
        root.style.setProperty('--background-color', '#333333');
        root.style.setProperty('--text-color', '#ffffff');
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
            <img src={icone_dark_mode} />
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