import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../../services/api";
import './usersPending.css'


function UsersPending({id}) {
    const Local = localStorage.getItem("forpride");
    const userData = JSON.parse(Local);

    const profile = "https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240"

    const [nickname, setNickname] = useState('')
    const [avatar, setAvatar] = useState('')
    useEffect(() => {
        async function loadInformations() {
            const idAccount = id
            await api.get(`/accounts/filter/${idAccount}`).then((result) => {
                setNickname(result.data[0].nickname)
                setAvatar(result.data[0].avatar)
            }).catch((error) => {
                console.log(error)
                console.log("Erro aos buscar informações")
            })
        }

        loadInformations()
    }, [id])

    return (
       <div className="item">
           <div className={userData.status === "essencial" ? "image2" : "image"}>
           <a href={userData.status === "essencial" ? `/updateplain` :  userData.id === id ? `/profile` :`/profile-friend/${id}`} target="_blank">
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
           </a>
           </div>
           <div className="name">
             <Link to={userData.status === "essencial" ? `/updateplain` : userData.id === id ? `/profile` :`/profile-friend/${id}`}>
                       {nickname === "" || nickname === undefined ?
         <h4>Carregando usuário...</h4>
        :
        <h4>{userData.status === "essencial" ? "Solicitação de amizade" : nickname}</h4> }
           </Link>
           </div>
       </div>
    ) 
}


export { UsersPending }