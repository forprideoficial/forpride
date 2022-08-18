import { useFetch } from "../../hooks/useFetch";
import { UsersSearchLikes } from "../ButtonsTopBar/SearchUsers/UsersSearchLikes/UsersSearchLikes";
import "./lisMembers.css"

function LisMembers({idEvent}) {
    console.log(idEvent)

    const {data} = useFetch(`/membersevents/${idEvent}`);

    if(!data) {
        return (
            <h3>Carregando...</h3>
        )
    }

    return (
        <div className="LisMembers">
            <div className="text">
            <h4>Presenças confirmadas</h4>
            </div>

            <div className="allMembers">
            {data?.map((members) => {
                return (
                    <div className="memberUnic" key={members.idAccount}>
                    <UsersSearchLikes idAccount={members.idAccount} />
                </div>
                )
            })}


            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
        </div>
    )
}

export { LisMembers }


