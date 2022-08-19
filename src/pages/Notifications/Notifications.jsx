import { BarBottomMenu } from "../../components/BarBottomMenu/BarBottomMenu";
import { UsersNotifications } from "../../components/ButtonsTopBar/Notifications/UsersNotifications/UsersNotifications";
import { ChatSlim } from "../../components/ChatSlim/ChatSlim";
import { ToolbarLeftSlim } from "../../components/ToolBarLeftSlim/ToolbarLeftSlim";
import { TopBar } from "../../components/TopBar/TopBar";
import { useFetch } from "../../hooks/useFetch";
import "./notifications.css"

function Notifications() {
    const Local = localStorage.getItem("forpride");
    const user = JSON.parse(Local);

    const idPatrono = user.id
    const {data} = useFetch(`/notifications/my/${idPatrono}`);



    return (
        <div className="Notifications">
            <TopBar />
            <h2>Notificações</h2>

            <div className="listNotifications">
            {data?.map((notification) => {
            return(
                <div className="notification" key={notification.id}>
                    <div className="name">
                        {notification.type === "notification-post" ?
                        <a href={notification.idPost === null || notification.idPost === undefined ? "#" : user.status === "essencial" ? `/updateplain` : `/post/${notification.idPost}`}>
                        <UsersNotifications id={notification.idAccount} text={notification.text}/>
                            </a>
                        :
                        <a href={notification.idAccount === null ? "#" : user.status === "essencial" ? `/updateplain` : notification.idAccount === user.id ? `/profile` :`/profile-friend/${notification.idAccount}`}>
                        <UsersNotifications id={notification.idAccount} text={notification.text}/>
                            </a>
                        }
                    </div>
                </div>
            )
            })}
           
            </div>
                 <ToolbarLeftSlim />
                 <BarBottomMenu />
        </div>
    )
}

export { Notifications }