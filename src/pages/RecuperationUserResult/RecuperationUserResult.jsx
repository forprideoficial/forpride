import { useParams } from 'react-router-dom';
import logoImg from '../../assets/images/logo.png'

import './recuperationUserResult.css';

function RecuperationUserResult() {
  const {username} = useParams()

  function handleRedirectToLogin(e) {
    e.preventDefault();
   window.open("/","_self")
  }

  return (
    <div className="content-Login1">
      <div className="recuperation">
      <div className="logo">
        <img src={logoImg} alt="Logo forpride" />
        <br />
        </div>
        <div className="form">
          <div className="title2">
            <h3>SEU NOME DE USUÁRIO</h3>
          </div>
          <div className="block">
            <h3>{username}</h3>
          </div>

          <div className="buttons">
          <button onClick={handleRedirectToLogin}> Voltar para o login </button>


          </div>
        </div>
      </div>
    </div>
  )
}

export { RecuperationUserResult }