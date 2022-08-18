import { useEffect, useState } from "react"
import api from "../../../services/api"

function AccountCreatedInvite({mail}) {
    console.log(mail)

    const [account, setAccount] = useState([])

    useEffect(() => {
        async function loadAccountEmail() {
            await api.get(`/accounts/find/${mail}`).then((res) => {
                setAccount(res.data[0])
                console.log(res.data[0])
                console.log(res.data)
            })
        }

        loadAccountEmail()
     },[])



    return (
        <div className="account">
            <h5><b>{account === undefined || account === "" ? "Sem conta criada" : `Conta criada com o id: ${account.id}`}</b></h5>
        </div>
    )
}

export { AccountCreatedInvite }