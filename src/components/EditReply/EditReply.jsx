import { useContext, useState, memo } from 'react';
import { FiSend } from 'react-icons/fi';
import { AuthContext } from '../../contexts/Auth';
import './editReply.css'


function EditReplyComponent({data, id}) {
    const {editReply} = useContext(AuthContext);
    const [text, setTextReply] = useState(data);

    function handleReply() {
        editReply(id, text)
        setTextReply("");
        }

    return (
        <div className='editReply'>
               <input type="text" placeholder='Comentar' value={text} onChange={(e) => setTextReply(e.target.value)}/>
              {text !== "" ?  <button onClick={handleReply}><FiSend />Editar</button> : "" }
        </div>
    )
}

export const EditReply = memo(EditReplyComponent)