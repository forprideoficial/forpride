import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import logoImg from '../../assets/images/logo.png'
import { AuthContext } from '../../contexts/Auth';

// import './recuperationCode.css';

function RecuperationCode() {
  const {email} = useParams()
  const  {validadeCodeRecuperation} = useContext(AuthContext)
  const [code, setCode] = useState("");



  function handleRecuperationCode(e) {
    e.preventDefault();
   validadeCodeRecuperation(code.toLocaleLowerCase(), email);
  }

  return (
    <div className="content-Login1">
      <div className="signIn">
      <div className="logo">
        <img src={logoImg} alt="Logo forpride" />
        <br />
        </div>
        <div className="form">
          <div className="title">
            <h3>DIGITE SEU CÓDIGO</h3>
          </div>
          <input type="text" placeholder="######" value={code.toLocaleLowerCase()} onChange={(e) => setCode(e.target.value)}/>

          <div className="buttons">
          <button onClick={handleRecuperationCode}> Confirmar código </button>


          </div>
        </div>
      </div>
    </div>
  )
}

export { RecuperationCode }