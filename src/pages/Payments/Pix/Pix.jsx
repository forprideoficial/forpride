import "./pix.css"
import imagePìx from '../../../assets/pix/29.jpeg';
import { useParams } from "react-router-dom";
import { TopBar } from "../../../components/TopBar/TopBar";
import { ChatSlim } from "../../../components/ChatSlim/ChatSlim";
import { ToolbarLeftSlim } from "../../../components/ToolBarLeftSlim/ToolbarLeftSlim";
import { BarBottomMenu } from "../../../components/BarBottomMenu/BarBottomMenu";


function Pix() {
    const {id} = useParams();

    return (
        <div className="Pix">
            <TopBar />
            <div className="pix-page">
            <h3>Realize o pagamento via chave pix pela chave aleatória</h3>

            <p>
            1. Acesse o Aplicativo do Banco ou o Internet Banking.
<br />
2. Copie o Código PIX Chave aleatória abaixo.
<br />
3. Acesse o aplicativo do seu banco: opção PIX.
<br />
4. Selecione a opção PIX Chave aleatória.
<br />
5. Cole o código copiado e finalize o pagamento.
            </p>


        <p>Ao assinar, você aceita as <a href="/termscontractuals">Condições contratuais</a></p>
            <div className="chave">
                <h3>d348d375-a8a4-4361-8e58-e9957fad8b2a</h3>
            </div>

            <a href={`/voucher/${id}`}>Enviar print do comprovante</a>
            </div>
            
        </div>
    )
}

export { Pix }