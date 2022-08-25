
import './inviteWhatsapp.css'
import { v4 as uuidv4} from 'uuid'
import { toast } from "react-toastify"
import { AuthContext } from "../../../contexts/Auth"
import {useContext, useState} from 'react'
import { mask as masker, unMask } from "remask";

function InviteWhatsapp() {
    const Local = localStorage.getItem("forpride");
    const user = JSON.parse(Local);


    const {CreateInviteNewUsew} = useContext(AuthContext);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    function ChangeMaskPhone(e) {
      const originalValue = unMask(e.target.value);
      const maskedValue = masker(originalValue, [
        "(99)99999-9999",
        "(99)99999-999",
        "999 99999-9999"
      ]);
  
      setPhone(maskedValue)
    }

    function createInviteWhatsapp(e) {
        e.preventDefault();
        
        toast.info("Enviando convite. Aguarde...")

        const remove1Paranteses = phone.replace('(', '')
        const remove2Paranteses = remove1Paranteses.replace(')', '')
        const removeSpace = remove2Paranteses.replace(' ', '')
        const removeTrace = removeSpace.replace('-', '')
        const newPhone = removeTrace;

        console.log(newPhone)
        const inviteCode = uuidv4()
       
        const code = inviteCode.substring(0, 4)

       CreateInviteNewUsew({code, name, email, phone:newPhone, username: user.username, idAccount: user.id, patron: user.id, patronNickname:user.nickname })

        setEmail("")
        setPhone("")
        setName("")
    }
    return (
        <>
        <form action="">
                <span>Convite por whatsapp</span>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome"/>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
                <input type="text" value={phone} onChange={ChangeMaskPhone} placeholder="(XX)XXXXX-XXXX ou XXX XXXXX-XXXX" />

                <button onClick={createInviteWhatsapp}> Enviar Convite</button>

                <br />
                <br />
                <br />
        </form> 
        </>
    )
}

export { InviteWhatsapp }