import './usageTips.css'
import logo from '../../assets/images/logo.png';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/Auth';

function UsageTips() {
    const {logout} = useContext(AuthContext);
    const Local = localStorage.getItem("forpride");
    const user = JSON.parse(Local);
    function Tologout(e) {
        e.preventDefault();
        logout(user.id)
    }

    return (
        <div className="content-UsageTips">
            <div className="UsageTips">
            <br />
                    <br />
                <div className="title">
                    <img src={logo} alt="" />
                    <br />
                    <br />
                    <br />
                    <br />
                    <h2>Sua conta está em análise!</h2>
                    <br />
                    <h3>Em até 24h, após seu cadastro sua conta será liberada</h3>
                    <br />
                    <br />
                    <br />
                    <div className="orientations">
                    <br /><br />
                    <h4><b>Qualquer problema ou dúvida. Entra em conato:</b></h4>
                    <h4><b>Whatsapp</b> (22)99783-5288</h4>
                    <h4><b>E-mail:</b> contato@forpride.com.br</h4>
                    </div>
                </div> 
                <button onClick={Tologout}>Sair</button>
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

export {UsageTips}