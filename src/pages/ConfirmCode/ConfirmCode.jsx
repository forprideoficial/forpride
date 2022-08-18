import { useContext, useEffect, useState } from 'react';
import logoImg from '../../assets/images/logo.png'
import { AuthContext } from '../../contexts/Auth';
import { useNavigate } from 'react-router-dom';

import './confirmCode.css';

function ConfirmCode() {
  const  {} = useContext(AuthContext)
  const [code, setCode] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
      if(localStorage.getItem("forpride") !== null) {
        navigate("/loader")
      }
    },[navigate])


  function handleCreateAccount(e) {
    e.preventDefault();
   
  }

  return (
    <div className="content-Login">
      <div className="signIn">
      <div className="logo">
        <img src={logoImg} alt="Logo forpride" />
        <br />
        </div>
        <div className="form">
          <div className="title">
            <h3>DIGITE O CÓDIGO DE RECUPERAÇÃO</h3>
          </div>
          <input type="text" placeholder="Digite o código aqui" value={code} onChange={(e) => setCode(e.target.value)}/>

          <div className="buttons">
          <button onClick={handleCreateAccount}> Confirmar </button>


          </div>
        </div>
      </div>
    </div>
  )
}

export { ConfirmCode }