import './listFollowers.css'
import { useContext, useEffect, useState } from 'react'
import api from '../../services/api';
import { AuthContext } from '../../contexts/Auth';
import { Link } from 'react-router-dom';


function ListFollowers({id}) {
    const Local = localStorage.getItem("forpride");
    const myUser = JSON.parse(Local);

    const { newFollower} = useContext(AuthContext)

    const [friendAccount, setFriendAccount] = useState("");
    const [friendInformation, setFriendInformation] = useState("");

    useEffect(() => {
        async function loadAccount() {
            
            await api.get(`/accounts/filter/${id}`).then((result) => {
                setFriendAccount(result.data[0])
            })
        }

        async function loadInformation() {
            const idAccount = id;
            await api.get(`/accounts/filter/${idAccount}`).then((result) => {
                setFriendInformation(result.data[0])
            })
        }

        loadAccount();
        loadInformation();
    }, [id])


    function handleNewFollower(e) {
        const idAccount = myUser.id
        const idFriend = id
        const type = "follower"
        const status = "aproved"
        e.preventDefault()
        newFollower(idAccount, idFriend, type, status)
      }

    return (
        <div className="listFollowers">
           <div className="friendUnic">
           <img src={friendInformation.avatar} alt="" />
            <div className="name">
            <Link to={friendAccount.id === myUser.id ? `/profile` : `/profile-friend/${friendAccount.id}`}> <h3>{friendInformation.nickname}</h3></Link>
            <button onClick={handleNewFollower}> Seguir </button>
            </div>
           </div>
        </div>
    )
}

export {ListFollowers}