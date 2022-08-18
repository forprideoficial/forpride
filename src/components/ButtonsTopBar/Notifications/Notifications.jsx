import './notifications.css'
import { useEffect, useState, useCallback } from "react";
import api from "../../../services/api";
import ReactTooltip from 'react-tooltip';
import { useFetch } from '../../../hooks/useFetch';
import {IoNotificationsOutline} from 'react-icons/io5'

function Notifications() {
    const Local = localStorage.getItem("forpride");
    const user = JSON.parse(Local);

    const [dateRead, setDateRead] = useState([]);



   const loadDateRead = useCallback(async () => {
             const idAccount = user.id
             await api.get(`/dateread/${idAccount}`)
             .then( async (res) => {
                 if(res.data.length !== 0) {
                     setDateRead(res.data[0]);
                 } else {
                     const data = {
                         idAccount: user.id,
                         DateRead: new Date() 
                     }
                     await api.post(`/dateread`, data).then(() => {
                         console.log("Data inicial definida com sucesso!")
                     }).catch(error => {
                 console.log("Erro ao buscar dados" + error)
             })
                 }
             }).catch(error => {
                 console.log("Erro ao buscar dados" + error)
             })
         
         }, [user.id]) 

    useEffect(() => {
        loadDateRead()
    }, [loadDateRead ]);

    const idPatrono = user.id
    const {data} = useFetch(`/notifications/my/${idPatrono}`);

    let notificationsFilter = [];
    if(data) {
        notificationsFilter = data?.filter((notification) => (new Date(notification.created_at) > new Date(dateRead.DateRead) ))
    }


    async function handleNotifications() {
        if(user.status === "suspense") {
            window.open("/activeplain","_self");
            return
        }

        const id = dateRead.id
        const data = {
            DateRead: new Date()
        }

    await api.patch(`/dateread/${id}`, data).then((res) => {
        console.log("Data inicial alterada com sucesso!");

        user.status === "suspense" ? window.open(`/activeplain`, "_self") 
        : window.open("/notifications", "_self")
        }).catch(error => {
        console.log("Erro ao buscar dados" + error)
    })

      }
    
    return (
        <>
            <div className="link" onClick={handleNotifications} data-tip data-for='Notificações'>
                {notificationsFilter.length === 0 ? "" :
                    <div className="counter"> {notificationsFilter.length}</div>
                    }
                    <IoNotificationsOutline />
                </div>
                <ReactTooltip id='Notificações'  place="bottom" type="dark" effect="solid">
                     <span>Notificações</span>
            </ReactTooltip>
        </>
    )

}

export {Notifications}