import { useContext, useEffect, useState } from 'react';
import logoImg from '../../assets/images/logo.png'
import Brasil from '../../assets/images/flags/Brasil.png'
import Portugal from '../../assets/images/flags/Portugal.png'
import { AuthContext } from '../../contexts/Auth';
import {IoCalendarOutline} from 'react-icons/io5';
import { FiEye, FiEyeOff, FiUpload } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import image1 from '../../assets/images/slider/7.jpg';
import { v4 as uuidv4} from 'uuid'
import { mask as masker, unMask } from "remask";
import { toast } from 'react-toastify';
import './signUp.css';
import { storage } from '../../services/firebaseConnection';
import { ref, getDownloadURL, uploadBytes} from 'firebase/storage';
import buscaCepPortugal from '../../services/api-buscaCepPortugal';
import buscaDistrito from '../../services/api-buscaDistrito';

function SignUp() {

  const  {createAccount} = useContext(AuthContext)
  const [usernameNative, setUsernameNative] = useState("");
  const [nickname, setNickname] = useState("");
  const [relationship, setRelationship] = useState("");
  const [newPhone, setPhone] = useState("");
  const [newPhonePortugal, setPhonePortugal] = useState("");
  const [passwordNative, setPasswordNative] = useState("");
  const [email, setEmail] = useState("");
  const [sex, setSex] = useState("");
  const [sexualOption, setSexualOption] = useState("");
  const [passwordConfirmNative, setPasswordConfirmNative] = useState("");
  const [passwordView, setPasswordView] = useState(true)
  const [checked, setChecked] = useState(false);
  const [checkedSex, setCheckedSex] = useState(false);
  const [checkedOptionSexual, setCheckedOptionSexual] = useState(false);
  const navigate = useNavigate();
  const [país, setPaís] = useState("select");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude2, setLatitude2] = useState("");
  const [longitude2, setLongitude2] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");
  const [cep, setCep] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [sign, setSign] = useState("");
  const [birthDateUser, setBirthDateUser] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [recommendation, setRecommendation] = useState("Indicação");
  const [preferenceOption, setPreferenceOption] = useState("");
  const [preference, setPreference] = useState("");
  const [etapa, setEtapa] = useState("1");
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [imageAvatar, setImageAvatar] = useState('');
  const [idade, setIdade] = useState(0);
  const [location, setLocation] = useState(false);
  const [textError, setTextError] = useState(false);
  const [flag, setFlag] = useState(false);
  const [maxAge, setMaxAge] = useState("");
  const [minAge, setMinAge] = useState("");
  const [districtAll, setDistrictAll] = useState([]);
  
  const nascimento = new Date(birthDateUser);
  const hoje = new Date();
  let idadeAtual = 0;
  
  if(birthDateUser !== "") {
      idadeAtual = Math.floor(Math.ceil(Math.abs(nascimento.getTime() - hoje.getTime()) / (1000 * 3600 * 24)) / 365.25) ;
      console.log(idadeAtual);
  }

  const profile = "https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240"
 
  useEffect(() => {
      if(localStorage.getItem("foursome") !== null) {
        navigate("/feed")
      }
    },[navigate])

    useEffect(() => {
      function getLocation() {
          return window.navigator.geolocation.getCurrentPosition(success, error);
           }

      function success(position) {
          const lat  = position.coords.latitude;
          const long = position.coords.longitude;
      
          setLatitude(lat);
          setLongitude(long);
        }
            
    function error() {
      console.log('Unable to retrieve your location');
    }

        getLocation()
  },)

    function handleFile(e) {
      console.log(e.target.files[0])

     if(e.target.files[0]){
         const image = e.target.files[0];

         if(image.type === 'image/jpeg' || image.type === 'image/jpg' || image.type === 'image/png') {
             setImageAvatar(image);
             setAvatarUrl(URL.createObjectURL(e.target.files[0]));
             console.log(avatarUrl);
          } else {
              console.log('Tipo dearquivo não aceito. Envie uma imagem dos tipos: .jpg, .jpeg, .png');
              setImageAvatar(null);
              return null;
          }
      }
  }


  async function handleUploadAccount(e) {
    e.preventDefault();

            
    if(!email.includes('@') ) {
        toast.error("Preencha, seu email corretamente");
        return
    }
    if(avatarUrl === null ) {
        toast.error("Favor adicionar foto de perfil");
        return
    }

    if(day === "" || month === ""  || year === "" ) {
      toast.error("Favor definir data de nascimento");
      return
  }

    if(city === "" ) {
        toast.error("Defina sua cidade");
        return
    }

    if(email === "" || usernameNative === "" || sex === ""  ) {
        toast.error("Favor verificar todos os campos antes de avançar, todos os campos");
        return
    }
    
    if(nickname === "" || relationship === "" || recommendation === "" ) {
        toast.error("Favor preencher, todos os campos");
        return
    }

      
    if(avatarUrl !== null && nickname !== "" && relationship !== "") {
   toast.info("Salvando as informações. Aguarde...")
            //Avatar
    const uuid = uuidv4();

    let newAvatarUrlFirebase = ref(storage, `images/avatar/${uuid}`);
    let uploadAvatar = await uploadBytes(newAvatarUrlFirebase, imageAvatar);
    let photoUrlAvatar = await getDownloadURL(uploadAvatar.ref);
        
    console.log(uploadAvatar.ref.name, photoUrlAvatar);

    
    handleCreateAccount(photoUrlAvatar)
  }


}



    function handleCreateAccount(avatar1) {
      const remove1Paranteses = newPhone === "" ? newPhonePortugal.replace('(', '') : newPhone.replace('(', '')
      const remove2Paranteses = remove1Paranteses.replace(')', '')
      const removeSpace = remove2Paranteses.replace(' ', '')
      const removeTrace = removeSpace.replace('-', '')
      const phone = removeTrace;
      const viewSexualOption = checkedOptionSexual
      const viweSex = checkedSex

  
      if(checked) {
        if(passwordConfirmNative === passwordNative) {
          toast.info("Cadastrando. Aguarde...")
            const username = usernameNative.replace(/( )+/g, "")
            const password = passwordNative.replace(/( )+/g, "");
  
            const idGenerate = uuidv4();
            const id = idGenerate.substring(0, 8);
            const avatar = avatar1;
            const cover = "https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/capa.png?alt=media&token=f49f4132-c3ba-4914-add5-150a4ffdbe29"
            const cep = ""
            const patron = "0000"
            const status = "pending"
            const role = "Membro"
            const online = false;
            const mylatitude = latitude2 === "" ? latitude : latitude2
            const mylongitude = longitude2 === "" ? longitude : longitude2
            const birthDate = `${year}-${month}-${day}`
            const age = idadeAtual
          
            console.log({ id, país, username:username.toLowerCase(), role, status, viweSex, sex, sexualOption, viewSexualOption, preference, preferenceOption,
              birthDate, age, minAge, maxAge, sign, email, phone, password, online, patron, nickname, avatar, cover, relationship, city, uf, cep,
              latitude: mylatitude, longitude: mylongitude, recommendation})
          
              createAccount({ id, país, username:username.toLowerCase(), role, status, viweSex, sex, sexualOption, viewSexualOption, preference, preferenceOption,
              birthDate, age, minAge, maxAge, sign, email, phone, password, online, patron, nickname, avatar, cover, relationship, city, uf, cep,
              latitude: mylatitude, longitude: mylongitude, recommendation})

      } else {
            toast.error("As senhas não combinam!")
          }
      } else {
        toast.error("Favor, confirmar a leitura do termo de uso")
      }
    }


  if(codigoPostal.length === 7) {
      handleSearchCepPortugal()
  } else {
      
  }

  async function handleSearchCepPortugal() {
          try {
              const res = await buscaCepPortugal.get(`${codigoPostal}`);
              console.log(res.data[0])
              console.log(res.data[0].Distrito)
              setCity(res.data[0].Distrito)
              setUf("")
              setLatitude2(parseFloat(res.data[0].Latitude));
              setLongitude2(parseFloat(res.data[0].Longitude));
              setFlag(true)
              return
          }catch{
              console.log("error")
              toast.error("Código Postal não encontrado. Por favor, digite sua Cidade e sua Província")
              setLocation(true)
              setTextError(true)
          }
          return
      }
  
  function handleSelectSign(e) {
    setSign(e.target.value)
}
  function handleSelectDay(e) {
    setDay(e.target.value);
    setBirthDateUser(`${year}-${month}-${day}`)
}
  function handleSelectMonth(e) {
    setMonth(e.target.value)
    setBirthDateUser(`${year}-${month}-${day}`)
}
  function handleSelectYear(e) {
    setYear(e.target.value)
    setBirthDateUser(`${year}-${month}-${day}`)
}

