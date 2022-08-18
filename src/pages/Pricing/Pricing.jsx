import { BarBottomMenu } from "../../components/BarBottomMenu/BarBottomMenu";
import { TopBar } from "../../components/TopBar/TopBar";
import { useFetch } from "../../hooks/useFetch";
import {IoCheckmarkOutline, IoCloseOutline} from 'react-icons/io5'
import './pricing.css'
import { FaCrown } from "react-icons/fa";
import { ToolbarLeftSlim } from "../../components/ToolBarLeftSlim/ToolbarLeftSlim";

function Pricing() {

    const {data} = useFetch(`/plains`)
    
    return(
        <div className="Pricing">
                 <TopBar />
            <div className="Pricing-page">

            <div className="text">
                        <h2>Planos</h2>
                        <h4>Escolha um plano e tenha todos os benefícios</h4>
                    </div>

                    <div className="payments">
                                <div className="vip">
                                        <h2> <b>Seja ESSENCIAL </b> </h2>
                                        <div className="double">
                                        <h4>Curtir</h4>
                                        <IoCheckmarkOutline color="#2aae2a"/>
                                        </div>
                                        <div className="double">
                                        <h4>Comentar</h4>
                                        <IoCloseOutline color="Red"/>
                                        </div>
                                        <div className="double">
                                        <h4>Ver quem curtiu/comentou</h4>
                                        <IoCloseOutline color="Red"/>
                                        </div>
                                        <div className="double">
                                        <h4>Postar</h4>
                                        <h5>1 Foto dia</h5>
                                        </div>
                                        <div className="double">
                                        <h4>Ver fotos</h4>
                                        <IoCheckmarkOutline color="#2aae2a"/>
                                        </div>
                                        <div className="double">
                                        <h4>Ver vídeo</h4>
                                        <IoCloseOutline color="Red"/>
                                        </div>
                                        <div className="double">
                                        <h4>Acesso ao radar</h4>
                                        <IoCheckmarkOutline color="#2aae2a"/>
                                        </div>
                                        <div className="double">
                                        <h4>Acesso ao ranking</h4>
                                        <IoCheckmarkOutline color="#2aae2a"/>
                                        </div>
                                        <div className="double">
                                        <h4>Notificações</h4>
                                        <IoCloseOutline color="Red"/>
                                        </div>
                                        <div className="double">
                                        <h4>Solicitações</h4>
                                        <IoCloseOutline color="Red"/>
                                        </div>
                                        <div className="double">
                                        <h4>Chat de mensagens</h4>
                                        <IoCloseOutline color="Red"/>
                                        </div>

                                        <h3><b>Seja Essencial por: R$ 9,90</b></h3>

                                        <a href={`/selectplain/Essencial`}>Assinar ESSENCIAL </a>
                                </div>
                                <div className="premium">
                                        <h2> <b>Seja PREMIUM <FaCrown /></b> </h2>
                                        <div className="double">
                                        <h4>Curtir</h4>
                                        <IoCheckmarkOutline color="#2aae2a"/>
                                        </div>
                                        <div className="double">
                                        <h4>Comentar</h4>
                                        <IoCheckmarkOutline color="#2aae2a"/>
                                        </div>
                                        <div className="double">
                                        <h4>Ver quem curtiu/comentou</h4>
                                        <IoCheckmarkOutline color="#2aae2a"/>
                                        </div>
                                        <div className="double">
                                        <h4>Postar</h4>
                                        <h5>3 Foto/vídeos dia</h5>
                                        </div>
                                        <div className="double">
                                        <h4>Ver fotos</h4>
                                        <IoCheckmarkOutline color="#2aae2a"/>
                                        </div>
                                        <div className="double">
                                        <h4>Ver vídeo</h4>
                                        <IoCheckmarkOutline color="#2aae2a"/>
                                        </div>
                                        <div className="double">
                                        <h4>Acesso ao radar</h4>
                                        <IoCheckmarkOutline color="#2aae2a"/>
                                        </div>
                                        <div className="double">
                                        <h4>Acesso ao ranking</h4>
                                        <IoCheckmarkOutline color="#2aae2a"/>
                                        </div>
                                        <div className="double">
                                        <h4>Notificações</h4>
                                        <IoCheckmarkOutline color="#2aae2a"/>
                                        </div>
                                        <div className="double">
                                        <h4>Solicitações</h4>
                                        <IoCheckmarkOutline color="#2aae2a"/>
                                        </div>
                                        <div className="double">
                                        <h4>Chat de mensagens</h4>
                                        <IoCheckmarkOutline color="#2aae2a"/>
                                        </div>

                                        <h3><b>Seja Premium por: R$ 29,90</b></h3>

                                        <a href={`/selectplain/Premium`}>Assinar PREMIUM <FaCrown /></a>
                                </div>

                    </div>


 
        </div>
        <ToolbarLeftSlim />
        <BarBottomMenu />
        </div>
    )
}


export {Pricing}


                        {/* {data?.map((payment) => {
                            return (
                                <div className="unic" key={payment.id}>
                                        <h4>Plano</h4>
                                        <h3>{payment.name}</h3>
                                        <h4>Valor</h4>
                                        <h3>R$ {payment.value}</h3>
                                        <h4>Período</h4>
                                        <h3>{payment.period} Dias</h3>

                                        <a href={`/selectplain/${payment.id}`}>Assinar</a>
                                </div>
                              )
                        })} */}