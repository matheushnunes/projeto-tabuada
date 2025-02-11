import { useLocation, useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState} from 'react';

export default function GoTabuadas () {
    const navigate = useNavigate()
    const {operatorParam} = useParams()
    const location = useLocation() 

    const [tabuada, setTabuada] = useState([
        {id: 1, content: "Multiplicação", param: "multiplicacao", display: 'flex'},
        {id: 2, content: "Divisão", param: "divisao", display: 'flex'},
        {id: 3, content: "Subtração", param: "subtracao", display: 'flex'},
        {id: 4, content: "Adição", param: "adicao", display: 'flex'},
    ])
    
    useEffect(() => {
        setTabuada((e) => 
            e.map((tab) => {
                if (tab.param == operatorParam) {
                    return (
                        {
                            ...tab,
                            display: 'none'
                        }
                    )
                } else {
                    return (
                        {
                            ...tab,
                            display: 'flex'
                        }
                    )
                }

            })
        );
    }, [operatorParam]);

    function handleNavigate (path) {
        // Verifica se a rota atual NÃO é a página inicial
        if (location.pathname !==  '/') {
            navigate(path, { replace: true }) // Substitui a entrada atual no histórico
        } else {
            navigate(path) // Adiciona uma nova entrada no histórico
        }
    }
    
    return (
      <section className='section_goTabuadas'>
        <h2 className='title2'>Tabuadas</h2>

        {tabuada.map(e => {
            return (
                <div
                    key={e.id}
                    className='container_tabuada' 
                    style={{ display: e.display || 'block' }}
                >
                    <p>Tabuada de {e.content}</p>
                    <button 
                        onClick={() => handleNavigate("/Tabuada/"+e.param)}
                        className='btn btn1'
                    >
                        Ver
                    </button>
                </div>
            )
        })}

      </section>
    )
  }