import './myForuns.css'
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

function MyForuns() {
    const Local = localStorage.getItem("forpride");
    const user = JSON.parse(Local)
    const [foruns, setForuns] = useState([])

    useEffect(() => {
        async function loadMyForuns(){
            const idAccount = user.id
            await api.get(`/foruns/account/${idAccount}`).then((result) => {
                console.log(result.data);
                setForuns(result.data)
            })
        }

        loadMyForuns()
    }, [user.id]);





    return (
        <div className="listForuns">
             <div className="foruns-all">
                             {foruns.map((forum) => {
                                 return(
                                    <div className="foruns-unic" key={forum.id}>
                                        <div className="imageCover">                                          
                                    <img src={forum.cover} alt="" className="cover"/>
                                        </div>
                                        <div className="avatarImage">
                                    <img src={forum.avatar} alt="" className="profile"/>
                                        </div>
                                    <h4>{forum.name}</h4>
                                    <Link to={`/forum/${forum.id}`}>Entrar</Link>
                                    <button className='Deletar'>Fechar</button>
                                </div>
                           
                                 )
                             })}

                            </div>
                            <br />
                                
        </div>
    )
}

export { MyForuns }