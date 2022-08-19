 
import { useContext, useEffect, useState } from 'react';
import logoImg from '../../assets/images/logo.png'
import { AuthContext } from '../../contexts/Auth';
import { FiEye, FiEyeOff} from 'react-icons/fi';
import { IoLogoWhatsapp} from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import image1 from '../../assets/images/slider/6.jpg';


import './signIn.css';
import { SliderImages } from '../../components/SliderImages/SliderImages';

function SignIn() {

  const  {loginSession} = useContext(AuthContext)
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [passwordView, setPasswordView] = useState(false)
  const [never, setNever] = useState(false)
  const navigate = useNavigate();

 
  useEffect(() => {
      if(localStorage.getItem("forpride") !== null) {
        navigate("/feed")
      }
    },[navigate])


  function handleCreateAccount(e) {
    e.preventDefault();
   loginSession({login: login, password:password})
   console.log({login: login, password:password});
  }

  function handlePasswordView() {
    if(passwordView === false) {
      setPasswordView(true)
    } else {
      setPasswordView(false)
    }
  }

  let never1 = false
  if(login.includes(" ")) {
    never1 = true
  }

  return (
    <div className="content-Login">
      <div className="slide">
      <div className="images" key={image1}>
            <img src={image1} alt="" />
        </div>
      </div>
      <div className="bloco2">

      <div className="logo">
        <img src={logoImg} alt="Logo forpride" />
        </div>

      <div className="signIn">
        <div className="form">
          <input type="text" placeholder="E-mail ou Nome de usuário" value={login} onChange={(e) => setLogin(e.target.value)}/>

          {never1 === true ? <h5>Favor remover os espaços vazios no campo login</h5> : ""}
          <div className="inputPassword">
          <input type={passwordView === false ? "password" : "text" } placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button className='password' onClick={handlePasswordView}>{passwordView === false ? <FiEye /> : <FiEyeOff /> } </button>
          </div>

          <div className="infoavatar">
                            <h5><b>Verifique seu e-mail e senha!</b></h5>
                            <h6><b>Certifique-se que está escrevendo conforme cadastrado:</b> </h6>
                            <h6>- 70% dos erros de login são por e-mail e senha com letras maiúsculas incorratente.</h6>
                        </div>


          <div className="buttons">
            <button onClick={handleCreateAccount}> Entrar </button>

          </div>
          <div className="links">
          <a href="/recuperation"><p> Esqueceu a senha?</p></a>
          </div>
          <div className="buttons">
          <button onClick={handleCreateAccount}> Entrar </button>
          </div>
          <div className="create">
          <p>Não possui conta? <a href="/signup"> Criar agora</a></p>
          </div>

        </div>
      </div>
      </div>
    </div>
  )
}

export { SignIn }