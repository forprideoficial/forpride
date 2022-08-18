import { useContext, useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { AuthContext } from '../../contexts/Auth';
import './newComment.css';



function NewComment({postData, idAccount}) {
    const {newComment, comentsPosts, setComentsPosts} = useContext(AuthContext);

    const Local = localStorage.getItem("forpride");
    const userData = JSON.parse(Local);
    const [textComment, setTextComment] = useState("");

    function handleComment(postData) {
        if(textComment === "") {
            return
        }
        const data = {text: textComment, idPost: postData, idAccount: userData.id, avatar:userData.avatar, nickname: userData.nickname, username: userData.username, idPatrono: idAccount}
        newComment({text: textComment, idPost: postData, idAccount: userData.id, avatar:userData.avatar, nickname: userData.nickname, username: userData.username, idPatrono: idAccount})
        setTextComment("");
        setComentsPosts([...comentsPosts, data])
        }

    return (
        <div className='commentNew'>
               <input type="text" placeholder='Comentar' value={textComment} onChange={(e) => setTextComment(e.target.value)}/>
               <button onClick={() => {handleComment(postData)}}><FiSend /></button>
        </div>
    )
}

export {NewComment}