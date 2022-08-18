import './listFollowing.css'
import { useContext, useEffect, useState } from 'react'
import api from '../../services/api';
import { AuthContext } from '../../contexts/Auth';
import { Link } from 'react-router-dom';


function ListFollowing({idAccount, idRegister}) {
    const Local = localStorage.getItem("forpride");
    const myUser = JSON.parse(Local);

    const {deleteFollower} = useContext(AuthContext)

    const [friendAccount, setFriendAccount] = useState("");
    const [friendInformation, setFriendInformation] = useState("");

    useEffect(() => {
        async function loadAccount() {
            const id = idAccount;
            await api.get(`/accounts/filter/${id}`).then((result) => {
                setFriendAccount(result.data[0])
            })
        }

        async function loadInformation() {
            
            await api.get(`/accounts/filter/${idAccount}`).then((result) => {
                setFriendInformation(result.data[0])
            })
        }

        loadAccount();
        loadInformation();
    }, [idAccount])


    function handleDeleteFollower(e) {
        e.preventDefault()
        deleteFollower(idRegister)
    }
    return (
        <div className="listFollowing">
           <div className="friendUnic">
           <img src={friendInformation.avatar} alt="" />
            <div className="name">
            <Link to={friendAccount.id === myUser.id ? `/profile` : `/profile-friend/${friendAccount.id}`}> <h3>{friendInformation.nickname}</h3></Link>
            { myUser.id === friendAccount.id ?
             <button onClick={handleDeleteFollower} > Deixar de seguir </button>
            : ""
           }
          
            </div>
           </div>
        </div>
    )
}

export {ListFollowing}