import './listInvites.css'
import { useContext} from 'react'
import { AuthContext } from '../../../contexts/Auth';
import { useFetch } from '../../../hooks/useFetch';
import {AccountCreatedInvite} from '../AccountCreatedInvite/AccountCreatedInvite'

function ListInvites() {
    const Local = localStorage.getItem("forpride");
    const user = JSON.parse(Local);
    const {deleteInvite} = useContext(AuthContext);

    const idAccount = user.id
    const {data} = useFetch(`/invites/${idAccount}`);
    if(data) {
      console.log(data)
    }

      function handleDeleteInvite(id) {
        const deletar = window.confirm("Deseja deletar a postagem?");
        if(deletar === true) {
        deleteInvite(id);
        } 
      }

      

    return(
        <>
        {data?.map((invite) => {
                                  return (
                                    <div className="inviteUnic" key={invite.email}>
                                      <h5><b>{invite.name}</b></h5>
                                      <h5>{invite.type === "" || invite.type === undefined ? "Tipo de conta não definida. Apague-a e reenvie em caso de conta não criada" : `Tipo de conta: ${invite.type}`}</h5>
                                      <AccountCreatedInvite mail={invite.email} />
                                      <h5>{invite.email !== "" ? invite.email : ""} </h5>
                                      <div className="linkInvite">
                                        <h5> <a href={`https://foursome.com.br/signup/convite/${invite.email}/${invite.code}/${invite.idAccount}/${invite.type}`}>Pressione para copiar link de convite</a></h5>
                                      </div>
                                      <p>Pressione e clique na opção: Copiar endereço do link</p>
                                      <button onClick={() => {handleDeleteInvite(invite.id)}}>Deletar</button> 
                                    
                                    </div>
                                  )
                                })}
        </>
    )
}

export { ListInvites }