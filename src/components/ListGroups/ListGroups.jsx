import './listGroups.css'
import { useEffect, useState } from 'react'
import api from '../../services/api'
import { ListMembersGroup } from '../ListMembersGroup/ListMembersGroup';
import { Link } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';

function ListGroups() {
    const {data} = useFetch(`/groups`);

    return (
        <div className="listGroups">
             <div className="groups-all">
                             {data?.map((group) => {
                                 return(
                                    <div className="group-unic" key={group.id}>
                                        <div className="cover">
                                    <img src={group.cover} alt="" className="cover"/>
                                        </div>
                                    <img src={group.avatar} alt="" className="profile"/>
                                    <h4>{group.name}</h4>
                                    <h6>Grupo {group.privacity} / <ListMembersGroup idGroup={group.id}/> Membros</h6>
                                    <Link to={`/group/${group.id}`}>Entrar no grupo</Link>
                                </div>
                           
                                 )
                             })}
                               
                            </div>
        </div>
    )
}



function ListGroupsUnic() {
    const {data} = useFetch(`/groups`);

    return (
        data?.length === 0 ? 
        <div className="listGroups2">
        <div className="groups-all2">
                               <div className="group-unic2">
                               <h4>Nenhum Grupo Criado</h4>
                               <Link to={`/groups`}>Crie Agora!</Link>
                           </div>
                      

                          
                       </div>
   </div>
   :
        <div className="listGroups2">
             <div className="groups-all2">
                                    <div className="group-unic2" key={data?.[0].id}>
                                        <div className="cover">
                                    <img src={data?.[0].cover} alt="" className="cover"/>
                                        </div>
                                    <img src={data?.[0].avatar} alt="" className="profile"/>
                                    <h4>{data?.[0].name}</h4>
                                    <h6>Grupo {data?.[0].privacity} / <ListMembersGroup idGroup={data?.[0].id}/> Membros</h6>
                                    <Link to={`/group/${data?.[0].id}`}>Entrar no grupo</Link>
                                </div>
                           

                               
                            </div>
        </div>
    )
}

export { ListGroups, ListGroupsUnic }