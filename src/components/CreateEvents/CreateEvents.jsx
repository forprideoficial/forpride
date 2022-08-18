import "./createEvents.css"
import { FiSearch, FiUpload } from "react-icons/fi";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/Auth";
import { storage } from '../../services/firebaseConnection';
import { ref, getDownloadURL, uploadBytes} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import buscaCep from '../../services/api-buscaCep';
import {toast} from 'react-toastify';
import buscaDistrito from "../../services/api-buscaDistrito";



function CreateEvents() {



    return (
        <div className="createEvent">
                    <h2>Bem-vindo a criação de eventos</h2>

                    <div className="text">
                    <h4><b>Para criar seu evento você deverá enviar os dados para o nosso email <br />
                    Nossa equipe será a responsável pela criação do evento.<br />
                    Seu e-mail deve conter as seguintes informações:</b></h4>
                    <h5><b>- Nome do evento.</b></h5>
                    <h5><b>- Data do evento.</b></h5>
                    <h5><b>- Cidade e Estado(UF) onde acontecerá o evento.</b></h5>
                    <h5><b>- Informações sobre ingrssos e taxas</b></h5>
                    <h5><b>- Tema do Evento</b></h5>
                    <h5><b>- Regras do Evento</b></h5>
                    <h5><b>- Arte do Evento em arquivo aberto (Editável) em um dos seguintes arquivos: .PSD .CDR .PDF .AI </b></h5>
                    <h5><b>- O evento deve ser enviado com no máximo 30 dias de antecedência </b></h5>
                    <br />
                    <h5><b>E-mail:</b> contato@foursome.com.br</h5>
                    <br /><br />
                    <h5><b>Qualquer problema ou dúvida. Entra em conato:</b><br />
                    <b>Whatsapp</b> (22)99791-0510</h5>
                    </div>
        </div>
    )
}

export {CreateEvents}