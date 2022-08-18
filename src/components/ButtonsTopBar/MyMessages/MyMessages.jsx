import './myMessages.css'
import api from '../../../services/api';
import { IoChatboxOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import { useFetch } from '../../../hooks/useFetch';

function MyMessages() {
    const Local = localStorage.getItem("forpride");
    const user = JSON.parse(Local);

    const [dateReadMessage, setDateReadMessage] = useState([])

    useEffect(() => {
      async function loadDateRead() {

        const idAccount = user.id
        await api.get(`/datereadmessage/${idAccount}`)
        .then( async (res) => {
            if(res.data.length !== 0) {
                      setDateReadMessage(res.data[0]);
            } else {
                const data = {
                    idAccount: user.id,
                    DateReadMessage: new Date() 
                }
                await api.post(`/datereadmessage`, data).then(() => {
                }).catch(error => {
            console.log("Erro ao buscar dados" + error)
        })
            }
        }).catch(error => {
            console.log("Erro ao buscar dados" + error)
        })
    }


      loadDateRead()
    }, [user.id])

    const idFriend = user.id;
    const {data} = useFetch(`notificationsmessage/my/${idFriend}`);

    let notificationsFilter = [];

    if(data) {
      notificationsFilter = data?.filter((notification) => (new Date(notification.created_at) > new Date(dateReadMessage.DateReadMessage) ))
    }


      async function handleMessages() {

        if(user.status === "suspense") {
          window.open("/activeplain","_self");
          return
      }
        const id = dateReadMessage.id
        const data = {
            DateReadMessage: new Date()
        }

    await api.patch(`/datereadmessage/${id}`, data).then(() => {
      window.open("/messages", "_self")
        }).catch(error => {
        console.log("Erro ao buscar dados" + error)
    })

      }



    return (
        <>
                <div className="link" onClick={handleMessages} data-tip data-for='Mensagens'>

                {notificationsFilter.length === 0 ? "" :
                    <div className="counter">{notificationsFilter.length}</div>
                    }
                    
                  <IoChatboxOutline />
                </div>
                <ReactTooltip id='Mensagens' place="bottom" type="dark" effect="solid">
                   <span>Mensagens</span>
                </ReactTooltip>


                 
            {/* Modal Conversations  */}
            {/* <Modal isOpen={isOpenModal} onRequestClose={handleCloseModal}
            overlayClassName="react-modal-overlay"
            className="react-modal-content">
            <button type="button" className="react-modal-button" onClick={handleCloseModal}>
            <IoCloseOutline /> 
            </button>
            <div className="content-modal">
            <h3>Conversas</h3>
        
            <div className="itensModalMessages">

            {newRooms.map((rooms) => {
                return(
                    <div className="rooms" key={rooms.room}>
                        <UserConversation idAccount={rooms.idAccount !== user.id ? rooms.idAccount : rooms.idFriend} room={rooms.room}/>

                    </div>
                )
            })}
            </div>
            
            
            <div className="buttons-modal">
            <button className="butont-White" onClick={handleCloseModal}>Cancelar</button>
            </div>
            </div>
            </Modal> */}
            {/* FIM Modal Conversations  */}

        </>
    )
}

export {MyMessages}