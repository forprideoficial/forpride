import { useState,useEffect, useContext} from 'react'
import api from '../../services/api'
import './userReply.css'
import { FiTrash2, FiEdit } from 'react-icons/fi'
import { AuthContext } from '../../contexts/Auth';
import { EditReply } from '../EditReply/EditReply';
import { DateFormat } from '../DateFormat/DateFormat';
import { Link } from 'react-router-dom';
import { FaCrown } from 'react-icons/fa';

function UserReply({idAccount, username, date, id, text, role}) {
    const { deleteReply} = useContext(AuthContext);
    const Local = localStorage.getItem("forpride");
    const userData = JSON.parse(Local);

    const profile = "https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240"


    const [edit, setEdit] = useState(false);
    const [nickname, setNickname] = useState('')
    const [avatar, setAvatar] = useState('')
    const [uf, setUf] = useState('')
    const [city, setCity] = useState('')
    const [país, setPaís] = useState('')
    const [status, setStatus] = useState('')

    useEffect(() => {
        async function loadInformations() {
            await api.get(`informations/${idAccount}`).then((result) => {
                setNickname(result.data[0].nickname)
                setAvatar(result.data[0].avatar)
                setCity(result.data[0].city)
                setUf(result.data[0].uf)
                setPaís(result.data[0].país)
            }).catch((error) => {
                console.log(error)
                console.log("Erro aos buscar informações")
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
    }, [idAccount]);


    
    function handleDeleteReply(id) {
        const deletar = window.confirm("Deseja deletar a postagem?");
        if(deletar === true) {
           deleteReply(id)
            } 
        }

        function handleHabiliteEdit () {
            if(edit === false) {
                setEdit(true)
            } else {
                setEdit(false) 
            }
        }

    return (
       <div className="itemReply" key={userData.id}>
           <div className="block1">
           <div className="title">
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
           <div className={userData.id === idAccount ? "MyName":"name"}>
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
           <DateFormat date={date} />
           </div>
           </div>
           {userData.id === idAccount ?
           <div className="buttonsReply">
               <button onClick={handleHabiliteEdit}><FiEdit /></button>
               <button onClick={() => {handleDeleteReply(id)}}><FiTrash2 /></button>
           </div>
           : ""
            }
            </div>
            <div className="Reply-data" >
                <p>{text}</p>
            </div>

            {edit === true ?
            <EditReply id={id} data={text}/>
                     :
                     ""}
       </div>
    ) 
}


export {UserReply}