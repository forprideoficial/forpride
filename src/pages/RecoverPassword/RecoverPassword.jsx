import { useContext, useEffect, useState } from 'react';
import logoImg from '../../assets/images/logo.png'
import { AuthContext } from '../../contexts/Auth';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import './recoverPassword.css';

function RecoverPassword() {
  const {email} = useParams()
 const  {recoverPasswordNew} = useContext(AuthContext)
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");



  function handleCreateAccount(e) {
    e.preventDefault();

    if(password !== passwordConfirm) {
      toast.error("As senhas não combinam!");
      return
    }
    
    recoverPasswordNew(email, password)
    
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
            <h3>ALTERAR SENHA</h3>
          </div>
          <input type="text" placeholder="Nova senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <input type="text" placeholder="Confirme a nova senha" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}/>

          <div className="buttons">
          <button onClick={handleCreateAccount}> Alterar senha </button>


          </div>
        </div>
      </div>
    </div>
  )
}

export { RecoverPassword }