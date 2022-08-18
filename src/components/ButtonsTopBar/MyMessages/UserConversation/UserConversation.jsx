import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../../../../hooks/useFetch";
import api from "../../../../services/api";
import './userConversation.css';


function UserConversation({idAccount, room, text}) {
    const Local = localStorage.getItem("forpride");
    const user = JSON.parse(Local);

    const profile = "https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240"

    const [nickname, setNickname] = useState('')
    const [avatar, setAvatar] = useState('')
    const [uf, setUf] = useState('')

    useEffect(() => {
        async function loadInformations() {
            await api.get(`accounts/filter/${idAccount}`).then((result) => {
                if(result.data[0] !== undefined) {
                    setAvatar(result.data[0].avatar)
                    setNickname(result.data[0].nickname)
                    setUf(result.data[0].uf)
                }
            }).catch((error) => {
                console.log(error)
                console.log("Erro aos buscar informações")
            })
        }
        loadInformations()
    }, [idAccount, room ]);

 

    const {data} = useFetch(`/messages/${room}`);

    let myMessages = [];
    let friendMessage = [];
    let newMessages = [];

    if(data) {  

        myMessages = data?.filter((message) => (message.idAccount === user.id));
        console.log("myMessages")
        console.log(myMessages)
        friendMessage =  data?.filter((message) => (message.idAccount !== user.id));
        console.log("friendMessage")
        console.log(friendMessage)
    }
    newMessages = friendMessage?.filter((messages) => (myMessages !== undefined && friendMessage !== undefined ? new Date(messages.created_at) > new Date(myMessages[0]?.created_at) : ""))
    console.log("friendMessage")
    console.log(newMessages.length)
    

    if(!data) {
        return (
            <div className="item">
                <h4>Carregando conversa.</h4>
            </div>
        )
    }

    return (
        data?.length === 0 ? "" :       
       <div className="item">
            <div className={user.status === "essencial" ? "image2" : "image"}>
          
           <Link to={user.status === "essencial" ? `/updateplain` : `/chat/${room}/${idAccount}`}>
           {avatar === "" || avatar === undefined ?
                                  <img 
                                  src={profile}
                                  onError={({ currentTarget }) => {
                                      currentTarget.onerror = null; // previne loop
                                      currentTarget.src="https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240";
                                  }}
                                  />
          :
          <img 
          src={avatar}
          onError={({ currentTarget }) => {
              currentTarget.onerror = null; // previne loop
              currentTarget.src="https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240";
          }}
          />
           }
          
           </Link>
           {newMessages.length === 0 ? ""
           :
           <div className="counter-conversation">
               {newMessages.length }
            </div>
            }
           </div>
           <Link to={user.status === "essencial" ? `/updateplain` : `/chat/${room}/${idAccount}`}>
         {nickname === "" || nickname === undefined ?
         <h4>Usuário deletado</h4>
        :
        <>
        {user.status === "essencial" ?
        <h4>{newMessages.length === 0 ? "Alguém enviou uma mensagem" : "Você tem uma nova mensagem"}</h4>
        :
        <>
        <h4>{nickname} - {uf}</h4>
        <h6>{text.slice(0,45)}</h6>
        </>
        }
        </>
        }
           </Link>
           
       </div>
       
    ) 
}


export { UserConversation }