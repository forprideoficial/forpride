import "./listCommentsAndReactions.css";
import { useFetch } from '../../hooks/useFetch';
import { UsersLike } from "../UsersLike/UsersLike";
import { UsersSearchLikes } from "../ButtonsTopBar/SearchUsers/UsersSearchLikes/UsersSearchLikes";
import {IoCloseOutline} from 'react-icons/io5';
import Modal from 'react-modal';
import { useState } from "react";
import { ListComments } from "../ListComments/ListComments";

function ListCommentsAndReactions({idPost}) {   
    const Local = localStorage.getItem("forpride");
    const userData = JSON.parse(Local);
    const [isOpenModalFriend, setIsOpenModalFriend] = useState(false);
    const {data} = useFetch(`/reactions/${idPost}`);

    if(!data) {
        return (
            <div className="load">
                <h5>Carregando...</h5>
            </div>
        )
    }

    function handleOpenModalFriend() {
        setIsOpenModalFriend(true)
      }
    function handleFriends() {

        if(userData.status === "essencial" || userData.status === "suspense") {
            window.open("/updateplain","_self");
            return;
        }
        handleOpenModalFriend();
      }
    
      function handleCloseModalFriend() {
        setIsOpenModalFriend(false)
      }


    Modal.setAppElement('#root');
    return (
        <>
            {data.length === 0 ? "" :
        <div className="ListCommentsAndReactions">
            <div className="text">
               <h5 onClick={handleFriends}>{data.length} {data.length === 1 ? "Gostei" : "Gostei"}</h5>
               {/* <h5>{data.length} {data.length === 1 ? "Curtida" : "Curtidas"}</h5> */}
            </div>


        


               {/* Modal Friends  */}
               <Modal isOpen={isOpenModalFriend} onRequestClose={handleCloseModalFriend}
            overlayClassName="react-modal-overlay"
            className="react-modal-content">
            <button type="button" className="react-modal-button" onClick={handleCloseModalFriend}>
            <IoCloseOutline /> 
            </button>
            <div className="content-modal">
            <h5>{`${data.length} pessoas curtiram`}</h5>
            <br />
            <div className="itensModalReactions">
            {data?.map((friend) => {
                return(
                    <div className="accounts" key={friend.idAccount}>
                    <UsersSearchLikes idAccount={friend.idAccount} />
                    </div>
                )
            })}
            </div>
            </div>
            </Modal>
            {/* FIM Modal Friends  */}
        </div>
    }
    </>
    )
}

export {ListCommentsAndReactions}