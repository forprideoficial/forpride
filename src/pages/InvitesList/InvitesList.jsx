import { TopBar } from "../../components/TopBar/TopBar"
// import './invitesList.css'
import { ChatSlim } from "../../components/ChatSlim/ChatSlim"
import { ToolbarLeftSlim } from "../../components/ToolBarLeftSlim/ToolbarLeftSlim"
import { BarBottomMenu } from "../../components/BarBottomMenu/BarBottomMenu"
import { ListInvites } from "../../components/ComponentsInvites/ListInvites/ListInvites"
import { useContext } from "react"
import { AuthContext } from "../../contexts/Auth"


function InvitesList() {
    const {inactivityTime} = useContext(AuthContext);

    inactivityTime()
  const LocalInformation = localStorage.getItem("forpride");
  const user = JSON.parse(LocalInformation);

    return (
        <div className="content-invite">
            <ToolbarLeftSlim />
            <BarBottomMenu />
            <div className="main">
                <TopBar />
                <div className="aside">
                    <div className="invites">
                            <div className="invites-selected">
                                <button className="selected">Enviar convite</button>
                            </div>
                            <div className="invites-all">

                                <div className="invites-unic">
                                    <div className="informationInvite">
                                        <h4>Olá, {user.nickname}.<br />veja seus convites enviados</h4>
    
                                    </div>
                              <ListInvites />                       
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { InvitesList }