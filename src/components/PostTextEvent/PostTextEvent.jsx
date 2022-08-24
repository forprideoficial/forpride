import { FiSend,  FiRefreshCcw} from 'react-icons/fi'
import './postTextEvent.css';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/Auth';
import api from '../../services/api';
import { toast } from 'react-toastify';


function PostTextEvent({nameEvent, idEvent}) {
    console.log(nameEvent, idEvent)
    const {newPostEvent, logout} = useContext(AuthContext)
    const Local = localStorage.getItem("forpride");
    const user = JSON.parse(Local);

    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    
    async function handlePost() {
        const res =  await api.get(`accounts/filter/${user.id}`);
          console.log(res.data)
          if(res.data === "" || res.data === undefined || res.data.length === 0 ) {
              logout(user.id)
          } else {
            console.log("Pode postar")
            handlePostNew()
          } 
      }


    async function handlePostNew() {

        if(text === "" ) {
            return
        }

        newPostEvent({
                idAccount: user.id,
                link: "",
                age: user.age,
                username: user.username,
                nickname: user.nickname,
                avatar: user.avatar,
                nameGroup: "",
                nameForum: "",
                nameEvent: nameEvent,
                idEvent: idEvent,
                idGroup: "",
                idForum: "",
                type: "post-text-event",
                text,
                idPatrono: null,
                ufAccount:user.país === "Portugal" ? user.país : user.uf,
                cityAccount: user.city,
                typeAccount: user.type,
            })
            setText("")
            reset()
           
            
    }

    function reset() {
        setText("")
    }

    async function handleMessage(e) {
        e.preventDefault();
        toast.error("Não é possível enviar um post vazio")
    }
    
    return (
        <div className="postEvent">
             <div className="postEvent-data">
            <div className="avatar">
            <img src={user.avatar} alt="" />
            </div>
            <div className="postEvent-type">
                <div className="inputs">
                <textarea name="" id="" cols={30} rows={10} placeholder="Deixe um comentário sobre o evento"
                onChange={(e) => setText(e.target.value)}></textarea>
              
                    <button className="public" onClick={ text !== ""? handlePost : handleMessage}>
                        {loading === true ? <FiRefreshCcw /> : <FiSend /> } </button>
                </div>
            </div>      
            </div>
        </div>
         
         
                        
    )
}

export {PostTextEvent}