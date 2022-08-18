import './listGroupUnic.css'
import { useEffect, useState } from 'react'
import api from '../../services/api'
import { ListMembersGroup } from '../ListMembersGroup/ListMembersGroup';
import { Link } from 'react-router-dom';

function ListGroupUnic({id}) {
    const [avatar, setAvatar] = useState();
    const [cover, setCover] = useState();
    const [name, setName] = useState();
    const [idGroup, setIdGroup] = useState();
    const [privacity, setPrivacity] = useState();
    const [theme, setTheme] = useState();
    const [description, setDescription] = useState();


    useEffect(() => {
        async function loadGroups(){
            await api.get(`/groups/${id}`).then((result) => {
                console.log(result.data[0]);
                setAvatar(result.data[0].avatar);
                setCover(result.data[0].cover);
                setName(result.data[0].name);
                setPrivacity(result.data[0].privacity);
                setTheme(result.data[0].theme);
                setDescription(result.data[0].description);
                setIdGroup(result.data[0].idGroup);
            })
        }

        loadGroups()
    }, [id]);

    

      return (
        <div className="listGroupUnic">
             <div className="groups-all">
  
                                   <div className="group-unic" >
                                        <img src={cover} alt="" className="cover"/>
                                        <img src={avatar} alt="" className="profile"/>
                                       <Link  to={`/group/${id}`}><h4>{name}</h4></Link> 
                                        <h6>Grupo {privacity} / <ListMembersGroup idGroup={id}/> Membros</h6>
                                        <button>Sair</button>
                                        </div>        

                 </div>
                 <br />
                                    <br />
                                    <br />
                                    <br />
                                    <br />

        </div>
    )
}

export { ListGroupUnic }