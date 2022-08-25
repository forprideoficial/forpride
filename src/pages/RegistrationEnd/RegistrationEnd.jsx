import './registrationEnd.css'
import logo from '../../assets/images/logo.png';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/Auth';

function RegistrationEnd() {
        function handleRedirectFeed(e) {
        e.preventDefault();
        window.open("/", "_self")
    }
    return (
        <div className="content-registration">
            <div className="registrationEnd">
                <div className="title">
                    <img src={logo} alt="" />
                    <h2>Parabéns! <br /> Você concluiu a etapa do cadastro com sucesso.</h2>
                    <h3>Em até 24h, seu cadastro será liberado. Você receberá um e-mail de confirmação.</h3><br />
                    <h3>Siga as seguintes orientações para aproveitar melhor o nosso site:</h3>
                    <br />
                    <div className="orientations">
                    <h4><b> Não utilizar termos ofensivos em:</b></h4>
                    <h4> - Conversas, postagens, comentários, respostas a comentários e em conversas pelo chat.</h4> <br />
                    <h4><b> Seja gentil e faça sempre novas amizades</b></h4> <br />
                    <h4><b> Você pode postar 3 vezes ao dia entra fotos e vídeos.</b></h4> <br />
                    <h4><b> Utilizar suas fotos reais em Perfil/Capa. Não sendo permitido fotos de sites, revistas, plantas e/ou animais.</b></h4> <br />
                    <h4><b> Não postar seu número de telefone, id, usuário ou link de qualquer outro aplicativo.</b></h4>
                    <h4>- Vocês podem trocar essas informações pelo chat.</h4> <br />
                    <h4><b> Ao convidar um amigo, saiba que:</b></h4>
                    <h4> - Você se torna amplamente responsável pelos atos de seu convidado dentro do site.</h4>
                    <h4> - Em caso de má conduta de seu convidado, as punições impostas a ele, também são impostas a você.</h4> <br />
                    <h4><b> Não é permitido postar imagens de Flyers de eventos no Feed. Todos os eventos devem ser criados na aba eventos.</b></h4>

                    <br /><br />
                    <h4><b>Qualquer problema ou dúvida. Entra em conato:</b></h4>
                    <h4><b>Whatsapp</b> (22)99783-5288</h4>
                    <h4><b>E-mail:</b> contato@forpride.com.br</h4>
                   
                    </div>
                </div> 
                                
                <button onClick={handleRedirectFeed}>Sair</button>
            </div>
        </div>
    )
}

export {RegistrationEnd}