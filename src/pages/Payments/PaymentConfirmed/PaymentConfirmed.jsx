import "./paymentConfirmed.css";
import {IoCheckmarkCircleOutline} from "react-icons/io5"
import { TopBar } from "../../../components/TopBar/TopBar"
import { AuthContext } from "../../../contexts/Auth";
import { useContext } from "react";

function PaymentConfirmed() {
    const {logout} = useContext(AuthContext);
    const Local = localStorage.getItem("forpride");
    const user = JSON.parse(Local);

    function Tologout(e) {
        e.preventDefault();
        logout(user.id)
    }


    return (
        <div className="paymentConfirmed">
            <TopBar />
            <div className="paymentConfirmed-page">
            <h1><IoCheckmarkCircleOutline /></h1>
            <h2>Pagamento confirmado</h2>

            <div className="text">
                <h3>Seu comprovante foi enviado e está em análise.</h3>
                <h3>Sua assinatura será liberada pelo período de 24h, para análise do comprovante enviado.</h3>
                <h3>Em caso de aprovação do comprovante, seu acesso será liberado para o período contratado.</h3>
                <h3>Em caso de reprovação do comprovante, seu acesso será bloqueado, e liberado após receber um comprovante de pagamento válido e dentro dos padrões solicitados.</h3>
            </div>

            <button onClick={Tologout}>Prosseguir</button>
            </div>
        </div>
    )
}

export {PaymentConfirmed}