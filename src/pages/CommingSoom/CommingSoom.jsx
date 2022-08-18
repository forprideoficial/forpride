
import { useContext } from 'react'
import { AuthContext } from '../../contexts/Auth'
import './commingSoom.css'
import logo from '../../assets/images/logo.png'
import { FiCheckCircle } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom';

function CommingSoom() {
    const navigate = useNavigate()

    function handleInvite() {
        navigate(`/Invitation`)
      }


    const {logout} = useContext(AuthContext)
    return (
        <div className="content">
            <div className="commingsoom">
                <div className="title">
                    <img src={logo} alt="" />
                    <h2>Parabéns! <br /> Você já está cadastrado na Foursome. <br />Nosso lançamento está próximo</h2>

                    <h3>Enquanto não lançamos você pode:</h3>
                    <div className="orientations">
                    <h4>< FiCheckCircle/> Ficar ansioso</h4>
                    <h4>< FiCheckCircle/> Convidar seus melhores amigos</h4>
                    <h4>< FiCheckCircle/> Ficar ligado em nossas novidades</h4>
                    <h4>< FiCheckCircle/> Seguir nosso Tiktok:  <a href="https://www.tiktok.com/@foursomeoficial" target="_blank" rel="noreferrer">Abrir Tiktok</a> </h4>
                    </div>
                </div>
                <div className="button">
                <button className="convite" onClick={handleInvite}>Convidar um amigo</button>
                <button  onClick={logout}>Sair</button>
                </div>    
            </div>
        </div>
    )
}

export {CommingSoom}