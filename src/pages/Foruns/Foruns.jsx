import { TopBar } from "../../components/TopBar/TopBar"
import { FiPlusCircle} from 'react-icons/fi'
// import './foruns.css'
import { ToolbarLeftSlim } from "../../components/ToolBarLeftSlim/ToolbarLeftSlim"
import { ChatSlim } from "../../components/ChatSlim/ChatSlim"
import { useState, useContext } from "react"
import { AuthContext } from "../../contexts/Auth"
import { ListForuns } from "../../components/ListForuns/ListForuns"
import { MyForuns } from "../../components/MyForuns/MyForuns"
import { CreateForum } from "../../components/CreateForum/CreateForum"
import { BarBottomMenu } from "../../components/BarBottomMenu/BarBottomMenu"


function Foruns() {

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
                                <button className={select === "All" ? "selected" : ""} onClick={handleAllGroups}>Todos Foruns</button>
                                <button className={select === "My" ? "selected" : ""} onClick={handleParticipate}>Meus Foruns</button>
                            </div>
                            <div className="group-buttons">
                                <div className="group-create">
                                <button onClick={handleSelectCreate}><FiPlusCircle size={20}/> Criar forum</button>
                                </div>
                            </div>

                            {select === "All" ?
                            <ListForuns />: 
                            select === "My" ?
                            <MyForuns /> : 
                            select === "Create" ?
                            <CreateForum /> : 
                            <div>
                              
                            </div>
                        }

                            
                           
                    </div>
                </div>
            </div>
        </div>
    )
}

export { Foruns }