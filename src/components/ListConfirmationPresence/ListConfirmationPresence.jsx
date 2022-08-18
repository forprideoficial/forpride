import './listConfirmationPresence.css'
import { useEffect, useState } from 'react'
import api from '../../services/api'

function ListConfirmationPresence({idGroup}) {
    const [members, setMembers] = useState();
  


    useEffect(() => {
        async function loadGroups(){
            await api.get(`/members/${idGroup}`).then((result) => {
                setMembers(result.data.length)

            })
        }

        loadGroups()
    }, []);

      return (
        <div className='counter'>
         { members }
        </div>
    )
}

export { ListConfirmationPresence }