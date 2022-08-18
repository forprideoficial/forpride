import { useState,useEffect, memo} from 'react'
import { Link } from 'react-router-dom';
import api from '../../services/api'
import { DateFormat } from '../DateFormat/DateFormat';
import './usersPosts.css'

function UsersPostsComponent({idAccount, username, date, keyId, role}) {
    const Local = localStorage.getItem("forpride");
    const userData = JSON.parse(Local);

    const profile = "https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240"
    
    const [nickname, setNickname] = useState('')
    const [avatar, setAvatar] = useState('')
    const [uf, setUf] = useState('')
    const [city, setCity] = useState('')
    useEffect(() => {
        async function loadInformations() {
            await api.get(`accounts/filter/${idAccount}`).then((result) => {
                setNickname(result.data[0].nickname)
                setAvatar(result.data[0].avatar)
                setCity(result.data[0].city)
                setUf(result.data[0].uf)
            }).catch((error) => {
                console.log(error)
                console.log("Erro aos buscar informações")
            })
        }

        loadInformations()
    }, [idAccount])

    return (
       <div className="itemUsers" key={keyId}>
           <div className="image">
           <Link to={userData.id === idAccount ? `/profile` : `/profile-friend/${idAccount}`}>
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
           </div>
           <div className="name">
           {nickname === "" || nickname === undefined ?
            <Link to="">
          <h4>Usuário deletado</h4>
                </Link> :
           <Link to={userData.id === idAccount ? `/profile` : `/profile-friend/${idAccount}`}>
                 <h4>{nickname} - {país === "Brasil" ? uf : país === "Portugal" ? `${city} - ${país}` : uf} </h4>
               </Link>}
           <DateFormat date={date} />
           </div>
       </div>
    ) 
}


export const UsersPosts = memo(UsersPostsComponent)