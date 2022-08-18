import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/Auth';
import api from '../../services/api';
import './settingsPreferences.css'

function SettingsPreferences() {
    const {updatePreferencesAccount} = useContext(AuthContext);
    const Local = localStorage.getItem("forpride");
    const user = JSON.parse(Local)
    const [homem, setHomem] = useState("");
    const [mulher, setMulher] = useState("");
    const [casal, setCasal] = useState("");
    const [trisal, setTrisal] = useState("");
    const [travestis, setTravestis] = useState("");
    const [transexuais, setTransexuais] = useState("");
    const [grupos, setGrupos] = useState("");
    const [proposal, setProposal] = useState("");
    const [ preferences, setPreferences] = useState([])

    useEffect(() => {
        async function loadPreferences() {
            const idAccount = user.id;
            await api.get(`/preferences/${idAccount}`)
            .then((res) => {
              console.log(res.data[0])
              setPreferences(res.data[0])
            }).catch(error => {
              console.log("Erro ao buscar dados" + error)
          })
          }

          loadPreferences() 
    }, [user.id])

    
    function handlePreferences(e) {
        e.preventDefault();
        updatePreferencesAccount({
            id: preferences.id,
            men:homem,
            woman:mulher,
            couple:casal ,
            trisal:trisal,
            transvestites:travestis ,
            transsexuals:transexuais,
            groups:grupos,
            proposal:proposal,
            idAccount: user.id,
            idPatrono: user.patron,
            username: user.sername
        })
   }

    function handleSelectHomem(e) {
        if(homem === "") {
            setHomem(e.target.value);
        } else {
            setHomem("");
        }
    }
    function handleSelectMulher(e) {
        if(mulher === "") {
            setMulher(e.target.value);
        } else {
            setMulher("");
        }
    }
    function handleSelectCasal(e) {
        if(casal === "") {
            setCasal(e.target.value);
        } else {
            setCasal("");
        }
    }
    function handleSelectTrisal(e) {
        if(trisal === "") {
            setTrisal(e.target.value);
        } else {
            setTrisal("");
        }
    }
    function handleSelectTravestis(e) {
        if(travestis === "") {
            setTravestis(e.target.value);
        } else {
            setTravestis(e.target.value);
        }
    }
    function handleSelectTransexuais(e) {
        if(transexuais === "") {
            setTransexuais(e.target.value);
        } else {
            setTransexuais("");
        }
    }
    function handleSelectGrupos(e) {
        if(grupos === "") {
            setGrupos(e.target.value);
        } else {
            setGrupos("");
        }
    }


    return (

            <div className="settingsPreferences">
                <div className="title">
                    </div>
                        <form action="">
                    <div className="data">                      
                   
                    <div className="search">
                        <input type="checkbox"  value={"Homem"} onChange={handleSelectHomem}/><span>Homem</span>
                    </div>
                    <div className="search">
                        <input type="checkbox"  value={"Mulher"} onChange={handleSelectMulher}/><span>Mulher</span>
                    </div>
                    <div className="search">
                        <input type="checkbox" value={"Casal"} onChange={handleSelectCasal}/><span>Casal</span>
                    </div>
                    <div className="search">
                        <input type="checkbox"  value={"Trisal"} onChange={handleSelectTrisal}/><span>Trisal</span>
                    </div>
                    <div className="search">
                        <input type="checkbox" value={"Travestis"} onChange={handleSelectTravestis}/><span>Travestis</span>
                    </div>
                    <div className="search">
                        <input type="checkbox"  value={"Transexuais"} onChange={handleSelectTransexuais}/><span>Transexuais</span>
                    </div>
                    <div className="search">
                        <input type="checkbox" value={"Grupos"} onChange={handleSelectGrupos}/><span>Grupos</span>
                    </div>
                    </div>
                    <div className="proposal">
                        <textarea name="" id="" cols="100" rows="3" placeholder="proposta" value={proposal === ""? preferences.proposal : proposal} onChange={(e) => setProposal((e.target.value))}></textarea>
                    </div>
                    <div className='confirmation'>
                        <button onClick={handlePreferences}>Atualizar</button>
                    </div>
                        </form>
            </div>
    )
}

export {SettingsPreferences}