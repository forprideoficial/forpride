import { useParams } from 'react-router-dom';
import logoImg from '../../assets/images/logo.png'
import image1 from '../../assets/images/slider/10.jpg';

import './recuperationUserResult.css';

function RecuperationUserResult() {
  const {username} = useParams()

  function handleRedirectToLogin(e) {
    e.preventDefault();
   window.open("/","_self")
  }

  return (
    <div className="content-Login">
            <div className="bloco2">
      <div className="logo">
        <img src={logoImg} alt="Logo forpride" />
        <br />
        </div>
        <div className="form">
          <div className="title2">
            <h3>{username}</h3>
          </div>

          <div className="buttons">
          <button onClick={handleRedirectToLogin}> Voltar para o login </button>


        </div>
      </div>
            </div>
      <div className="slide">
      <div className="images" key={image1}>
            <img src={image1} alt="" />
        </div>
      </div>
    </div>
  )
}

export { RecuperationUserResult }