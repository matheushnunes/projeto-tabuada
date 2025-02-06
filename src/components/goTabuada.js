import { useNavigate, useParams } from 'react-router-dom';
import React, { useRef, useEffect} from 'react';

export default function GoTabuadas () {
    const navigate = useNavigate()
    let {operatorParam} = useParams()
    
    const containerRef = useRef(null)

    useEffect(() => {
    }, [operatorParam])

    function handleNavigate (path) {
        navigate(path)
    }
    
    return (
      <section className='section_goTabuadas'>
        <h2 className='title2'>Tabuadas</h2>

        <div className='container_tabuada' ref={containerRef}>
            <p>Tabuada de multiplicação</p>
            <button 
                onClick={() => handleNavigate("/Tabuada/multiplicacao")} 
                className='btn btn1'
            >
                Ver
            </button>
        </div>

        <div className='container_tabuada' ref={containerRef}>
            <p>Tabuada de Divisão</p>
            <button 
                onClick={() => handleNavigate("/Tabuada/divisao")}
                className='btn btn1'
            >
                Ver
            </button>
        </div>

        <div className='container_tabuada' ref={containerRef}>
            <p>Tabuada de Adição</p>
            <button 
                onClick={() => handleNavigate("/Tabuada/adicao")}
                className='btn btn1'
            >
                Ver
            </button>
        </div>

        <div className='container_tabuada' ref={containerRef}>
            <p>Tabuada de Subtração</p>
            <button 
                onClick={() => handleNavigate("/Tabuada/subtracao")} 
                className='btn btn1'
            >
                Ver
            </button>
        </div>
      </section>
    )
  }