import { BarBottomMenu } from "../../components/BarBottomMenu/BarBottomMenu";
import { ChatSlim } from "../../components/ChatSlim/ChatSlim";
import { ToolbarLeftSlim } from "../../components/ToolBarLeftSlim/ToolbarLeftSlim";
import { TopBar } from "../../components/TopBar/TopBar";
// import './informations.css'
import { useContext } from "react"
import { AuthContext } from "../../contexts/Auth"

function Informations() {

    const {inactivityTime} = useContext(AuthContext);

    inactivityTime()

    return(
        <div className="informations">
                 <ToolbarLeftSlim />
                 <BarBottomMenu />
                 <TopBar />
            <div className="informations-page">
                <div className="selections">
                    <button>O que é a ForPride?</button>
                    <h4><b>Somos uma rede social adulta de origem Brasileira voltada para swing, encontros causais e sexuais, sexo virtual e exibicionismo.
Nosso objetivo é aproximar pessoas com o mesmo objetivo, trazendo uma experiência de relacionamento mais assertiva e direta.</b></h4>
                    <button>Regras e sugestões</button>
                    <div className="rules">
                    <h4><b> Não utilizar termos ofensivos em:</b></h4>
                    <h4> - Conversas, postagens, comentários, respostas a comentários e em conversas pelo chat.</h4> <br />
                    <h4><b> Seja gentil e faça sempre novas amizades</b></h4> <br />
                    <h4><b> Você pode postar 1 (uma) foto e 1 (um) vídeo a cada dia.</b></h4> <br />
                    <h4><b> Utilizar suas fotos reais em Perfil/Capa. Não sendo permitido fotos de sites, revistas, plantas e/ou animais.</b></h4> <br />
                    <h4><b> Sugerimos não postar fotos/videos mostrando o rosto, seja em postagens, capa ou perfil.</b></h4> <br />
                    <h4><b> Sugerimos não por seu nome verdadeiro como nome de exibição, a fim de preservar seu sigilo e identidade.</b></h4>
                    <h4>- Vocês podem trocar informações pessoais pelo chat.</h4> <br />
                    <h4><b> Não postar seu número de telefone, id, usuário ou link de qualquer outro aplicativo.</b></h4>
                    <h4>- Vocês podem trocar essas informações pelo chat.</h4> <br />
                    <h4><b> Ao convidar um amigo, saiba que:</b></h4>
                    <h4> - Você se torna amplamente responsável pelos atos de seu convidado dentro do site.</h4>
                    <h4> - Em caso de má conduta de seu convidado, as punições impostas a ele, também são impostas a você.</h4> <br />
                    <h4><b> Não é permitido postar imagens de Flyers de eventos no Feed. Todos os eventos devem ser criados na aba eventos.</b></h4>
                    </div>

                    <button>Contato/Suporte</button>
                    <div className="dev">
                        <h4><b>Whatsapp:</b> (22)99791-0510</h4>
                        <h4><b>E-mail:</b> contato@ForPride.com.br</h4>
                    </div>
                    {/* <button>Desenvolvimento</button>
                    <div className="dev">
                        <h4>Desenvolvido e mantido pela empresa: <a href="https://www.codingit.com.br/" target="_blank" >Coding.It</a></h4>
                    </div> */}

                </div>
                <div className="informationsSelected">

                </div>
                
        </div>
        </div>
    )
}


export {Informations}

