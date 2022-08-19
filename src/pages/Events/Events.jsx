import { TopBar } from "../../components/TopBar/TopBar"
import { FiPlusCircle} from 'react-icons/fi'
// import './events.css'
import { ToolbarLeftSlim } from "../../components/ToolBarLeftSlim/ToolbarLeftSlim"
import { ChatSlim } from "../../components/ChatSlim/ChatSlim"
import { useState } from "react"

import { ListEvents } from "../../components/ListEvents/ListEvents"
import { MyEvents } from "../../components/MyEvents/MyEvents"
import { CreateEvents } from "../../components/CreateEvents/CreateEvents"
import { BarBottomMenu } from "../../components/BarBottomMenu/BarBottomMenu"

function Events() {

    const [select, setSelect] = useState("All");

    function handleAllGroups() {
        setSelect("All")
    }
    function handleParticipate() {
        setSelect("Participate")
    }
    function handleMyEvents() {
        setSelect("My")
    }
    function handleSelectCreate() {
        setSelect("Create")
    }

    return (
        <div className="content">
     <ToolbarLeftSlim />
     <BarBottomMenu />
            <div className="main-event">
                <TopBar />
                <div className="aside-event">
                    <div className="event">
                            <div className="event-selected">
                                <button className={select === "All" ? "selected" : ""} onClick={handleAllGroups}>Eventos</button>
                                <button className={select === "Participate" ? "selected" : ""} onClick={handleParticipate}>Eu vou!</button>
                                <button className={select === "My" ? "selected" : ""} onClick={handleMyEvents}>Meus Eventos</button>
                            </div>
                            <div className="event-buttons">
                                <div className="event-create">
                                <button onClick={handleSelectCreate}><FiPlusCircle size={20}/> Criar evento</button>
                                </div>
                            </div>

                            {select === "All" ?
                            <ListEvents />: 
                            select === "Participate" ?
                            <MyEvents /> : 
                            select === "My" ?
                            <MyEvents /> : 
                            select === "Create" ?
                            <CreateEvents /> : 
                            <div>
                                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                                <br /><br /><br /><br /><br />
                               
                            </div>
                        }

<br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                           
                    </div>
                </div>
            </div>
        </div>
    )
}

export { Events }