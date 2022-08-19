import ReactTooltip from 'react-tooltip';
import {UsersPending} from '../../components/ButtonsTopBar/SolicitationsFriend/UsersPending/UsersPending';
import {IoCheckboxOutline, IoHeartOutline, IoTrashOutline} from 'react-icons/io5';
import { useFetch } from '../../hooks/useFetch';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/Auth';
import "./solicitations.css"
import { TopBar } from '../../components/TopBar/TopBar';
import { ChatSlim } from '../../components/ChatSlim/ChatSlim';
import { Footer } from '../../components/Footer/Footer';
import { ToolbarLeftSlim } from '../../components/ToolBarLeftSlim/ToolbarLeftSlim';
import { BarBottomMenu } from '../../components/BarBottomMenu/BarBottomMenu';

function Solicitations() {
    const {friendAproved, deleteFriend, deleteFriendAndFollower} = useContext(AuthContext);
    const Local = localStorage.getItem("forpride");
    const user = JSON.parse(Local);
    const idAccount = user.id;
    const {data} = useFetch(`/friends/${idAccount}`);

    let friendPending = []
    if(data) {
        friendPending = data?.filter(friend => (friend.status === 'pending' && friend.idFriend === user.id));
    }


    function handleAprovedFriend(id) {
        friendAproved(id)
    }

    function handleDeleteFriend(id) {
        deleteFriend(id)
    }
    function handleFollowerFriend(id, friendId ) {
        const idAccount = friendId
        const idFriend = user.id
        const type = "friend"
        const status = "aproved"
        deleteFriendAndFollower(id, idAccount, idFriend, type, status)
    }


    return (
        <div className="Solicitations">
              <TopBar />
              <h2>Solicitações de amizade</h2>
            
            <div className="itensFriend">
            {friendPending.map((friend) => {
                return(
                    <div className="friend" key={friend.idAccount}>
                        <div className="name">
                        <UsersPending id={friend.idAccount} />
                        </div>
                        {user.startus === "essencial" ? ""
                        :
                        <div className="buttons">
                            <button className='Acept' data-tip data-for='Aceitar' onClick={() => handleAprovedFriend(friend.id)}><IoCheckboxOutline /></button>
                            <ReactTooltip id='Aceitar' place="bottom" type="dark" effect="solid">
                             <span>Aceitar</span>
                            </ReactTooltip>
                            <button className='Acept' data-tip data-for='Seguir' onClick={() => handleFollowerFriend(friend.id, friend.idAccount )}> <IoHeartOutline /></button>
                            <ReactTooltip id='Seguir' place="bottom" type="dark" effect="solid">
                             <span>Seguir</span>
                            </ReactTooltip>
                            <button className='Refuse' data-tip data-for='Recusar' onClick={() => handleDeleteFriend(friend.id)}> <IoTrashOutline /></button>
                            <ReactTooltip id='Recusar' place="bottom" type="dark" effect="solid">
                             <span>Recusar</span>
                            </ReactTooltip>
                        </div>
                        }
                    </div>
                )
            })}
            </div>
                 <ToolbarLeftSlim />
                 <BarBottomMenu />
        </div>
    )
}

export {Solicitations} 