import { BarBottomMenu } from "../../components/BarBottomMenu/BarBottomMenu"
import { TopBar } from "../../components/TopBar/TopBar"
import { IoCalendarOutline, IoList, IoRadio,IoMailUnreadOutline, IoPersonOutline, IoCashOutline, IoSettingsOutline, IoPeopleOutline, IoMenuOutline, IoCameraOutline, IoArrowBackOutline,
    IoInformationCircleOutline, IoLogOutOutline, IoChatbubblesOutline, IoMailOutline, IoTrashOutline, IoBusinessOutline, IoMailOpenOutline, IoStatsChartOutline, IoCloseOutline, IoWalletOutline } from "react-icons/io5"
import {FaCrown} from "react-icons/fa"
import "./menu.css"
import { useContext } from "react"
import { AuthContext } from "../../contexts/Auth"

function Menu() {
    const {logout} = useContext(AuthContext);
    const Local = localStorage.getItem("forpride");
    const userData = JSON.parse(Local);

    function handleLogout() {
        logout(userData.id)
    }
    
    return (
        <div className="container">
            <TopBar />
        <div className="content">
        <div className="menu">
            <div className="unic">
                <a href="/profile" className="Primary"><IoPersonOutline />Meu perfil</a>
                <a href="/settings"><IoSettingsOutline />Configurações</a>
            </div>
            <div className="double">
                <div className="unic">
                    <a href={userData.status === "suspense" ? `/activeplain`:`/groups`} className="Primary"><IoPeopleOutline />Grupos</a>
                </div>
                <div className="unic">
                    <a href={userData.status === "suspense" ? `/activeplain`:`/events`} className="Primary"><IoCalendarOutline />Eventos</a>
                </div>
            </div>
            <div className="double">
                <div className="unic"> 
                    <a href={userData.status === "suspense" ? `/activeplain`:`/messages`} className="Primary"><IoChatbubblesOutline /> Mensagens</a>
                </div>
                <div className="unic">
                    <a href={userData.status === "suspense" ? `/activeplain`:`/recados`} className="Primary"><IoMailUnreadOutline /> Recados</a>
                </div>
            </div>
            <div className="double">
                <div className="unic">
                    <a href={userData.status === "suspense" ? `/activeplain`:`/invite`} className="Primary"><IoMailOutline /> Convite</a>
                </div>
                <div className="unic">
                    <a href={userData.status === "suspense" ? `/activeplain`:`/foruns`} className="Primary"><IoList />Fóruns</a>
                </div>
            </div>
            <div className="double">
                <div className="unic">
                    <a href={userData.status === "suspense" ? `/activeplain`:`/ranking`} className="Primary"><IoStatsChartOutline />Ranking</a>
                </div>
                <div className="unic">
                    <a href={userData.status === "suspense" ? `/activeplain`:`/radar`} className="Primary"><IoRadio />Radar</a>
                </div>
            </div>
            <div className="double">
                {/* <div className="unic">
                    <a href="/plain" className="Primary"><IoWalletOutline />Pagamentos</a>
                </div> */}
                <div className="unic">
                    <a href="/infos" className="Primary"><IoInformationCircleOutline />Informações</a>
                </div>
            </div>
            {/* <div className="unic2">
                <a href="/pricing" className="Primary"><FaCrown />Seja Essencial por R$ 9,90</a>
            </div> */}
            <div className="unic3">
                <button onClick={handleLogout}><IoLogOutOutline /> Sair</button>
            </div>
</div>
</div>
<BarBottomMenu />
        </div>
    )
}

export {Menu}