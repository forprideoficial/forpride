// import "./paymentNotice.css";
import { TopBar } from "../../../components/TopBar/TopBar";

function PaymentNotice(){
    return (
        <div className="PaymentNotice">
            <TopBar />
            <div className="PaymentNotice-Page">
                <h1>😔</h1>
            <h2>Sua assunatura venceu!</h2>
            <h5>Renove e tenha seu acesso de volta!</h5>
            
            <a href="/pricing">Renovar agora</a>
            <button>Renovar depois</button>
            </div>
        </div>
    )
}

export {PaymentNotice}