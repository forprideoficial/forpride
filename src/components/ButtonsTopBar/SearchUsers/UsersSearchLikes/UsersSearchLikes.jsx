import { useEffect } from "react";
import { useState } from "react";
import { FaCrown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useFetch } from "../../../../hooks/useFetch";
import api from "../../../../services/api";
import './usersSearchLikes.css'


function UsersSearchLikes({idAccount}) {
    const Local = localStorage.getItem("forpride");
    const userData = JSON.parse(Local);
    console.log(idAccount)

    const [nickname, setNickname] = useState("")
    const [city, setCity] = useState("")
    const [uf, setUf] = useState("")
    const [país, setPaís] = useState("")
    const [avatar, setAvatar] = useState("")
    const [status, setStatus] = useState('')

    const profile = "https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240"

    const {data} = useFetch(`/accounts/filter/${idAccount}`);

    useEffect(() => {
        async function loadInformations() {
            await api.get(`/accounts/filter/${idAccount}`).then((res) => {
                console.log(res.data)
                console.log(res.data[0])
                        setNickname(res.data[0].nickname);
                        setAvatar(res.data[0].avatar);
                        setCity(res.data[0].city);
                        setUf(res.data[0].uf);
                        setPaís(res.data[0].país);
                        setStatus(data.data[0].status)
            })
        }
        loadInformations()

        async function loadStatus() {
            await api.get(`accounts/filter/${idAccount}`).then((result) => {
                setStatus(result.data[0].status)
            }).catch((error) => {
                console.log(error)
                console.log("Erro aos buscar informações")
            })
        }

        loadStatus()
    }, [idAccount])

    // if(data) {
    //     console.log(data);

    //     setNickname(data?.[0].nickname);
    //     setAvatar(data?.[0].avatar);
    //     setCity(data?.[0].city);
    //     setUf(data?.[0].uf);
    //     setPaís(data?.[0].país);
    // }

 console.log({nickname, avatar, city, uf, país})

    if(!data) {
      return (
          <div className="load">
              <h5>Carregando...</h5>
          </div>
      )
  }


    return (
        <>
        {nickname === "" || nickname === undefined ? "" :
       <div className="item-search" key={idAccount}>
           <div className="image">
           {nickname === "" || nickname === undefined ?
            <Link to="">
               <img src="https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e24" />
           </Link>
           :
           <Link to={userData.id === idAccount ? `/profile` : `/profile-friend/${idAccount}`}>
           {avatar === "" || avatar === undefined ? <>
           <img 
           src={profile}
           onError={({ currentTarget }) => {
               currentTarget.onerror = null; // previne loop
               currentTarget.src="https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240";
           }}
           />
           {status === "premium" || status === "lifetime" ? <FaCrown /> : ""}
           </>
                        :
                        <>
                        <img 
                        src={avatar}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // previne loop
                            currentTarget.src="https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240";
                        }}
                        />
                      {status === "premium" || status === "lifetime" ? <FaCrown /> : ""}
                        </>
                        }
           </Link>}
           </div>
           <div className="name">
           {nickname === "" || nickname === undefined ?
            <Link to="">
          <h4>Usuário não encontrado</h4>
                </Link> :
           <Link to={userData.id === idAccount ? `/profile` : `/profile-friend/${idAccount}`}>
                    {
                      idAccount === "67789f" ||
                      idAccount === "503465" ||
                      idAccount === "2ac0f7" ||
                      idAccount === "e90897" ||
                      idAccount === "4aabed" ||
                      idAccount === "7b9f35" 
                    ?
                    <h4>{nickname} {país === "Brasil" ? "🇧🇷" : país === "Portugal" ? "🇵🇹" : ""}</h4>
                    :
                    <h4>{nickname} - {país === "Brasil" ? uf : país === "Portugal" ? `${city} - ${país}` : uf} {país === "Brasil" ? "🇧🇷" : país === "Portugal" ? "🇵🇹" : ""}</h4>
                  }
               </Link>}
           </div>
       </div>
        }
       </>
    ) 
}


export { UsersSearchLikes }