function handleRelationship(e) {
  setRelationship(e.target.value)
}

function handleSex(e) {
  setSex(e.target.value)
}
function handleSexualOption(e) {
  setSexualOption(e.target.value)
}
function handlePreference(e) {
  setPreference(e.target.value)
}
function handlePreferenceSexualOption(e) {
  setPreferenceOption(e.target.value)
}

  function handlePasswordView() {
    if(passwordView === false) {
      setPasswordView(true)
    } else {
      setPasswordView(false)
    }
  }

  function ChangeMask(e) {
    const originalValue = unMask(e.target.value);
    const maskedValue = masker(originalValue, [
      "S",
      "SS",
      "SSS",
      "SSSS",
      "SSSSS",
      "SSSSSS",
      "SSSSSSS",
      "SSSSSSSS",
      "SSSSSSSSS",
      "SSSSSSSSSS",
      "SSSSSSSSSSS",
      "SSSSSSSSSSSS",
      "SSSSSSSSSSSSS",
      "SSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    ]);

    setUsernameNative(maskedValue)
  }
  function ChangeMaskPhone(e) {
    const originalValue = unMask(e.target.value);
    const maskedValue = masker(originalValue, [
      "(99)99999-9999",
      "(99)99999-999",
      "999 99999-9999"
    ]);

    setPhone(maskedValue)
  }
  function ChangeMaskPassword(e) {
    const originalValue = unMask(e.target.value);
    const maskedValue = masker(originalValue, [
      "S",
      "SS",
      "SSS",
      "SSSS",
      "SSSSS",
      "SSSSSS",
      "SSSSSSS",
      "SSSSSSSS",
      "SSSSSSSSS",
      "SSSSSSSSSS",
      "SSSSSSSSSSS",
      "SSSSSSSSSSSS",
      "SSSSSSSSSSSSS",
      "SSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    ]);

    setPasswordNative(maskedValue)
  }
  function ChangeMaskConfirmPassword(e) {
    const originalValue = unMask(e.target.value);
    const maskedValue = masker(originalValue, [
      "S",
      "SS",
      "SSS",
      "SSSS",
      "SSSSS",
      "SSSSSS",
      "SSSSSSS",
      "SSSSSSSS",
      "SSSSSSSSS",
      "SSSSSSSSSS",
      "SSSSSSSSSSS",
      "SSSSSSSSSSSS",
      "SSSSSSSSSSSSS",
      "SSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    ]);

    setPasswordConfirmNative(maskedValue)
  }


function ChangeMaskCEPPortugal(e) {
    const originalValue = unMask(e.target.value);
    const maskedValue = masker(originalValue, [
      "9999999",
    ]);

    setCodigoPostal(maskedValue)
  }

  function handlePaís(data) {
    setPaís(data)
    setFlag(false)
    if(data === "Brasil") {
      setCodigoPostal("")
    } else if (data === "Portugal") {
      setCep("")
    }
}

  function handleSelectEtapa(etapa) {
    setEtapa(etapa)
  }

  function handleChange(e) {
    if(checked === false) {
      setChecked(true)
    } else {
      setChecked(false)
    }
  }
  function handleChangeSex(e) {
    if(checkedSex === false) {
      setCheckedSex(true)
    } else {
      setCheckedSex(false)
    }
  }
  function handleChangeOptionSexual(e) {
    if(checkedOptionSexual === false) {
      setCheckedOptionSexual(true)
    } else {
      setCheckedOptionSexual(false)
    }
  }


  
  async function handleSearchDistrict() {
    try {
      const res = await buscaDistrito.get(`${uf}/distritos`) 
        console.log(res.data)
        setDistrictAll(res.data)
        console.log(res.data[0].municipio.nome);
        return;
      }catch{
        console.log("error")
        toast.error("Escolha um estado e clica em buscar cidades")
    }
    return
}


function handleSetectCity(e) {
  setCity(e.target.value)
  console.log(e.target.value)
}
function handleSetectUf(e) {
  setUf(e.target.value)
  console.log(e.target.value)
}

function handleSelectRecomendation(e) {
  setRecommendation(e.target.value)
}

 
function handleSelectMaxAge(e) {
  setMaxAge(e.target.value)
}
function handleSelectMinAge(e) {
  setMinAge(e.target.value)
}

const letra = email.substring(0, 1)

  return (
    <div className="content-SignUp">
      <div className="bloco">

      <div className="logo">
        <img src={logoImg} alt="Logo Foursome" />
        </div>

      <div className="signUp">
        {/* Passo  1 */}
        {etapa === "1" ?
        <div className="form">
          <input type="text" placeholder="Nome de usuário (Junto e sem espaço)" value={usernameNative.toLowerCase()} onChange={ChangeMask}/>
          <input type="text" placeholder="E-mail" value={email.replace(/\s+/g, '')} onChange={(e) => setEmail(e.target.value)} required/>

          {email.includes('@') ? "" :
                            <div className="alert">
                                <h5>Seu Email deve conter o @</h5>
                            </div>
          }
          {letra === "" ? "": 
          letra === letra.toUpperCase()  ? 
           <div className="alert2">
           <h5>A primeira letra do seu e-mail está maiúscula. Isso está certo? <br /> Caso esteja correto prossiga tranquilamente. Este é apenas um alerta</h5>
       </div>:
        email === email.toUpperCase()  ? 
        <div className="alert2">
        <h5>Seu e-mail contém letra maiúscula. Isso está certo?</h5>
    </div> :
                           ""
          }


          <input type="text" value={newPhone} onChange={ChangeMaskPhone} placeholder="(XX)XXXXX-XXXX ou XXX XXXXX-XXXX" />
          <h6>Digite telefone modelo Brasil ou Portugal</h6>
          <div className="inputPassword">
          <input type={passwordView === false ? "password" : "text" } placeholder="Senha" value={passwordNative} onChange={ChangeMaskPassword}/>
          <button className='password' onClick={handlePasswordView}>{passwordView === false ? <FiEye /> : <FiEyeOff /> } </button>
          </div>
          <div className="inputPassword">
          <input type={passwordView === false ? "password" : "text" } placeholder="Confirmar senha" value={passwordConfirmNative} onChange={ChangeMaskConfirmPassword}/>
          <button className='password' onClick={handlePasswordView}>{passwordView === false ? <FiEye /> : <FiEyeOff /> } </button>
          </div>
          {passwordConfirmNative === passwordNative ? "" :
              <div className="alert">
                <h5>As senhas não combinam!</h5>
              </div>
          }
          <div className="buttons">
          <button onClick={() => handleSelectEtapa("2") }> Criar conta </button>
          <br />
          <div className="terms">
          <input type="checkbox" checked={checked} onChange={handleChange}/>
          <p>Li e concordo com os<b><a href="/lgpd" target="_blank">Termos de Utilização</a></b></p>
          </div>
          </div>
          <div className="create">
          <p><a href="/"> Faça seu login</a></p>
          </div>
        </div>
        : ""}

        {/* Passo  2 */}
        {etapa === "2" ?
        <div className="form">
          <div className="text">
            <h5>EU SOU</h5>
          </div>
            <select className={sex === "" ? "empyt" : ""} value={sex} onChange={handleSex} required>
                <option value="">Selecione</option>
                <option value="Homem">Homem</option>
                <option value="Mulher">Mulher</option>
                <option value="Homem trans">Homem trans</option>
                <option value="Mulher trans">Mulher trans</option>
                <option value="Pessoa não binária">Pessoa não binária</option>
            </select>
            <div className="terms">
          <input type="checkbox" checked={checkedSex} onChange={handleChangeSex}/>
          <p>Mostrar no meu perfil</p>
          </div>

            <div className="text">
            <h5>MINHA ORIENTAÇÃO SEXUAL</h5>
          </div>

             <select className={sexualOption === "" ? "empyt" : ""} value={sexualOption} onChange={handleSexualOption} required>
                <option value="">Selecione</option>
                <option value="Gay">Gay</option>
                <option value="Lésbica">Lésbica</option>
                <option value="Trans/travesti">Trans/travesti</option>
                <option value="Bissexual">Bissexual</option>
                <option value="Assexual">Assexual</option>
                <option value="Demissexual">Demissexual</option>
                <option value="Pansexual">Pansexual</option>
                <option value="Queer">Queer</option>
                <option value="Intersexual">Intersexual</option>
                <option value="Questionando">Questionando</option>
            </select>

          <div className="terms">
          <input type="checkbox" checked={checkedOptionSexual} onChange={handleChangeOptionSexual}/>
          <p>Mostrar no meu perfil</p>
          </div>

            <div className="text">
            <h5>PROCURO POR</h5>
          </div>

            <select className={preference === "" ? "empyt" : ""} value={preference} onChange={handlePreference} required>
                <option value="">Selecione</option>
                <option value="All">Todos</option>
                <option value="Homem">Homem</option>
                <option value="Mulher">Mulher</option>
                <option value="Homem e Mulher">Home  e Mulher</option>
                <option value="Homem trans">Homem trans</option>
                <option value="Mulher trans">Mulher trans</option>
                <option value="Homem trans e Mulher trans">Homem trans e Mulher trans</option>
                <option value="Pessoa não binária">Pessoa não binária</option>
            </select>
            <div className="text">
            <h5>QUE SEJA</h5>
          </div>

          <select className={preferenceOption === "" ? "empyt" : ""} value={preferenceOption} onChange={handlePreferenceSexualOption} required>
                <option value="">Selecione</option>
                <option value="Gay">Gay</option>
                <option value="Lésbica">Lésbica</option>
                <option value="Trans/travesti">Trans/travesti</option>
                <option value="Bissexual">Bissexual</option>
                <option value="Assexual">Assexual</option>
                <option value="Demissexual">Demissexual</option>
                <option value="Pansexual">Pansexual</option>
                <option value="Queer">Queer</option>
                <option value="Intersexual">Intersexual</option>
                <option value="Questionando">Questionando</option>
                <option value="All">Tanto faz</option>
            </select>

            <div className="text">
            <h5>IDADE</h5>
            </div>
            <div className="inputsAge"> 
            <select value={minAge} onChange={handleSelectMinAge} required>
                      <option>Idade Mínima</option>
                      <option value="18">18</option>
                      <option value="19">19</option>
                      <option value="20">20</option>
                      <option value="21">21</option>
                      <option value="22">22</option>
                      <option value="23">23</option>
                      <option value="24">24</option>
                      <option value="25">25</option>
                      <option value="26">26</option>
                      <option value="27">27</option>
                      <option value="28">28</option>
                      <option value="29">29</option>
                      <option value="30">30</option>
                      <option value="31">31</option>
                      <option value="32">32</option>
                      <option value="33">33</option>
                      <option value="34">34</option>
                      <option value="35">35</option>
                      <option value="36">36</option>
                      <option value="37">37</option>
                      <option value="38">38</option>
                      <option value="39">39</option>
                      <option value="40">40</option>
                      <option value="41">41</option>
                      <option value="42">42</option>
                      <option value="43">43</option>
                      <option value="44">44</option>
                      <option value="45">45</option>
                      <option value="46">46</option>
                      <option value="47">47</option>
                      <option value="48">48</option>
                      <option value="49">49</option>
                      <option value="50">50</option>
                      <option value="51">51</option>
                      <option value="52">52</option>
                      <option value="53">53</option>
                      <option value="54">54</option>
                      <option value="55">55</option>
                      <option value="56">56</option>
                      <option value="57">57</option>
                      <option value="58">58</option>
                      <option value="59">59</option>
                      <option value="60">60</option>
                      <option value="61">61</option>
                      <option value="62">62</option>
                      <option value="63">63</option>
                      <option value="64">64</option>
                      <option value="65">65</option>
                      <option value="66">66</option>
                      <option value="67">67</option>
                      <option value="68">68</option>
                      <option value="69">69</option>
                      <option value="70">70</option>
                      <option value="71">71</option>
                      <option value="72">72</option>
                      <option value="73">73</option>
                      <option value="74">74</option>
                      <option value="75">75</option>
                      <option value="76">76</option>
                      <option value="77">77</option>
                      <option value="78">78</option>
                      <option value="79">79</option>
                      <option value="80">80</option>
                    </select>
            <select value={maxAge} onChange={handleSelectMaxAge} required>
                      <option>Idade Máxima</option>
                      <option value="18">18</option>
                      <option value="19">19</option>
                      <option value="20">20</option>
                      <option value="21">21</option>
                      <option value="22">22</option>
                      <option value="23">23</option>
                      <option value="24">24</option>
                      <option value="25">25</option>
                      <option value="26">26</option>
                      <option value="27">27</option>
                      <option value="28">28</option>
                      <option value="29">29</option>
                      <option value="30">30</option>
                      <option value="31">31</option>
                      <option value="32">32</option>
                      <option value="33">33</option>
                      <option value="34">34</option>
                      <option value="35">35</option>
                      <option value="36">36</option>
                      <option value="37">37</option>
                      <option value="38">38</option>
                      <option value="39">39</option>
                      <option value="40">40</option>
                      <option value="41">41</option>
                      <option value="42">42</option>
                      <option value="43">43</option>
                      <option value="44">44</option>
                      <option value="45">45</option>
                      <option value="46">46</option>
                      <option value="47">47</option>
                      <option value="48">48</option>
                      <option value="49">49</option>
                      <option value="50">50</option>
                      <option value="51">51</option>
                      <option value="52">52</option>
                      <option value="53">53</option>
                      <option value="54">54</option>
                      <option value="55">55</option>
                      <option value="56">56</option>
                      <option value="57">57</option>
                      <option value="58">58</option>
                      <option value="59">59</option>
                      <option value="60">60</option>
                      <option value="61">61</option>
                      <option value="62">62</option>
                      <option value="63">63</option>
                      <option value="64">64</option>
                      <option value="65">65</option>
                      <option value="66">66</option>
                      <option value="67">67</option>
                      <option value="68">68</option>
                      <option value="69">69</option>
                      <option value="70">70</option>
                      <option value="71">71</option>
                      <option value="72">72</option>
                      <option value="73">73</option>
                      <option value="74">74</option>
                      <option value="75">75</option>
                      <option value="76">76</option>
                      <option value="77">77</option>
                      <option value="78">78</option>
                      <option value="79">79</option>
                      <option value="80">80</option>
                    </select>
          </div>


          <div className="buttons">
          <button onClick={() => handleSelectEtapa("3")}> Avançar </button>
          <button className='btn' onClick={() => handleSelectEtapa("1")}> Voltar </button>
          <br />
          </div>
        </div>
        : ""}



                {/* Passo  3 */}


                {etapa === "3" ?
        <div className="form">
 
          <p>Avatar</p>
                        <label className="label-avatar">
                            <span><FiUpload color="#f65" size={25} /></span>
                            <input type="file" accept="image/*" onChange={handleFile} required/><br />
                            <img src={avatarUrl === null ? profile : avatarUrl} alt="Avatar" height={100} width={100}/>
                        </label>
                        <div className="infoavatar">
                            <h4>Importante!</h4>
                            <h5> <b>Sua foto de perfil deve seguir os seguintes padrões:</b> </h5>
                            <h5>- Foto de parte do corpo ou do rosto ( Não é obrigatório foto de rosto)</h5>
                            <br />
                            <h5> <b>Não adicionar fotos de:</b> </h5>
                            <h5>- Prints de fotos</h5>
                            <h5>- Animais</h5>
                            <h5>- Paísagem</h5>
                            <h5>- Desenho</h5>
                            <h5>- Emojis</h5>
                            <h5>- Objetos</h5>
                            <h5>- Artistas</h5>

                            <div className="alert">
                                <h5>Contas com fotos fora do pardão não serão aceitas!</h5>
                            </div>
                        </div>






          <div className="buttons">
          <button onClick={() => handleSelectEtapa("3.1")}> Avançar </button>
          <button className='btn' onClick={() => handleSelectEtapa("2")}> Voltar </button>
          <br />
          </div>
        </div>
        : ""}

{etapa === "3.1" ?
        <div className="form">
 
                        <div className="text">
                          <h5>NOME DE EXIBIÇÃO </h5>
                          </div>
                          <input type="text" placeholder="Nome de exibição" value={nickname} onChange={(e) => setNickname(e.target.value)} required/>
                          <div className="text">
                          <h5>STATUS DE RELACIONAMENTO</h5>
                          </div>
                          <select className={relationship === "" ? "empyt" : ""} value={relationship} onChange={handleRelationship} required>
                                <option value="">Status de Relacionamento</option>
                                <option value="Solteir@">Solteir@ </option>
                                <option value="Casad@">Casad@</option>
                                <option value="Enrolad@">Enrolad@</option>
                                <option value="Relacionamento Aberto">Relacionamento Aberto</option>
                            </select>
                            <div className="text">
                            <h5>DATA DE NASCIMENTO <IoCalendarOutline /></h5>
                        </div>
                    <div className="birthDate">

                    <select value={year} onChange={handleSelectYear} required>
                          <option>Ano</option>
                          <option>1960</option>
                          <option>1961</option>
                          <option>1962</option>
                          <option>1963</option>
                          <option>1964</option>
                          <option>1965</option>
                          <option>1966</option>
                          <option>1967</option>
                          <option>1968</option>
                          <option>1969</option>
                          <option>1970</option>
                          <option>1971</option>
                          <option>1972</option>
                          <option>1973</option>
                          <option>1974</option>
                          <option>1975</option>
                          <option>1976</option>
                          <option>1977</option>
                          <option>1978</option>
                          <option>1979</option>
                          <option>1980</option>
                          <option>1981</option>
                          <option>1982</option>
                          <option>1983</option>
                          <option>1984</option>
                          <option>1985</option>
                          <option>1986</option>
                          <option>1987</option>
                          <option>1988</option>
                          <option>1989</option>
                          <option>1990</option>
                          <option>1991</option>
                          <option>1992</option>
                          <option>1993</option>
                          <option>1994</option>
                          <option>1995</option>
                          <option>1996</option>
                          <option>1997</option>
                          <option>1998</option>
                          <option>1999</option>
                          <option>2000</option>
                          <option>2001</option>
                          <option>2002</option>
                          <option>2003</option>
                          <option>2004</option>
                      </select>

                    <select value={month} onChange={handleSelectMonth} required>
                      <option>Mês</option>
                      <option value="01">Janeiro</option>
                      <option value="02">Fevereiro</option>
                      <option value="03">Março</option>
                      <option value="04">Abril</option>
                      <option value="05">Maio</option>
                      <option value="06">Junho</option>
                      <option value="07">Julho</option>
                      <option value="08">Agosto</option>
                      <option value="09">Setembro</option>
                      <option value="10">Outubro</option>
                      <option value="11">Novembro</option>
                      <option value="12">Dezembro</option>
                    </select>

                    <select value={day} onChange={handleSelectDay} required>
                      <option>Dia</option>
                      <option value="01">01</option>
                      <option value="02">02</option>
                      <option value="03">03</option>
                      <option value="04">04</option>
                      <option value="05">05</option>
                      <option value="06">06</option>
                      <option value="07">07</option>
                      <option value="08">08</option>
                      <option value="09">09</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                      <option value="13">13</option>
                      <option value="14">14</option>
                      <option value="15">15</option>
                      <option value="16">16</option>
                      <option value="17">17</option>
                      <option value="18">18</option>
                      <option value="19">19</option>
                      <option value="20">20</option>
                      <option value="21">21</option>
                      <option value="22">22</option>
                      <option value="23">23</option>
                      <option value="24">24</option>
                      <option value="25">25</option>
                      <option value="26">26</option>
                      <option value="27">27</option>
                      <option value="28">28</option>
                      <option value="29">29</option>
                      <option value="30">30</option>
                      <option value="31">31</option>
                    </select>



                      
                    </div>
                    {birthDateUser !== "" ?
                         idadeAtual >= 18 ? 
                     <h6>Sua idade é {idadeAtual} anos</h6>:
                     <h6>Sua idade é {idadeAtual} anos</h6>
                      : ""}
                    <div className="text">
                    <h5>SIGNO</h5>    
                        </div>
                            <select className={sign === "" ? "empyt" : ""} required value={sign} onChange={handleSelectSign}>
                                <option value="">Selecione</option>
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


          <div className="buttons">
          <button onClick={() => handleSelectEtapa("4")}> Avançar </button>
          <button className='btn' onClick={() => handleSelectEtapa("3")}> Voltar </button>
          <br />
          </div>
        </div>
        : ""}

          {/* Passo  3 */}
          {etapa === "4" ?
            <div className="form">
              <div className="text">
                <h5>ESCOLHA SEU PAÍS</h5>    
              </div>
              <div className="images">
                <div className="image">
                  <img className={país === "Brasil" ? "select" : ""} onClick={() => handlePaís("Brasil")} src={Brasil} alt="bandeira do Brasil" />
                </div>
                <div className="image">
                <img className={país === "Portugal" ? "select" : ""} onClick={() => handlePaís("Portugal")} src={Portugal} alt="bandeira de Portugal" />
                </div>
              </div>
              <br />

              <br />
              {país === "Brasil" ?
              <>
              <div className="text">
                <h5>BUSQUE SUA LOCALIZAÇÃO</h5>
              </div>

              <select value={uf} onChange={handleSetectUf}> 
                                      <option value="">Escolha seu estado</option>
                                      <option value="AC">Acre</option>
                                      <option value="AL">Alagoas</option>
                                      <option value="AP">Amapá</option>
                                      <option value="AM">Amazonas</option>
                                      <option value="BA">Bahia</option>
                                      <option value="CE">Ceará</option>
                                      <option value="DF">Distrito Federal</option>
                                      <option value="ES">Espírito Santo</option>
                                      <option value="GO">Goiás</option>
                                      <option value="MA">Maranhão</option>
                                      <option value="MT">Mato Grosso</option>
                                      <option value="MS">Mato Grosso do Sul</option>
                                      <option value="MG">Minas Gerais</option>
                                      <option value="PA">Pará</option>
                                      <option value="PB">Paraíba</option>
                                      <option value="PR">Paraná</option>
                                      <option value="PE">Pernambuco</option>
                                      <option value="PI">Piauí</option>
                                      <option value="RJ">Rio de Janeiro</option>
                                      <option value="RN">Rio Grande do Norte</option>
                                      <option value="RS">Rio Grande do Sul</option>
                                      <option value="RO">Rondônia</option>
                                      <option value="RR">Roraima</option>
                                      <option value="SC">Santa Catarina</option>
                                      <option value="SP">São Paulo</option>
                                      <option value="SE">Sergipe</option>
                                      <option value="TO">Tocantins</option>
                                      <option value="EX">Estrangeiro</option>
                                
                              </select>
                              {/* <input type="text" autocomplete="off" placeholder='UF - Ex.: RJ' value={uf} onChange={(e) => setUf(e.target.value)} required /> */}
                              <button className="uf" onClick={() => handleSearchDistrict()}>Buscar Cidades</button>
                              <select value={city} onChange={handleSetectCity}>       
                              {districtAll?.map((district) => {
                                      return (
                                          <option autocomplete="off" key={district.id} value={district.nome}>{district.nome}</option>
                                      )
                                  })}
                              </select>
              </>
                : país === "Portugal" ?
                <>
                <div className="text">
                <h5></h5>
                </div>
                <input type="text" placeholder='Digite seu Código Postal' value={codigoPostal} onChange={ChangeMaskCEPPortugal}/>
                      <input type="text" autoComplete='off' placeholder='Cidade' value={city} onChange={(e) => setCity(e.target.value)} required/>
                      <input type="text" autoComplete='off' placeholder='Província / Vila / Região' value={uf} onChange={(e) => setUf(e.target.value)}  required/>
                        </>

                : "Selecione seu país"
                                }

              <div className="text">
                <h5>COMO NOS CONHECEU?</h5>
              </div>
              <select value={recommendation} onChange={handleSelectRecomendation}> 
                                      <option value="">Escolha</option>
                                      <option value="Instagram">Instagram</option>
                                      <option value="Facebook">Facebook</option>
                                      <option value="Google">Google</option>
                                      <option value="Indicação de amigo">Indicação de amigo</option>
                              </select>

                 <div className="buttons">
          <button onClick={handleUploadAccount}> Finalizar </button>
          <button className='btn' onClick={() => handleSelectEtapa("3.1")}> Voltar </button>
          <br />
          </div>
               </div>
            : ""}



      </div>
      </div>
      <div className="slide-SignUp">
      <div className="images-SignUp" key={image1}>
            <img src={image1} alt="" />
        </div>
      </div>
    </div>
  )
}

export { SignUp }