import { useState } from "react";
import { BarBottomMenu } from "../../components/BarBottomMenu/BarBottomMenu";
import { ChatSlim } from "../../components/ChatSlim/ChatSlim";
import { SettingsCharacteristcs } from "../../components/SettingsCharacteristcs/SettingsCharacteristcs";
import { SettingsDataAccess } from "../../components/SettingsDataAccess/SettingsDataAccess";
import { SettingsInformations } from "../../components/SettingsInformations/SettingsInformations";
import { SettingsPreferences } from "../../components/SettingsPreferences/SettingsPreferences";
import { ToolbarLeftSlim } from "../../components/ToolBarLeftSlim/ToolbarLeftSlim";
import { TopBar } from "../../components/TopBar/TopBar";
// import './settings.css'

function Settings() {
    const [informations, setInformations] = useState("informations");
    const [characteristcs, setCharacteristcs] = useState("");
    const [preferences, setPreferences] = useState("");
    const [dataAccess, setDataAccess] = useState("");


    function handleInformations() {
        setInformations("informations")
        setCharacteristcs("")
        setPreferences("")
        setDataAccess("")
    }
    function handleCaracteristicas() {
        setCharacteristcs("characteristcs")
        setInformations("")
        setPreferences("")
        setDataAccess("")
    }
    function handlePreferencias() {
        setPreferences("preferences")
        setCharacteristcs("")
        setInformations("")
        setDataAccess("")
    }
    function handleDadosAcesso() {
        setDataAccess("dataAccess")
        setPreferences("")
        setCharacteristcs("")
        setInformations("")
    }   


    return(
        <div className="settings">
                 <ToolbarLeftSlim />
                 <BarBottomMenu />
                 <TopBar />
            <div className="settings-page">

            <div className="buttons">
                <button className={informations === "informations" ? "selected" : ""} onClick={handleInformations}>Informations</button>
                <button className={characteristcs === "characteristcs" ? "selected" : ""}  onClick={handleCaracteristicas}>Caracteristicas</button>
                <button className={preferences === "preferences" ? "selected" : ""}  onClick={handlePreferencias}>Preferências</button>
                <button className={dataAccess === "dataAccess" ? "selected" : ""}  onClick={handleDadosAcesso}>Conta</button>

            </div>
            {informations === "informations" ?
            <SettingsInformations />
            :
        characteristcs === "characteristcs" ?
        <SettingsCharacteristcs />
        :
        preferences === "preferences" ?
        <SettingsPreferences />
        :
        dataAccess === "dataAccess" ?
        <SettingsDataAccess />
        :
            "Nada para mostrar ainda"
            }
        </div>
        </div>
    )
}


export {Settings}