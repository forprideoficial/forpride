import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import logoImg from '../../assets/images/logo.png';
import { AuthContext } from '../../contexts/Auth';
import { v4 as uuidv4 } from 'uuid';
import {IoMaleOutline, IoFemaleOutline, IoMaleFemaleOutline, IoTransgenderOutline, IoPeopleOutline} from 'react-icons/io5';
import './preferencesForm.css'

function PreferencesForm({idAccount,email, username}) {
    const {preferencesAccount, logout} = useContext(AuthContext);


    const [homem, setHomem] = useState("");
    const [mulher, setMulher] = useState("");
    const [casal, setCasal] = useState("");
    const [trisal, setTrisal] = useState("");
    const [travestis, setTravestis] = useState("");
    const [transexuais, setTransexuais] = useState("");
    const [grupos, setGrupos] = useState("");
    const [proposal, setProposal] = useState("");
    const [styleHomem, setStyleHomem] = useState(false);
    const [styleMulher, setStyleMulher] = useState(false);
    const [styleCasal, setStyleCasal] = useState(false);
    const [styleTrisal, setStyleTrisal] = useState(false);
    const [styleTravestis, setStyleTravestis] = useState(false);
    const [styleTransex, setStyleTransex] = useState(false);
    const [styleGrupos, setStyleGrupos] = useState(false);


   
    function handlePreferences(e) {
        
        e.preventDefault();
        toast.info("Salvando Preferências. Aguarde...")
        const id = uuidv4()
        preferencesAccount({
            id,
            idAccount: idAccount,
            email,
            men:homem,
            woman:mulher,
            couple:casal,
            trisal:trisal,
            transvestites:travestis,
            transsexuals:transexuais,
            groups:grupos,
            proposal:proposal,
            patron: "",
            username,
        })
        console.log({
            id,
            idAccount: idAccount,
            email,
            men:homem,
            woman:mulher,
            couple:casal,
            trisal:trisal,
            transvestites:travestis,
            transsexuals:transexuais,
            groups:grupos,
            proposal:proposal
        })
    }

        function handleLogout() {
            logout(idAccount)
        }

    function handleSelectHomem(e) {
            e.preventDefault();

            if(styleHomem === false) {
                setStyleHomem(true)
            } else {
                setStyleHomem(false)
            }

            if(homem === "") {
                setHomem("Homem");
            } else {
                setHomem("");
            }

    }
    function handleSelectMulher(e) {
            e.preventDefault();

            if(styleMulher === false) {
                setStyleMulher(true)
            } else {
                setStyleMulher(false)
            }

            if(mulher === "") {
                setMulher("Mulher");
            } else {
                setMulher("");
            }



    }
    function handleSelectCasal(e) {
            e.preventDefault();
            if(styleCasal === false) {
                setStyleCasal(true)
            } else {
                setStyleCasal(false)
            }


            if(casal === "") {
                setCasal("Casal");
            } else {
                setCasal("");
            }

    }
    function handleSelectTrisal(e) {
            e.preventDefault();
            if(styleTrisal === false) {
                setStyleTrisal(true)
            } else {
                setStyleTrisal(false)
            }

            if(trisal === "") {
                setTrisal("Trisal");
            } else {
                setTrisal("");
            }

    }
    function handleSelectTravestis(e) {
            e.preventDefault();

            if(styleTravestis === false) {
                setStyleTravestis(true)
            } else {
                setStyleTravestis(false)
            }

            if(travestis === "") {
                setTravestis("Travestis");
            } else {
                setTravestis("");
            }

    }
    function handleSelectTransexuais(e) {
            e.preventDefault();

            if(styleTransex === false) {
                setStyleTransex(true)
            } else {
                setStyleTransex(false)
            }

            if(transexuais === "") {
                setTransexuais("Transexuais");
            } else {
                setTransexuais("");
            }

    }
    function handleSelectGrupos(e) {
            e.preventDefault();

            if(styleGrupos === false) {
                setStyleGrupos(true)
            } else {
                setStyleGrupos(false)
            }

            if(grupos === "") {
                setGrupos("Grupos");
            } else {
                setGrupos("");
            }

    }


    return (
            <div className="content-Login">
            <div className="preferencesForm">
                <div className="title">
                    <img src={logoImg} alt="" />
                    <h2>Preferências</h2>
                    </div>
                        <form action="">
                    <div className="data">                      
                        <button className={styleHomem === true ? "active" : ""} onClick={handleSelectHomem}><IoMaleOutline/> Homem</button>
                    
                        <button className={styleMulher === true ? "active" : ""} onClick={handleSelectMulher}><IoFemaleOutline/> Mulher</button>
                    
                        <button className={styleCasal === true ? "active" : ""} onClick={handleSelectCasal}><IoMaleFemaleOutline/> Casal</button>
                    
                        <button className={styleTrisal === true ? "active" : ""} onClick={handleSelectTrisal}><IoTransgenderOutline/> Trisal</button>
                    
                        <button className={styleTravestis === true ? "active" : ""} onClick={handleSelectTravestis}><IoTransgenderOutline/> Travestis</button>
                    
                        <button className={styleTransex === true ? "active" : ""} onClick={handleSelectTransexuais}><IoTransgenderOutline/> Transexuais</button>
                    
                        <button className={styleGrupos === true ? "active" : ""} onClick={handleSelectGrupos}><IoPeopleOutline/>Grupos</button>
                    </div>
                    <div className="proposal">
                        <textarea name="" id="" cols="100" rows="3" placeholder="proposta" value={proposal} onChange={(e) => setProposal((e.target.value))}></textarea>
                    </div>
                    <div className='confirmation'>
                        <br />
                        <br />
                        <button onClick={handlePreferences}>Salvar e Avançar</button>
                    </div>
                        </form>
            </div>


            </div>
    )
}

export {PreferencesForm}