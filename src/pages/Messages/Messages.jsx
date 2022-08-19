import { useEffect, useState } from "react";
import { BarBottomMenu } from "../../components/BarBottomMenu/BarBottomMenu";
import { UserConversation } from "../../components/ButtonsTopBar/MyMessages/UserConversation/UserConversation"
import { ChatSlim } from "../../components/ChatSlim/ChatSlim";
import { ToolbarLeftSlim } from "../../components/ToolBarLeftSlim/ToolbarLeftSlim";
import { TopBar } from "../../components/TopBar/TopBar";
import api from "../../services/api";
// import "./messages.css"

function Messages() {
    const Local = localStorage.getItem("forpride");
    const user = JSON.parse(Local);
   const [conversation, setConversation] = useState([])

    useEffect(() => {
        async function loadRoomIdAccount() {
            const idAccount = user.id
           const rmyRooms1 = await api.get(`conversations/account/filter/${idAccount}`)

            const idFriend = user.id
            const rmyRooms2 = await api.get(`conversations/friend/filter/${idFriend}`)

            const newRooms = rmyRooms1.data.concat(rmyRooms2.data);
            // console.log(newRooms);

            newRooms.forEach((room) => {
                const idRoom = room.room
                async function loadMessages() {
                    const messages = await api.get(`/messages/${idRoom}`);


                    if(messages.data.length > 0) {
                        console.log(messages.data[0].text)
                        const data = { 
                            qtdMessages: messages.data.length,
                            room: room.room,
                            idAccount: room.idAccount,
                            idFriend: room.idFriend,
                            actualMessages: messages.data[0].created_at,
                            text: messages.data[0].text,
                         
                        }

                        //console.log(data)

                        setConversation(oldConversation => [...oldConversation, data])
                    }
                }

                loadMessages()
            })

          }

          loadRoomIdAccount()

    }, [user.id]);

if(conversation) {
    conversation.sort(function(a,b) {
       if(a.actualMessages > b.actualMessages ) {
           return -1
       } else {
           return true
       }
   })
}


    return (
        <div className="Messages">
        <TopBar />
        <h2>Conversas</h2>
        
        <div className="itensMessages">

        {conversation.map((rooms) => {
            return(
                <div className="rooms" key={rooms.room}>
                    <UserConversation idAccount={rooms.idAccount !== user.id ? rooms.idAccount : rooms.idFriend} room={rooms.room} text={rooms.text}/>

                </div>
            )
        })}
        </div>
                 <ToolbarLeftSlim />
                 <BarBottomMenu />


        </div>
    )
}

export { Messages }