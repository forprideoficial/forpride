import { useContext, useEffect, useState } from 'react';
import { FiRefreshCcw } from 'react-icons/fi';
import { AuthContext } from '../../contexts/Auth';
import api from '../../services/api';
import './settingsCharacteristcs.css'

function SettingsCharacteristcs() {
    const {loading, newUpdateCharacteristcs, newUpdateCharacteristcs2, newUpdateCharacteristcs3} = useContext(AuthContext);
    const Local = localStorage.getItem("forpride");
    const user = JSON.parse(Local)

    const [characteristics, setCharacteristics] = useState([])
    const [characteristics2, setCharacteristics2] = useState([])
    const [characteristics3, setCharacteristics3] = useState([])

    const [birthDate,setBirthDate] = useState("");
    const [sex,setSex] = useState("");
    const [sign,setSign] = useState("");
    const [sexualOption,setSexualOption] = useState("");

    const [birthDate2,setBirthDate2] = useState("");
    const [sex2,setSex2] = useState("");
    const [sign2,setSign2] = useState("");
    const [sexualOption2,setSexualOption2] = useState("");

    const [birthDate3,setBirthDate3] = useState("");
    const [sex3,setSex3] = useState("");
    const [sign3,setSign3] = useState("");
    const [sexualOption3,setSexualOption3] = useState("");



    useEffect(() => {
        async function loadCharacteristcs() {
            const idAccount = user.id
            await api.get(`characteristics/${idAccount}`)
            .then((res) => {
              setCharacteristics(res.data[0])
              setCharacteristics2(res.data[1])
              setCharacteristics3(res.data[2])
            }).catch(error => {
              console.log("Erro ao buscar dados" + error)
          })
          }

          loadCharacteristcs()
    }, [user.id])


    function handleUpdateCharacteristcs(e){
        e.preventDefault()
        newUpdateCharacteristcs({
                id: characteristics.id,
                idAccount: user.id,
                birthDate: birthDate === "" ? characteristics.birthDate : birthDate,
                sex: sex === "" ? characteristics.sex : sex,
                sign: sign === "" ? characteristics.sign : sign,
                sexualOption: sexualOption === "" ? characteristics.sexualOption : sexualOption,
                idPatrono: user.patron,
                username: user.sername,
            })

    }
    function handleUpdateCharacteristcs2(e){
        e.preventDefault()
        
        newUpdateCharacteristcs2({
            idAccount: user.id,
            id2: characteristics.id,
            birthDate2: birthDate2 === "" ? characteristics2.birthDate : birthDate2,
            sex2: sex2 === "" ? characteristics2.sex : sex2,
            sign2: sign2 === "" ? characteristics2.sign : sign2,
            sexualOption2: sexualOption2 === "" ? characteristics2.sexualOption : sexualOption2,
            id: characteristics2.id,
                birthDate: birthDate === "" ? characteristics.birthDate : birthDate,
                sex: sex === "" ? characteristics.sex : sex,
                sign: sign === "" ? characteristics.sign : sign,
                sexualOption: sexualOption === "" ? characteristics.sexualOption : sexualOption,
                idPatrono: user.patron,
                username: user.sername,
            })

       
    }
    function handleUpdateCharacteristcs3(e){
        e.preventDefault()
        
        newUpdateCharacteristcs3({
                id3: characteristics3.id,
                idAccount: user.id,
                birthDate3: birthDate3 === "" ? characteristics3.birthDate : birthDate3,
                sex3: sex3 === "" ? characteristics3.sex : sex3,
                sign3: sign3 === "" ? characteristics3.sign : sign3,
                sexualOption3: sexualOption3 === "" ? characteristics3.sexualOption : sexualOption3,
                id2: characteristics2.id,
                birthDate2: birthDate2 === "" ? characteristics2.birthDate : birthDate2,
                sex2: sex2 === "" ? characteristics2.sex : sex2,
                sign2: sign2 === "" ? characteristics2.sign : sign2,
                sexualOption2: sexualOption2 === "" ? characteristics2.sexualOption : sexualOption2,
                id: characteristics.id,
                birthDate: birthDate === "" ? characteristics.birthDate : birthDate,
                sex: sex === "" ? characteristics.sex : sex,
                sign: sign === "" ? characteristics.sign : sign,
                sexualOption: sexualOption === "" ? characteristics.sexualOption : sexualOption,
                idPatrono: user.patron,
                username: user.sername,
            })
    }

//-----------------------------------

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




    return (
            <div className="settingsCharacteristcs">
                        <form action="">
                            <div className="data">
                            <br /><br />
                   {user.type === "Trisal" ?
                    <div className="data-form">   
                    <span>Membro casal 1</span><br />
                    <input type="date" placeholder="Data de Nascimenrto" value={birthDate === "" ? characteristics.birthDate : birthDate}  onChange={(e) => setBirthDate(e.target.value)}/>
                    <select value={sex === "" ?  characteristics.sex : sex} onChange={handleSelectSex}>
                                <option value="">Sexo</option>
                                <option value="Homem">Homem </option>
                                <option value="Mulher">Mulher</option>
                            </select>
                            <select value={sexualOption === "" ? characteristics.sexualOption : sexualOption} onChange={handleSelectSexualOption}>
                                <option value="">Opção Sexual</option>
                                <option value="Hetero Sexual">Hetero Sexual </option>
                                <option value="Bissexual">Bissexual</option>
                                <option value="Bi Curioso">Bi Curioso</option>
                                <option value="Pansexual">Pansexual</option>
                            </select>
                            <select value={sign === "" ? characteristics.sign : sign} onChange={handleSelectSign}>
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
                    <br /><br />
                    <span>Membro casal 2</span><br />
                    <input type="date" placeholder="Data de Nascimenrto" value={birthDate2 === "" ? characteristics2.birthDate : birthDate2}  onChange={(e) => setBirthDate2(e.target.value)}/>
                    <select value={sex2 === "" ? characteristics2.sex : sex2} onChange={handleSelectSex2}>
                                <option value="">Sexo</option>
                                <option value="Homem">Homem </option>
                                <option value="Mulher">Mulher</option>
                            </select>
                            <select value={sexualOption2 === "" ? characteristics2.sexualOption : sexualOption2} onChange={handleSelectSexualOption2}>
                                <option value="">Opção Sexual</option>
                                <option value="Hetero Sexual">Hetero Sexual </option>
                                <option value="Bissexual">Bissexual</option>
                                <option value="Bi Curioso">Bi Curioso</option>
                                <option value="Pansexual">Pansexual</option>
                            </select>
                            <select value={sign2 === "" ? characteristics2.sign : sign2} onChange={handleSelectSign2}>
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
                            <br /><br />
                    <span>Membro casal 3</span><br />
                    <input type="date" placeholder="Data de Nascimenrto" value={birthDate3 === "" ? characteristics3.birthDate : birthDate3}  onChange={(e) => setBirthDate3(e.target.value)}/>
                    <select value={sex3 === "" ? characteristics3.sex : sex3} onChange={handleSelectSex3}>
                                <option value="">Sexo</option>
                                <option value="Homem">Homem </option>
                                <option value="Mulher">Mulher</option>
                            </select>
                            <select value={sexualOption3 === "" ? characteristics3.sexualOption : sexualOption3} onChange={handleSelectSexualOption3}>
                                <option value="">Opção Sexual</option>
                                <option value="Hetero Sexual">Hetero Sexual </option>
                                <option value="Bissexual">Bissexual</option>
                                <option value="Bi Curioso">Bi Curioso</option>
                                <option value="Pansexual">Pansexual</option>
                            </select>
                            <select value={sign3 === "" ? characteristics3.sign : sign3} onChange={handleSelectSign3}>
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
                            <div className='confirmation'>
                        <button onClick={handleUpdateCharacteristcs3}>{loading === true ? <FiRefreshCcw /> : "Atualizar"}</button>
                        
                    </div>
             </div>
             : user.type === "Casal"?
             <div className="data-form">
                  <span>Membro casal 1</span><br />
                  <input type="date" placeholder="Data de Nascimenrto" value={birthDate === "" ? characteristics.birthDate : birthDate}  onChange={(e) => setBirthDate(e.target.value)}/>
                    <select value={sex === "" ?  characteristics.sex : sex} onChange={handleSelectSex}>
                                <option value="">Sexo</option>
                                <option value="Homem">Homem </option>
                                <option value="Mulher">Mulher</option>
                            </select>
                            <select value={sexualOption === "" ? characteristics.sexualOption : sexualOption} onChange={handleSelectSexualOption}>
                                <option value="">Opção Sexual</option>
                                <option value="Hetero Sexual">Hetero Sexual </option>
                                <option value="Bissexual">Bissexual</option>
                                <option value="Bi Curioso">Bi Curioso</option>
                                <option value="Pansexual">Pansexual</option>
                            </select>
                            <select value={sign === "" ? characteristics.sign : sign} onChange={handleSelectSign}>
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

                            <br /><br />
                    <span>Membro casal 2</span><br />
                    <input type="date" placeholder="Data de Nascimenrto" value={birthDate2 === "" ? characteristics2.birthDate : birthDate2}  onChange={(e) => setBirthDate2(e.target.value)}/>
                    <select value={sex2 === "" ? characteristics2.sex : sex2} onChange={handleSelectSex2}>
                                <option value="">Sexo</option>
                                <option value="Homem">Homem </option>
                                <option value="Mulher">Mulher</option>
                            </select>
                            <select value={sexualOption2 === "" ? characteristics2.sexualOption : sexualOption2} onChange={handleSelectSexualOption2}>
                                <option value="">Opção Sexual</option>
                                <option value="Hetero Sexual">Hetero Sexual </option>
                                <option value="Bissexual">Bissexual</option>
                                <option value="Bi Curioso">Bi Curioso</option>
                                <option value="Pansexual">Pansexual</option>
                            </select>
                            <select value={sign2 === "" ? characteristics2.sign : sign2} onChange={handleSelectSign2}>
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

                            <div className='confirmation'>
                        <button onClick={handleUpdateCharacteristcs2}>{loading === true ? <FiRefreshCcw /> : "Atualizar"}</button>
                        
                    </div>
             </div>
             :
             <div className="data-form">
                                      <input type="date" placeholder="Data de Nascimenrto" value={birthDate === "" ? characteristics.birthDate : birthDate}  onChange={(e) => setBirthDate(e.target.value)}/>
                    <select value={sex === "" ?  characteristics.sex : sex} onChange={handleSelectSex}>
                                <option value="">Sexo</option>
                                <option value="Homem">Homem </option>
                                <option value="Mulher">Mulher</option>
                            </select>
                            <select value={sexualOption === "" ? characteristics.sexualOption : sexualOption} onChange={handleSelectSexualOption}>
                                <option value="">Opção Sexual</option>
                                <option value="Hetero Sexual">Hetero Sexual </option>
                                <option value="Bissexual">Bissexual</option>
                                <option value="Bi Curioso">Bi Curioso</option>
                                <option value="Pansexual">Pansexual</option>
                            </select>
                             <select value={sign === "" ? characteristics.sign : sign} onChange={handleSelectSign}>
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
                   <div className='confirmation'>
                        <button onClick={handleUpdateCharacteristcs}>{loading === true ? <FiRefreshCcw /> : "Atualizar"}</button>
                        
                    </div>               
             </div>
                }
                </div>

                        </form>
            </div>
    )
}

export {SettingsCharacteristcs}