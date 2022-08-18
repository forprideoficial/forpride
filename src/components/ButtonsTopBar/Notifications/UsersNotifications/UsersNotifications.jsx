import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../../services/api";
import './usersNotifications.css'


function UsersNotifications({id, text}) {
    const Local = localStorage.getItem("forpride");
    const userData = JSON.parse(Local);

    const [avatar, setAvatar] = useState('')
    useEffect(() => {
        async function loadInformations() {
            const idAccount = id

            if(id !== null) {
                await api.get(`accounts/filter/${idAccount}`).then((result) => {
                    setAvatar(result.data[0].avatar)
                }).catch((error) => {
                    console.log(error)
                    console.log("Erro aos buscar informações")
                })
            }
        }

        loadInformations()
    }, [id])

    return (
       <div className="item">
          { id !== null ?
           <div className={userData.status === "essencial" ? "image2" : "image"}>
           <Link to={userData.status === "essencial" ? `/updateplain` : userData.id === id ? `/profile`:`/profile-friend/${id}`}>
           <img 
                        src={avatar}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // previne loop
                            currentTarget.src="https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240";
                        }}
                        />
           </Link>
           </div>
           : ""
            }
           <div className="name">
            {userData.status === "essencial" ?
           <p>Alguém inteagiu com você. Clique para ver</p>
           :
           <p>{text}</p>
            }
           </div>
       </div>
    ) 
}


export { UsersNotifications }