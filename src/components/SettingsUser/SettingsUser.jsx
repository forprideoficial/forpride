import { useState } from "react";
import "./settingsUser.css"
import {SettingsDataAccess} from '../SettingsDataAccess/SettingsDataAccess'
import { SettingsInformations } from "../SettingsInformations/SettingsInformations";
import { SettingsPreferences } from "../SettingsPreferences/SettingsPreferences";
import { SettingsCharacteristcs } from "../SettingsCharacteristcs/SettingsCharacteristcs";

function SettingsUser() {

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
    )
}

export {SettingsUser}