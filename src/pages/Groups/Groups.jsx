import { TopBar } from "../../components/TopBar/TopBar"
import { FiPlusCircle} from 'react-icons/fi'
// import './groups.css'
import { ToolbarLeftSlim } from "../../components/ToolBarLeftSlim/ToolbarLeftSlim"
import { ListGroups } from "../../components/ListGroups/ListGroups"
import { ChatSlim } from "../../components/ChatSlim/ChatSlim"
import { useState, useContext } from "react"
import { AuthContext } from "../../contexts/Auth"
import { GroupsCreated } from "../../components/GroupsCreated/GroupsCreated"
import { CreateGroups } from "../../components/CreateGroups/CreateGroups"
import { BarBottomMenu } from "../../components/BarBottomMenu/BarBottomMenu"

function Groups() {

      const {inactivityTime} = useContext(AuthContext);

  inactivityTime()

    const [select, setSelect] = useState("All");

    function handleAllGroups() {
        setSelect("All")
    }

    function handleParticipate() {
        setSelect("My")
    }
    function handleSelectCreate() {
        setSelect("Create")
    }

    return (
        <div className="content">
     <ToolbarLeftSlim />
     <BarBottomMenu />
            <div className="main-group">
                <TopBar />
                <div className="aside-group">
                    <div className="group">
                            <div className="group-selected">
                                <button className={select === "All" ? "selected" : ""} onClick={handleAllGroups}>Todos os Grupos</button>
                                <button className={select === "My" ? "selected" : ""} onClick={handleParticipate}>Meus grupos</button>
                            </div>
                            <div className="group-buttons">
                                <div className="group-create">
                                <button onClick={handleSelectCreate}><FiPlusCircle size={20}/> Criar grupo</button>
                                </div>
                            </div>

                            {select === "All" ?
                            <ListGroups />:
                            select === "My" ?
                            <GroupsCreated /> : 
                            select === "Create" ?
                            <CreateGroups /> : 
                            <div>
                                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                                <br /><br /><br /><br /><br />
                               
                            </div>
                        }

                            
                           
                    </div>
                </div>
            </div>
        </div>
    )
}

export { Groups }