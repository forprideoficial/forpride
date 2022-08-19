import { useParams } from "react-router-dom"
import { PreferencesForm } from "../../components/PreferencesForm/PreferencesForm"
import './preferences.css'

function Preferences() {
    const {idAccount, email, username} = useParams()
    console.log(idAccount, email)
    return (
        <div className="content">
            <div className="registration2">
                <PreferencesForm idAccount={idAccount} email={email} username={username}/>
            </div>
        </div>
    )
}

export {Preferences}