import { useContext, useState, memo } from 'react';
import { FiSend } from 'react-icons/fi';
import { AuthContext } from '../../contexts/Auth';
import './editPost.css'


function EditPostComponent({data, id}) {
    const {editPost} = useContext(AuthContext);
    const [text, setText] = useState(data);

    function handleComment() {
        editPost(id, text)
        setText("");
        }

    return (
        <div className='editPost'>
               <input type="text" placeholder='Comentar' value={text} onChange={(e) => setText(e.target.value)}/>
               <button onClick={handleComment}><FiSend /> Editar</button>
        </div>
    )
}

export const EditPost = memo(EditPostComponent)