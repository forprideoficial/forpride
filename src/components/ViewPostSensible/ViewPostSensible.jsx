import "./viewPostSensible.css";
import { IoEyeOffOutline} from "react-icons/io5";
import { useState } from "react";


function ViewPostSensible() {
    const [view, setView] = useState(false);

    function handleViewPost(e) {
        e.preventDefault();

        if(view === false) {
            setView(true);
        } else {
            setView(false);

        }
    }
    return (
        <div className={view === false ? "ViewPostSensible" : "ViewPostSensibleTrue"}>
                <h3><IoEyeOffOutline color={"#fff"}/></h3>
                <h4>Conteúdo Sensível</h4>
                <h5>Este post pode apresentar conteúdo desconfotável para algumas pessoas</h5>

                <button onClick={handleViewPost}>Ver conteúdo</button>
        </div>
    )
}

export {ViewPostSensible}