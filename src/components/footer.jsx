import icone_github from '../assets/images/icone_github.png'

export default function Footer () {
    return (
        <footer>
            <p>Desenvolvido por: <a href='https://github.com/matheushnunes' target='_blank' rel='external'> <img src={icone_github} className='icone icone_github' /> matheushnunes</a></p>
        </footer>
    )
}