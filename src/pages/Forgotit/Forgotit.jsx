import { useContext, useEffect, useState } from 'react';
import logoImg from '../../assets/images/logo.png'
import { AuthContext } from '../../contexts/Auth';
import { useNavigate } from 'react-router-dom';

// import './forgotit.css';

function Forgotit() {
  const  {loginSession} = useContext(AuthContext)
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  // const number = "21971684632"

  const navigate = useNavigate();

  useEffect(() => {
      if(localStorage.getItem("forpride") !== null) {
        navigate("/feed")
      }
  },[navigate])


  function handleCreateAccount(e) {
    e.preventDefault();
    loginSession({login: login, password:password})
  }

  return (
    <div className="content-Login">
      <div className="signIn">
      <div className="logo">
        <img src={logoImg} alt="Logo forpride" />
        <h2>Seja bem-vindo de volta!</h2>
        <h2>Entre, a diversão está te esperando.</h2>
        </div>
        <div className="form">
          <div className="title">
            <h3>RECUPERE SEUS DADOS DE ACESSO</h3>
          </div>
          <input type="date" placeholder="Data de nascimento" value={login} onChange={(e) => setLogin(e.target.value)}/>
          <input type="text" placeholder="Telefone" value={password} onChange={(e) => setPassword(e.target.value)}/>

          <div className="buttons">
          <button onClick={handleCreateAccount}> Recuperar </button>


          </div>
        </div>
      </div>
    </div>
  )
}

export { Forgotit }