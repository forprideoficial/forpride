import './inviteEmail.css'
import { toast } from "react-toastify"
import { v4 as uuidv4} from 'uuid'
import { AuthContext } from "../../../contexts/Auth"
import {useContext, useState} from 'react'

function InviteEmail() {
    const Local = localStorage.getItem("forpride");
    const user = JSON.parse(Local);


    const {CreateInviteMail} = useContext(AuthContext);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [type, setType] = useState("");



    function handleSetectType(e) {
        setType(e.target.value)
        console.log(e.target.value)
      }
    
    
    function createInvite(e) {
        e.preventDefault();
        toast.info("Enviando convite. Aguarde...")

      const inviteCode = uuidv4()
       
        const code = inviteCode.substring(0, 4)


        if(name === "") {
            toast.error("Preencha o nome")
        }
        if(email === "") {
            toast.error("Preencha o e-mail")
        }
        if(type === "") {
            toast.error("Preencha o tipo de conta")
        }

        console.log(`Code: ${code}, Nome: ${name}, Email: ${email},
        isAccount: ${user.id}, username: ${user.username}, nickname: ${user.nickname}, avatar: ${user.avatar}`);


       CreateInviteMail({code, name, email, phone: "Undefined", username: user.username, idAccount: user.id, patron: user.id, patronNickname:user.nickname, type })

        setEmail("")
        setName("")
        setType("")
    }

 return (   <>
       <form action="">
            <span>Envie um convite por e-mail</span>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome"/>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
            
            <select className={type === "" ? "" : "active"} value={type} onChange={handleSetectType}>
                <option value="">Tipo de conta</option>
                <option value="Homem">Homem </option>
                <option value="Mulher">Mulher </option>
                <option value="Casal">Casal </option>
                <option value="Trisal">Trisal </option>
                <option value="Transex">Transex </option>
                <option value="Travestis">Travestis </option>
            </select>

            <button onClick={createInvite}> Enviar Convite</button>
            <br />
            <br />
            <br />
        </form>  
    </>
    )
}

export {InviteEmail}