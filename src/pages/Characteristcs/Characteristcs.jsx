import { useParams } from "react-router-dom"
import { CharacteristcsForm } from "../../components/CharacteristcsForm/CharacteristcsForm"
import './characteristcs.css'

function Characteristcs() {
    const {idAccount, email, type, username} = useParams()
    console.log(idAccount, email, type, username)
    return (
        <div className="content2">
            <div className="registration2">
                <CharacteristcsForm idAccount={idAccount} email={email} type={type} username={username}/>
            </div>
        </div>
    )
}

export {Characteristcs}