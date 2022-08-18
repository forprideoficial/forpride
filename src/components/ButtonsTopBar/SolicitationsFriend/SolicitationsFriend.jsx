import './solicitationsFriend.css';
import ReactTooltip from 'react-tooltip';
import { IoPersonAddOutline } from 'react-icons/io5';
import { useFetch } from '../../../hooks/useFetch';

function SolicitationsFriend() {
    const Local = localStorage.getItem("forpride");
    const user = JSON.parse(Local);
  

    const idAccount = user.id;
    const {data} = useFetch(`/friends/${idAccount}`);

    let friendPending = []

    if(data) {
        friendPending = data?.filter(friend => (friend.status === 'pending' && friend.idFriend === user.id));
    }

    function handleFriends() {
        user.status === "suspense" ? window.open(`/activeplain`, "_self") 
        : window.open("/solicitations", "_self")
      }

    return (
        <>
        <div className="link"  onClick={handleFriends} data-tip data-for='Solicitações'>
        {friendPending.length === 0 ? "" :
        <div className="counter"> {friendPending.length}</div>
        }
        <IoPersonAddOutline />
    </div>
    <ReactTooltip id='Solicitações' place="bottom" type="dark" effect="solid">
         <span>Solicitações</span>
    </ReactTooltip>
    </>
    )
}

export {SolicitationsFriend}