import { useContext, useEffect, useState } from 'react';
import logoImg from '../../assets/images/logo.png'
import { AuthContext } from '../../contexts/Auth';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'

// import './recuperationUser.css';

function RecuperationUser() {
  const  {recuperationUserForEmail} = useContext(AuthContext)
  const [email, setEmail] = useState("");


  const navigate = useNavigate();

  useEffect(() => {
      if(localStorage.getItem("forpride") !== null) {
        window.open("/feed")
      }
    },[navigate])


  function handleCreateCodeRecuperation(e) {
    e.preventDefault();
 recuperationUserForEmail(email)
  }

  return (
    <div className="content-Login1">
      <div className="signIn">
      <div className="logo">
        <img src={logoImg} alt="Logo Foursome" />
        <br />
        </div>
        <div className="form">
          <div className="title">
            <h3>DIGITE SEU E-MAIL DE CADASTRO</h3>
          </div>
          <input type="text" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>

          <div className="buttons">
          <button onClick={handleCreateCodeRecuperation}> Receber por e-mail </button>


          </div>
        </div>
      </div>
    </div>
  )
}

export { RecuperationUser }