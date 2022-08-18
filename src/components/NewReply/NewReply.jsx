import { useContext, useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { AuthContext } from '../../contexts/Auth';
import './newReply.css'


function NewReply({idComment, username}) {
    const {newReply} = useContext(AuthContext);

    const Local = localStorage.getItem("forpride");
    const userData = JSON.parse(Local);
    const [textComment, setTextComment] = useState("");

    function handleComment() {
        if(textComment === "") {
            return
        }
        newReply({text: textComment, idComment: idComment, idAccount: userData.id, avatar:userData.avatar, nickname: userData.nickname, username: userData.username})
        setTextComment("");
        }

    return (
        <div className='commentNew'>
               <input type="text" placeholder={`Responder a ${username}`} value={textComment} onChange={(e) => setTextComment(e.target.value)}/>
               <button onClick={handleComment}><FiSend /> Responder</button>
        </div>
    )
}

export {NewReply}