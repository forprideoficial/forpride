import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import logoImg from '../../assets/images/logo.png';
import { AuthContext } from '../../contexts/Auth';
import { IoCalendarOutline, IoHeartOutline, IoMaleFemaleOutline, IoTransgenderOutline} from 'react-icons/io5';
import {v4 as uuidv4} from 'uuid';
import './characteristcsForm.css'

function CharacteristcsForm({idAccount,email, type, username}) {
    const {createCharacteristcs, createCharacteristcs2, createCharacteristcs3, deleteAccount, logout} = useContext(AuthContext);
    const Local = localStorage.getItem("forpride");
    const user = JSON.parse(Local);
    const LocalInformations = localStorage.getItem("informations-forpride");
    const userInformations = JSON.parse(LocalInformations);

    const [idade, setIdade] = useState(0);
    const [idade2, setIdade2] = useState(0);
    const [idade3, setIdade3] = useState(0);

    const [data,setData] = useState("");
    const [sex,setSex] = useState("");
    const [sign,setSign] = useState("");
    const [sexualOption,setSexualOption] = useState("");

    const [data2,setData2] = useState("");
    const [sex2,setSex2] = useState("");
    const [sign2,setSign2] = useState("");
    const [sexualOption2,setSexualOption2] = useState("");

    const [data3,setData3] = useState("");
    const [sex3,setSex3] = useState("");
    const [sign3,setSign3] = useState("");
    const [sexualOption3,setSexualOption3] = useState("");


    const nascimento = new Date(data);
    const nascimento2 = new Date(data2);
    const nascimento3 = new Date(data3);
    const hoje = new Date();


    let idadeAtual = 0
    let idadeAtual2 = 0
    let idadeAtual3 = 0
    
    if(data !== "") {
        idadeAtual = Math.floor(Math.ceil(Math.abs(nascimento.getTime() - hoje.getTime()) / (1000 * 3600 * 24)) / 365.25) ;
        console.log(idadeAtual);
    }
    if(data2 !== "") {
        idadeAtual2 = Math.floor(Math.ceil(Math.abs(nascimento2.getTime() - hoje.getTime()) / (1000 * 3600 * 24)) / 365.25)
        console.log(idadeAtual2);
    }
    if(data3 !== "") {
       idadeAtual3 = Math.floor(Math.ceil(Math.abs(nascimento3.getTime() - hoje.getTime()) / (1000 * 3600 * 24)) / 365.25)
       console.log(idadeAtual3);
    }

    
      

    function handleCreateCharacteristcs(e){
        e.preventDefault()
        
        if(data !== "" && sex !== "" && sign !== "" && sexualOption !== "" && data2 !== "" && sex2 !== "" && sign2 !== "" && sexualOption2 !== "" && data3 !== "" && sex3 !== "" && sign3 !== "" && sexualOption3 !== "") {
            toast.info("Salvando Caracteristicas do trisal. Aguarde...");

            const id1 = uuidv4();
            const id2 = uuidv4();
            const id3 = uuidv4();
            createCharacteristcs3({
                idAccount: idAccount,
                email,
                id3,
                data3,
                sex3,
                sign3,
                sexualOption3,
                id2,
                data2,
                sex2,
                sign2,
                sexualOption2,
                id1,
                data,
                sex,
                sign,
                sexualOption,
            username})
        } else if ( data !== "" && sex !== "" && sign !== "" && sexualOption !== "" && data2 !== "" && sex2 !== "" && sign2 !== "" && sexualOption2 !== "") {
            toast.info("Salvando Caracteristicas do casal. Aguarde...");
            const id1 = uuidv4();
            const id2 = uuidv4();
            createCharacteristcs2({
                idAccount: idAccount,
                email,
                id2,
                data2,
                sex2,
                sign2,
                sexualOption2,
                id1,
                data,
                sex,
                sign,
                sexualOption,
                username
            })

        } else if ( data !== "" && sex !== "" && sign !== "" && sexualOption !== "") {
            toast.info("Salvando Caracteristicas. Aguarde...");
            const id1 = uuidv4();
            createCharacteristcs({
                idAccount: idAccount,
                email,
                id1,
                data,
                sex,
                sign,
                sexualOption,
                username
            })

        } else {
            toast.error("Data de nascimento, sexo, opção sexual ou signo não estão preenchidos!")
        }
    }

//-----------------------------------

function handleLogout() {
    logout(user.id)
}

    function handleSelectSex(e) {
        setSex(e.target.value)
    }
    
    
    function handleSelectSign(e) {
        setSign(e.target.value)
    }

    function handleSelectSexualOption(e) {
        setSexualOption(e.target.value)
    }

    function handleSelectSex2(e) {
        setSex2(e.target.value)
    }

    function handleSelectSign2(e) {
        setSign2(e.target.value)
    }

    function handleSelectSexualOption2(e) {
        setSexualOption2(e.target.value)
    }

    function handleSelectSex3(e) {
        setSex3(e.target.value)
    }


    function handleSelectSign3(e) {
        setSign3(e.target.value)
    }

    function handleSelectSexualOption3(e) {
        setSexualOption3(e.target.value)
    }

    function handleDeleteAccount(e) {
        e.preventDefault();
        deleteAccount(user.id)
    }



    return (
            <div className="content-caracteristicas">

                <div className="title">
                    <img src={logoImg} alt="" />
                    <h2>Caracteristicas</h2>
                    </div>
                    <br />
                        <br />
                        <br />
                        <form onSubmit={handleCreateCharacteristcs}>

                            <div className="data">
                            <br /><br />
                   {type === "Trisal" ?
                    <div className="data-form">   
                    <span>Membro casal 1</span><br />
                    <h5>Data de nascimento</h5>
                    {data !== "" ?
                         idadeAtual >= 18 ? 
                     <h4>Sua idade é {idadeAtual} anos</h4>:
                     <h3>Sua idade é {idadeAtual} anos</h3>
                      : ""}
                    <div className="date">
                    <p> <IoCalendarOutline /></p>
                    <input required type="date" placeholder="Data de Nascimenrto" value={data}  onChange={(e) => setData(e.target.value)}/>
                    </div>

                    <div className="date">
                    <p> <IoMaleFemaleOutline /></p>
                    <select className={sex === "" ? "" : "active"} required value={sex} onChange={handleSelectSex}>
                                <option value="">Sexo</option>
                                <option value="Homem">Homem </option>
                                <option value="Mulher">Mulher</option>
                            </select>
                            </div>

                            <div className="date">
                    <p> <IoTransgenderOutline /></p>
                            <select className={sexualOption === "" ? "" : "active"} required value={sexualOption} onChange={handleSelectSexualOption}>
                                <option value="">Opção Sexual</option>
                                <option value="Hetero Sexual">Hetero Sexual </option>
                                <option value="Bissexual">Bissexual</option>
                                <option value="Bi Curioso">Bi Curioso</option>
                                <option value="Pansexual">Pansexual</option>
                            </select>
                            </div>

                            <div className="date">
                    <p> <IoHeartOutline /></p>
                            <select className={sign === "" ? "" : "active"} required value={sign} onChange={handleSelectSign}>
                                <option value="">Signo</option>
                                <option value="Áries">Áries </option>
                                <option value="Touro">Touro </option>
                                <option value="Gêmeos">Gêmeos</option>
                                <option value="Câncer">Câncer</option>
                                <option value="Leão">Leão</option>
                                <option value="Virgem">Virgem</option>
                                <option value="Libra">Libra</option>
                                <option value="Escorpião">Escorpião</option>
                                <option value="Sagitário">Sagitário</option>
                                <option value="Capricórnio">Capricórnio</option>
                                <option value="Aquário">Aquário</option>
                                <option value="Peixes">Peixes</option>
                            </select>
                            </div>
                    <br /><br />
                    <span>Membro casal 2</span><br />
                    <h5>Data de nascimento</h5>
                    {data2 !== "" ?
                         idadeAtual2 >= 18 ? 
                     <h4>Sua idade é {idadeAtual2} anos</h4>:
                     <h3>Sua idade é {idadeAtual2} anos</h3>
                      : ""}
                    <div className="date">
                    <p> <IoCalendarOutline /></p>
                    <input required type="date" placeholder="Data de Nascimenrto" value={data2}  onChange={(e) => setData2(e.target.value)}/>
                    </div>

                    <div className="date">
                    <p> <IoMaleFemaleOutline /></p>
                    <select className={sex2 === "" ? "" : "active"} required value={sex2} onChange={handleSelectSex2}>
                                <option value="">Sexo</option>
                                <option value="Homem">Homem </option>
                                <option value="Mulher">Mulher</option>
                            </select>
                            </div>

                            <div className="date">
                    <p> <IoTransgenderOutline /></p>
                            <select className={sexualOption2 === "" ? "" : "active"} required value={sexualOption2} onChange={handleSelectSexualOption2}>
                                <option value="">Opção Sexual</option>
                                <option value="Hetero Sexual">Hetero Sexual </option>
                                <option value="Bissexual">Bissexual</option>
                                <option value="Bi Curioso">Bi Curioso</option>
                                <option value="Pansexual">Pansexual</option>
                            </select>
                            </div>

                            <div className="date">
                    <p> <IoHeartOutline /></p>
                            <select className={sign2 === "" ? "" : "active"} required value={sign2} onChange={handleSelectSign2}>
                                <option value="">Signo</option>
                                <option value="Áries">Áries </option>
                                <option value="Touro">Touro </option>
                                <option value="Gêmeos">Gêmeos</option>
                                <option value="Câncer">Câncer</option>
                                <option value="Leão">Leão</option>
                                <option value="Virgem">Virgem</option>
                                <option value="Libra">Libra</option>
                                <option value="Escorpião">Escorpião</option>
                                <option value="Sagitário">Sagitário</option>
                                <option value="Capricórnio">Capricórnio</option>
                                <option value="Aquário">Aquário</option>
                                <option value="Peixes">Peixes</option>
                            </select>
                            </div>

                            <br /><br />
                    <span>Membro casal 3</span><br />
                    <h5>Data de nascimento</h5>
                    {data3 !== "" ?
                         idadeAtual3 >= 18 ? 
                     <h4>Sua idade é {idadeAtual3} anos</h4>:
                     <h3>Sua idade é {idadeAtual3} anos</h3>
                      : ""}
                    <div className="date">
                    <p> <IoCalendarOutline /></p>
                    <input required type="date" placeholder="Data de Nascimenrto" value={data3}  onChange={(e) => setData3(e.target.value)}/>
                    </div>

                    <div className="date">
                    <p> <IoMaleFemaleOutline /></p>
                    <select className={sex3 === "" ? "" : "active"} required value={sex3} onChange={handleSelectSex3}>
                                <option value="">Sexo</option>
                                <option value="Homem">Homem </option>
                                <option value="Mulher">Mulher</option>
                            </select>
                            </div>

                            <div className="date">
                    <p> <IoTransgenderOutline /></p>
                            <select className={sexualOption3 === "" ? "" : "active"} required value={sexualOption3} onChange={handleSelectSexualOption3}>
                                <option value="">Opção Sexual</option>
                                <option value="Hetero Sexual">Hetero Sexual </option>
                                <option value="Bissexual">Bissexual</option>
                                <option value="Bi Curioso">Bi Curioso</option>
                                <option value="Pansexual">Pansexual</option>
                            </select>
                            </div>

                            <div className="date">
                    <p> <IoHeartOutline /></p>
                            <select className={sign3 === "" ? "" : "active"} required value={sign3} onChange={handleSelectSign3}>
                                <option value="">Signo</option>
                                <option value="Áries">Áries </option>
                                <option value="Touro">Touro </option>
                                <option value="Gêmeos">Gêmeos</option>
                                <option value="Câncer">Câncer</option>
                                <option value="Leão">Leão</option>
                                <option value="Virgem">Virgem</option>
                                <option value="Libra">Libra</option>
                                <option value="Escorpião">Escorpião</option>
                                <option value="Sagitário">Sagitário</option>
                                <option value="Capricórnio">Capricórnio</option>
                                <option value="Aquário">Aquário</option>
                                <option value="Peixes">Peixes</option>
                            </select>
                            </div>
       </div>
             : type === "Casal"?
             <div className="data-form">
                  <span>Membro casal 1</span><br />
                  <h5>Data de nascimento</h5>
                  {data !== "" ?
                         idadeAtual >= 18 ? 
                     <h4>Sua idade é {idadeAtual} anos</h4>:
                     <h3>Sua idade é {idadeAtual} anos</h3>
                      : ""}
                  <div className="date">
                    <p> <IoCalendarOutline /></p>
                    <input required type="date" placeholder="Data de Nascimenrto" value={data}  onChange={(e) => setData(e.target.value)}/>
                    </div>

                    <div className="date">
                    <p> <IoMaleFemaleOutline /></p>
                    <select className={sex === "" ? "" : "active"} required value={sex} onChange={handleSelectSex}>
                                <option value="">Sexo</option>
                                <option value="Homem">Homem </option>
                                <option value="Mulher">Mulher</option>
                            </select>
                            </div>

                            <div className="date">
                    <p> <IoTransgenderOutline /></p>
                            <select className={sexualOption === "" ? "" : "active"} required value={sexualOption} onChange={handleSelectSexualOption}>
                                <option value="">Opção Sexual</option>
                                <option value="Hetero Sexual">Hetero Sexual </option>
                                <option value="Bissexual">Bissexual</option>
                                <option value="Bi Curioso">Bi Curioso</option>
                                <option value="Pansexual">Pansexual</option>
                            </select>
                            </div>

                            <div className="date">
                    <p> <IoHeartOutline /></p>
                            <select className={sign === "" ? "" : "active"} required value={sign} onChange={handleSelectSign}>
                                <option value="">Signo</option>
                                <option value="Áries">Áries </option>
                                <option value="Touro">Touro </option>
                                <option value="Gêmeos">Gêmeos</option>
                                <option value="Câncer">Câncer</option>
                                <option value="Leão">Leão</option>
                                <option value="Virgem">Virgem</option>
                                <option value="Libra">Libra</option>
                                <option value="Escorpião">Escorpião</option>
                                <option value="Sagitário">Sagitário</option>
                                <option value="Capricórnio">Capricórnio</option>
                                <option value="Aquário">Aquário</option>
                                <option value="Peixes">Peixes</option>
                            </select>
                            </div>
                            
                            <br /><br />
                    <span>Membro casal 2</span><br />
                    <h5>Data de nascimento</h5>
                    {data2 !== "" ?
                         idadeAtual2 >= 18 ? 
                     <h4>Sua idade é {idadeAtual2} anos</h4>:
                     <h3>Sua idade é {idadeAtual2} anos</h3>
                      : ""}
                    <div className="date">
                    <p> <IoCalendarOutline /></p>
                    <input required type="date" placeholder="Data de Nascimenrto" value={data2}  onChange={(e) => setData2(e.target.value)}/>
                    </div>

                    <div className="date">
                    <p> <IoMaleFemaleOutline /></p>
                    <select className={sex2 === "" ? "" : "active"} required value={sex2} onChange={handleSelectSex2}>
                                <option value="">Sexo</option>
                                <option value="Homem">Homem </option>
                                <option value="Mulher">Mulher</option>
                            </select>
                            </div>

                            <div className="date">
                    <p> <IoTransgenderOutline /></p>
                            <select className={sexualOption2 === "" ? "" : "active"} required value={sexualOption2} onChange={handleSelectSexualOption2}>
                                <option value="">Opção Sexual</option>
                                <option value="Hetero Sexual">Hetero Sexual </option>
                                <option value="Bissexual">Bissexual</option>
                                <option value="Bi Curioso">Bi Curioso</option>
                                <option value="Pansexual">Pansexual</option>
                            </select>
                            </div>

                            <div className="date">
                    <p> <IoHeartOutline /></p>
                            <select className={sign2 === "" ? "" : "active"} required value={sign2} onChange={handleSelectSign2}>
                                <option value="">Signo</option>
                                <option value="Áries">Áries </option>
                                <option value="Touro">Touro </option>
                                <option value="Gêmeos">Gêmeos</option>
                                <option value="Câncer">Câncer</option>
                                <option value="Leão">Leão</option>
                                <option value="Virgem">Virgem</option>
                                <option value="Libra">Libra</option>
                                <option value="Escorpião">Escorpião</option>
                                <option value="Sagitário">Sagitário</option>
                                <option value="Capricórnio">Capricórnio</option>
                                <option value="Aquário">Aquário</option>
                                <option value="Peixes">Peixes</option>
                            </select>
                            </div>

             </div>
             :
             
             <div className="data-form">
                     <h5>Data de nascimento</h5>
                    {data !== "" ?
                         idadeAtual >= 18 ? 
                     <h4>Sua idade é {idadeAtual} anos</h4>:
                     <h3>Sua idade é {idadeAtual} anos</h3>
                      : ""}
                     <div className="date">
                    <p> <IoCalendarOutline /></p>
                    <input required type="date" placeholder="Data de Nascimenrto" value={data}  onChange={(e) => setData(e.target.value)}/>
                    </div>

                    <div className="date">
                    <p> <IoMaleFemaleOutline /></p>
                    <select className={sex === "" ? "" : "active"} required value={sex} onChange={handleSelectSex}>
                                <option value="">Sexo</option>
                                <option value="Homem">Homem </option>
                                <option value="Mulher">Mulher</option>
                            </select>
                            </div>

                            <div className="date">
                    <p> <IoTransgenderOutline /></p>
                            <select className={sexualOption === "" ? "" : "active"} required value={sexualOption} onChange={handleSelectSexualOption}>
                                <option value="">Opção Sexual</option>
                                <option value="Hetero Sexual">Hetero Sexual </option>
                                <option value="Bissexual">Bissexual</option>
                                <option value="Bi Curioso">Bi Curioso</option>
                                <option value="Pansexual">Pansexual</option>
                            </select>
                            </div>

                            <div className="date">
                    <p> <IoHeartOutline /></p>
                            <select className={sign === "" ? "" : "active"} required value={sign} onChange={handleSelectSign}>
                                <option value="">Signo</option>
                                <option value="Áries">Áries </option>
                                <option value="Touro">Touro </option>
                                <option value="Gêmeos">Gêmeos</option>
                                <option value="Câncer">Câncer</option>
                                <option value="Leão">Leão</option>
                                <option value="Virgem">Virgem</option>
                                <option value="Libra">Libra</option>
                                <option value="Escorpião">Escorpião</option>
                                <option value="Sagitário">Sagitário</option>
                                <option value="Capricórnio">Capricórnio</option>
                                <option value="Aquário">Aquário</option>
                                <option value="Peixes">Peixes</option>
                            </select>
                            </div>
             </div>
                }
                </div>
                <br />

                        <br />
                    <div className='confirmation'>
                       <br />


                       {type === "Trisal" ?
                            data === "" ? "":
                            idadeAtual < 18 || idadeAtual2 < 18 || idadeAtual3 < 18 ? 
                            <div className="message">
                            <h4>Não aceitamos membros menores de 18 anos. Você não pode prosseguir. </h4>
                            <button onclick={handleDeleteAccount}>Deletar minha conta</button>
                            </div>
                            :
                            <>
                            <button type='submit'>Salvar e avançar</button>
                            </>
                        : type === "Casal"?
                            data === "" ? "":
                            idadeAtual < 18 || idadeAtual2 < 18  ? 
                            <div className="message">
                            <h4>Não aceitamos membros menores de 18 anos. Você não pode prosseguir. </h4>
                            <button onclick={handleDeleteAccount}>Deletar minha conta</button>
                            </div>
                            :
                            <>
                            <button type='submit'>Salvar e avançar</button>
                            </>
                        : 
                            data === "" ? "":
                            idadeAtual < 18  ? 
                            <div className="message">
                            <h4>Não aceitamos membros menores de 18 anos. Você não pode prosseguir. </h4>
                            <button onclick={handleDeleteAccount}>Deletar minha conta</button>
                            </div>
                            :
                            <>
                            <button type='submit'>Salvar e avançar</button>
                            </>

                        }


                    </div>
                        </form>
                        <br />
                        <br />
                        <br />
            </div>
    )
}

export {CharacteristcsForm}