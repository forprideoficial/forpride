import { FiSend,  FiRefreshCcw} from 'react-icons/fi'
import './postText.css';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/Auth';
import api from '../../services/api';
import { toast } from 'react-toastify';


function PostText({nameForum, idForum}) {
    console.log(nameForum, idForum)
    const {newPost, logout} = useContext(AuthContext)
    const Local = localStorage.getItem("forpride");
    const user = JSON.parse(Local);
    
    const [loading, setLoading] = useState(false)
    const [text, setText] = useState("");

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
        setLoading(true)

        if(text === "" ) {
            return
        }

            newPost({
                idAccount: user.id,
                link: "",
                username: user.username,
                nameGroup: "",
                nameForum: nameForum,
                nameEvent: "",
                idEvent: "",
                idGroup: "",
                idForum: idForum,
                type: "post-text-forum",
                text,
                idPatrono: null,
                ufAccount:user.país === "Portugal" ? user.país : user.uf,
                cityAccount: user.city,
                typeAccount: user.type,
            })
        
            setLoading(false)
            setText("")
            console.log("Text")
    }
        

    async function handleMessage(e) {
        e.preventDefault();
        toast.error("Não é possível enviar um post vazio")
    }

 
    return (
        <div className="postText">
             <div className="postText-data">
            <div className="avatar">
            <img src={user.avatar} alt="" />
            </div>
            <div className="postText-type">
                <div className="inputs">
                <textarea name="" id="" cols={30} rows={10} placeholder="Dê sua dica ou opnião"
                onChange={(e) => setText(e.target.value)}></textarea>
              
                    <button className="public" onClick={ text !== ""? handlePost : handleMessage}>
                        {loading === true ? <FiRefreshCcw /> : <FiSend /> } </button>
                </div>
            </div>      
            </div>
        </div>
         
         
                        
    )
}

export {PostText}