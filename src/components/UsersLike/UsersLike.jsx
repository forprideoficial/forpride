import { useState,useEffect, memo} from 'react'
import api from '../../services/api'
import './usersLike.css'

function UsersLikeComponent({idAccount, username}) {
    const LocalInformations = localStorage.getItem("informations-forpride");
    const userInformations = JSON.parse(LocalInformations);

    const profile = "https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240"
        
    const [nickname, setNickname] = useState('')
    useEffect(() => {
        async function loadInformations() {
            await api.get(`/accounts/filter/${idAccount}`).then((result) => {
                setNickname(result.data[0].nickname)
            }).catch((error) => {
                console.log(error)
                console.log("Erro aos buscar informações")
            })
        }

        loadInformations()
    }, [idAccount])

    return (
       <div className="user">
          {nickname === "" ? <a href={`/profile-friend/${idAccount}`}>{username}</a> : userInformations.nickname === nickname ? <a href={`/profile`}>Você</a>: <a href={`/profile-friend/${idAccount}`}>{nickname}</a>} 
       </div>
    ) 
}


export const UsersLike = memo(UsersLikeComponent)