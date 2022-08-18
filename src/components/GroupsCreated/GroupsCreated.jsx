import './groupsCreated.css'
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

function GroupsCreated() {
    const Local = localStorage.getItem("forpride");
    const user = JSON.parse(Local)


    const [groups, setGroups] = useState([]);

    useEffect(() => {
        async function loadGroups(){
            await api.get("/groups").then((result) => {
                setGroups(result.data)
            })
        }

        loadGroups()
    }, []);



    const myGroups = groups.filter((groupsMy) => (groupsMy.idAccount === user.id))
    return (
        <div className="listGroups">
             <div className="groups-all">
             {myGroups.map((group) => {
                                    return(
                                        group.idAccount === user.id ?
                                <div className="group-unic" key={group.avatar}>
                                    <div className="cover">
                                    <img src={group.avatar} alt="" className="cover"/>
                                    </div>
                                    <img src={group.cover} alt="" className="profile"/>
                                    <h4>{group.name}</h4>
                                    <Link to={`/group/${group.id}`}>Entrar no grupo</Link>
                                    <button className='Deletar'>Deletar no grupo</button>
                                </div>
                                     :
                                     ""
                                     )
                                })}
                             
                            </div>
        </div>
    )
}

export { GroupsCreated }