// import './welcome.css'
import logo from '../../assets/images/logo.png';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/Auth';

function Welcome() {
    const {logout} = useContext(AuthContext);
    const Local = localStorage.getItem("forpride");
    const user = JSON.parse(Local);
    function Tologout(e) {
        e.preventDefault();
        logout(user.id)
    }

    return (
        <div className="content-Welcome">
            <div className="Welcome">
            <br />
                    <br />
                <div className="title">
                    <img src={logo} alt="" />
                    <br />
                    <br />
                    <h2>Seja bem-vindo!</h2>
                    <br />
                    <h3>Estamos muito felizes em ter você conosco.</h3>
                    <br />
                    <div className="orientations">
                    <br /><br />
                    <h4><b>Agora você precisa completar o seu cadastro:</b></h4>
                    <h4>Na próxima etapa você irá preencher os dados de cada membro da conta e suas preferências</h4><br />
                    <h4><b>Vamos lá?</b></h4>
                    </div>
                </div> 
                <br />
                    <br />
                <a href="/characteristcs">Completar meu cadastro</a>
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

export {Welcome}