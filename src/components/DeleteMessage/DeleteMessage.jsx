import "./deleteMessage.css"
import { useContext } from 'react';
import { FiTrash } from 'react-icons/fi';
import { AuthContext } from '../../contexts/Auth';

function DeleteMessage({id}) {
    console.log(id)
    const {deleteActualMessage} = useContext(AuthContext);

    function handleMessageDelete(e){
        e.preventDefault();
        console.log(id)
        deleteActualMessage(id)
    }

    return (
        <div className="delete">
            <button className ="buttonDelete" onClick={handleMessageDelete}><FiTrash /> Deletar</button>
        </div>
    )
}

export {DeleteMessage}