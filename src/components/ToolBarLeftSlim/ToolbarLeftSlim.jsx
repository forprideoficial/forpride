import { IoCalendarOutline, IoList, IoRadio, IoPersonOutline, IoPeopleOutline, IoBusinessOutline, IoStatsChartOutline,
    IoInformationCircleOutline, IoMailUnreadOutline, IoMenuOutline, IoSettingsOutline, IoCashOutline } from "react-icons/io5";
import {memo} from 'react' 
import './toolbarLeftSlim.css'
import { ButtonFeed } from "../ButtonsTollBar/ButtonFeed/ButtonFeed";

function ToolbarLeftSlimComponent() {
    const LocalUser = localStorage.getItem("forpride");
    const user = JSON.parse(LocalUser);

    const avatarImg = "https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240"


    return (
        <div className="content-toolbar">
            <div className="ToolBarLeftSlim">
                <div className="image">
                <a href={user.status === "suspense" ? `/activeplain`:`/profile`}>
                    <img src={user !== null ? user.avatar :avatarImg} alt="" />
                    </a>
                </div>
                <div className="tools">

                <ButtonFeed />

                    {/* <a href="/profile" >
                    <button className="toolIcon" >
                        <IoPersonOutline size={20}/>Perfil
                    </button>
                    </a> */}
          
                    {/* <a href="/messages" >
                    <button className="toolIcon" >
                        <FiMail size={20}/>
                       Recados
                    </button>
                    </a> */}
                    <a href="/recados" >
                    <button className="toolIcon" >
                        <IoMailUnreadOutline size={20}/>
                       Recados
                    </button>
                    </a>
                    <a href={user.status === "suspense" ? `/activeplain`:`/radar`}>
                    <button className="toolIcon" >
                        <IoRadio size={20}/>
                       Radar
                    </button>
                    </a>
                    <a href={user.status === "suspense" ? `/activeplain`:`/ranking`}>
                    <button className="toolIcon" >
                        <IoStatsChartOutline size={20}/>
                       Ranking
                    </button>
                    </a>
                    <a href={user.status === "suspense" ? `/activeplain`:`/preventsfile`}>
                    <button className="toolIcon" >
                        <IoCalendarOutline size={20}/>
                       Eventos
                    </button>
                    </a>
                    <a href={user.status === "suspense" ? `/activeplain`:`/groups`}>
                    <button className="toolIcon" >
                        <IoPeopleOutline size={20}/>
                       Grupos
                    </button>
                    </a>
                    <a href={user.status === "suspense" ? `/activeplain`:`/foruns`}>
                    <button className="toolIcon" >
                        <IoList size={20}/>
                       Fóruns
                    </button>
                    </a>


                    


                    {/* <a href="/locals" >
                    <button className="toolIcon" >
                        <IoBusinessOutline size={20}/>Locais
                    </button>
                    </a> */}
           
                    <a href="/settings" >
                    <button className="toolIcon" >
                        <IoSettingsOutline size={20}/>Configs
                    </button>
                    </a>
                    {/* <a href="/plains" >
                    <button className="toolIcon" >
                        <IoCashOutline size={20}/>Planos
                    </button>
                    </a>  */}
                    <a href="/menu" >
                    <button className="toolIcon" >
                        <IoMenuOutline size={20}/>Menu
                    </button>
                    </a>
                    <a href="/infos" >
                    <button className="toolIcon" >
                        <IoInformationCircleOutline size={20}/>Infos
                    </button>
                    </a>
                </div>
            </div>
        </div>
    )
}

export const ToolbarLeftSlim = memo(ToolbarLeftSlimComponent)