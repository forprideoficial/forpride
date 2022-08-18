import './listMembersGroup.css'
import { useEffect, useState } from 'react'
import api from '../../services/api'

function ListMembersGroup({idGroup}) {
    const [members, setMembers] = useState();

    useEffect(() => {
        async function loadGroups(){
            await api.get(`/members/${idGroup}`).then((result) => {
                console.log(result.data.length);
                setMembers(result.data.length)
            })
        }

        loadGroups()
    }, [idGroup]);

      return (
        <div className='counter'>
         { members }
        </div>
    )
}

export { ListMembersGroup }