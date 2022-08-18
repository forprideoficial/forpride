import './suspenseAccount.css'
import logo from '../../assets/images/logo.png';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/Auth';

function SuspenseAccount() {
    const {logout} = useContext(AuthContext);
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local);
    function Tologout(e) {
        e.preventDefault();
        logout(user.id)
    }

    function handleRedirectToActivate(e) {
        e.preventDefault();
    
        window.open("/activeplain", "_self")
    }
    function HandleRedirectFeed(e) {
        e.preventDefault();
    
        window.open("/feed", "_self")
    }

    return (
        <div className="content-SuspenseAccount">
            <div className="SuspenseAccount">
            <br />
                    <br />
                <div className="title">
                    <img src={logo} alt="" />
                    <br />
                    <br />
                    <br />
                    <br />
                    <h2>Olá, {user.username}</h2>
                    <h2>Sua conta está suspensa</h2>
                    <h3>Seu acesso foi reduzido. Neste momento você pode postar apenas uma foto por dia, e tem acesso a ver as postagens do feed</h3>
                    <br />
                    <div className="text">
                    <h3>Com a conta suspensa, você não pode:</h3>
                    <h4>- Curtir postagens</h4>
                    <h4>- Comentar postagens</h4>
                    <h4>- Ver quem curtiu as postagens, incluindo as suas</h4>
                    <h4>- Ver quem comentou as postagens, incluindo as suas</h4>
                    <h4>- Ver vídeos</h4>
                    <h4>- Abrir perfil e amigo</h4>
                    <h4>- Ver mensagens</h4>
                    <h4>- Ver notificações</h4>
                    <h4>- Ver solicitações de amigos</h4>
                    <h4>- Ver ranking</h4>
                    <h4>- Ver radar</h4>
                    <h4>- Ver eventos</h4>
                    <h4>- Ver grupos</h4>
                    <h4>- Ver foruns</h4>
                    </div>
                    <br />
                    <br />
                    <div className="orientations">
                    <br /><br />
                    <h4><b>Qualquer problema ou dúvida. Entra em conato:</b></h4>
                    <h4><b>Whatsapp</b> (22)99791-0510</h4>
                    <h4><b>E-mail:</b> contato@foursome.com.br</h4>
                    </div>
                </div> 
                <div className="buttons">
                <button className="btn1" onClick={handleRedirectToActivate}>Ativar meu plano</button>
                <button className="btn2" onClick={HandleRedirectFeed}>Ir para o feed</button>
                <button onClick={Tologout}>Sair</button>
                </div>
                    <br />
                    <br />
                <br />
                    <br />           
                <br />
                    <br />                    <br />
                    <br />
            </div>
        </div>
    )
}

export {SuspenseAccount}


