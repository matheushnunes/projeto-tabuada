// Bibliotecas:
import { useParams, useNavigate  } from "react-router-dom"

// Imagens: 
import arrow from '../assets/images/arrow.svg'

// Components:
import Header from './header'
import Footer from './footer'
import GoTabuadas from "./goTabuada"

export default function Tabuada () {
  const navigate = useNavigate()
  let {operatorParam} = useParams()
  let signal = "X"
  let calculate = (a, b) => {
    return a * b
  }

  switch (operatorParam) {
    case "multiplicacao":
      calculate = (a, b) =>{
        return a * b
      }
      operatorParam = "Multiplicação"
      signal = "X"
    break;
    case "divisao":
      calculate = (a, b) =>{
        return parseFloat((a / b).toFixed(2))
      }
      operatorParam = "Divisão"
      signal = "%"
    break;
    case "adicao":
      calculate = (a, b) =>{
        return parseFloat((a + b).toFixed(2))
      }
      operatorParam = "Adição"
      signal = "+"
    break;
    case "subtracao":
      calculate = (a, b) =>{
        return parseFloat((a / b).toFixed(2))
      }
      operatorParam = "Subtração"
      signal = "-"
    break;
  }
    return (
      <>
        <Header />
        <main>
          <button className="btn btn_voltar" onClick={()=>navigate(-1)}>
            <img src={arrow} />
          </button>
          
          <h1 className="title">Tabuada de {operatorParam}</h1>

          <section className="section_tabuadas">
            {[...Array(11).keys()].map(f => (
              <div className="div_tabuada" key={f}> 
                {[...Array(11).keys()].map(l => (
                  <span className="operation" key={l}>{f} {signal} {l} = {calculate(f,l)}</span>
                ))}
              </div>
            ))}
          </section>
        </main>
        <GoTabuadas />
        <Footer />
      </>
    )
  }

  