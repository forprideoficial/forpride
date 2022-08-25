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
        console.log(`Code: ${code}, Nome: ${name}, Email: ${email},
        isAccount: ${user.id}, username: ${user.username}, nickname: ${user.nickname}, avatar: ${user.avatar}`);


       CreateInviteMail({code, name, email, username: user.username, idAccount: user.id, patron: user.id, patronNickname:user.nickname })

        setEmail("")
        setName("")
    }

 return (   <>
       <form action="">
            <span>Envie um convite por e-mail</span>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome"/>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
            <button onClick={createInvite}> Enviar Convite</button>
            <br />
            <br />
            <br />
        </form>  
    </>
    )
}

export {InviteEmail}