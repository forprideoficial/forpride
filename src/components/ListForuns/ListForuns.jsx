import './listForuns.css'
import { useEffect, useState } from 'react'
import api from '../../services/api'
import { Link } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';

function ListForuns() {

    // const [foruns, setForuns] = useState([])


    // useEffect(() => {
    //     async function loadGroups(){
    //         await api.get("/foruns").then((result) => {
    //             console.log(result.data);
    //             setForuns(result.data)
    //         })
    //     }

    //     loadGroups()
    // }, []);

    const {data} = useFetch(`/foruns`);


    return (
        <div className="listForuns">
             <div className="foruns-all">
                             {data?.map((forum) => {
                                 return(
                                    <div className="foruns-unic" key={forum.id}>
                                        <div className="imageCover"> 
                                    <img src={forum.cover} alt="" className="cover"/>
                                        </div>
                                    <img src={forum.avatar} alt="" className="profile"/>
                                    <h4>{forum.name}</h4>
                                    <Link to={`/forum/${forum.id}`}>Entrar</Link>
                                </div>
                           
                                 )
                             })}
                               
                            </div>
                                 <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                         
        </div>
    )
}

export { ListForuns }