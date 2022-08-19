
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/Auth'
// import './invitation.css'
import logo from '../../assets/images/logo.png'
import { v4 as uuidv4} from 'uuid'
import { FiMail, FiSend } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import api from '../../services/api'


function Invitation() {
    const {logout,inactivityTime, CreateInviteNewUsew, CreateInviteMail} = useContext(AuthContext);

    inactivityTime()


    const Local = localStorage.getItem("forpride");
    const user = JSON.parse(Local);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const [inviteType, setInviteType] = useState("Email")
    const [myInvites, setMyInvites] = useState([])

    useEffect(() => {
      const idAccount = user.id
      async function loadInvites() {
        await api.get(`/invites/${idAccount}`).then((result) => {
          const data = result.data;
          setMyInvites(data)
        })
      }
      loadInvites()
    }, [user.id])


    function createInvite(e) {
        e.preventDefault();

        const remove1Paranteses = phone.replace('(', '')
        const remove2Paranteses = remove1Paranteses.replace(')', '')
        const removeSpace = remove2Paranteses.replace(' ', '')
        const removeTrace = removeSpace.replace('-', '')
        const newPhone = removeTrace;

        console.log(newPhone)
        const inviteCode = uuidv4()
       
        const code = inviteCode.substring(0, 4)

        console.log(`Code: ${code}, Nome: ${name}, Email: ${email}, Telefone: ${newPhone},
        isAccount: ${user.id}, username: ${user.username}, nickname: ${user.nickname}, avatar: ${user.avatar}`);


       CreateInviteNewUsew({code, name, email, phone:newPhone, username: user.username, idAccount: user.id, patron: user.id, patronNickname:user.nickname })

       

        setEmail("")
        setPhone("")
        setName("")
    }

    function createInviteMail(e) {
      e.preventDefault();

      const remove1Paranteses = phone.replace('(', '')
      const remove2Paranteses = remove1Paranteses.replace(')', '')
      const removeSpace = remove2Paranteses.replace(' ', '')
      const removeTrace = removeSpace.replace('-', '')
      const newPhone = removeTrace;

      console.log(newPhone)
      const inviteCode = uuidv4()
     
      const code = inviteCode.substring(0, 4)

      console.log(`Code: ${code}, Nome: ${name}, Email: ${email}, Telefone: ${newPhone},
      isAccount: ${user.id}, username: ${user.username}, nickname: ${user.nickname}, avatar: ${user.avatar}`);


      CreateInviteMail({code, name, email, phone:newPhone, username: user.username, idAccount: user.id, patron: user.id, patronNickname:user.nickname })

     

      setEmail("")
      setPhone("")
      setName("")
  }

     function mascaraFone(event) {
        var valor = document.getElementById("telefone").attributes[0].ownerElement['value'];
        var retorno = valor.replace(/\D/g,"");
        retorno = retorno.replace(/^0/,"");
        if (retorno.length > 10) {
          retorno = retorno.replace(/^(\d\d)(\d{5})(\d{4}).*/,"($1) $2-$3");
        } else if (retorno.length > 5) {
          if (retorno.length === 6 && event.code === "Backspace") { 
            // necessário pois senão o "-" fica sempre voltando ao dar backspace
            return; 
          } 
          retorno = retorno.replace(/^(\d\d)(\d{4})(\d{0,4}).*/,"($1) $2-$3");
        } else if (retorno.length > 2) {
          retorno = retorno.replace(/^(\d\d)(\d{0,5})/,"($1) $2");
        } else {
          if (retorno.length !== 0) {
            retorno = retorno.replace(/^(\d*)/,"($1");
          }
        }
        document.getElementById("telefone").attributes[0].ownerElement['value'] = retorno;
      }

      function handleEmailInvite() {
          setInviteType("Email")
          console.log("Email")
      }
   
      function handleWhatsappInvite() {
          setInviteType("Whatsapp")
          console.log("Whatsapp")
      }
 
      function handleInvites() {
        setInviteType("Invites")
        console.log("Invites")
    }
   

    return (
        <div className="content">
            <div className="invitation">
                <div className="title">
                    <img src={logo} alt="" />
                    <h2>Convide um novo amigo! </h2>

                    <h3>Enquanto não lançamos, traga seus amigos e se divirta com a gente!</h3>
                    </div>
                    <div className="buttons">
                      <button onClick={handleEmailInvite}>Via E-mail <FiMail /></button>
                      <button onClick={handleWhatsappInvite}>Via Whatsapp <FaWhatsapp /></button>
                      <button onClick={handleInvites}>Enviados <FiSend /> </button>
                    </div>
                   {inviteType === "Email" ?
                    <form action="">
                    <span>Convite por E-mail</span>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome"/>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required/>
                    <input type="text" id="telefone" onKeyUp={mascaraFone} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(XX)XXXXX-XXXX"/>
                    <div className="button">
                    <button className="convite" onClick={createInviteMail}>Convidar!</button>
                    <button  onClick={logout}>Sair</button>
                  </div>
                    </form>
                    :
                    inviteType === "Whatsapp"?
                    <form action="">
                    <span>Convite por Whatsapp</span>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome"/>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required/>
                    <input type="text" id="telefone" onKeyUp={mascaraFone} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(XX)XXXXX-XXXX"/>
                    <div className="button">
                    <button className="convite" onClick={createInvite}>Convidar!</button>
                    <button  onClick={logout}>Sair</button>
                  </div>
                    </form>
                    :
                    inviteType === "Invites"?
                   myInvites.map((invite) => {
                     return (
                       <div className="inviteUnic">
                         <h5>{invite.name}</h5>
                         <h5>{invite.email !== "" ? invite.email : ""} - {invite.phone !== "" ? invite.phone : ""}</h5>
                         <button className='delete'>Deletar</button> 
                       
                       </div>
                     )
                   })
                    :
                    "Selecione como deseja enviar o convte"}

 
            </div>
        </div>
    )
}

export {Invitation}