import { useContext, useEffect, useState } from 'react';
import logoImg from '../../assets/images/logo.png'
import Brasil from '../../assets/images/flags/Brasil.png'
import Portugal from '../../assets/images/flags/Portugal.png'
import { AuthContext } from '../../contexts/Auth';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
// import './entrar.css';
import { toast } from 'react-toastify';
import { FiEye, FiEyeOff, FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
import {IoCloseOutline } from 'react-icons/io5';
import { v4 as uuidv4} from 'uuid'
import { mask as masker, unMask } from "remask";
import Modal from 'react-modal';

import { FiUpload } from 'react-icons/fi';
import { storage } from '../../services/firebaseConnection';
import { ref, getDownloadURL, uploadBytes} from 'firebase/storage';
import buscaCepPortugal from '../../services/api-buscaCepPortugal';
import buscaDistrito from '../../services/api-buscaDistrito';

 
function Entrar() {
  const  {createAccount} = useContext(AuthContext)
  const [usernameNative, setUsernameNative] = useState("");
  const [newPhone, setPhone] = useState("");
  const [newPhonePortugal, setPhonePortugal] = useState("");
  const [passwordNative, setPasswordNative] = useState("");
  const [passwordConfirmNative, setPasswordConfirmNative] = useState("");
  const [passwordView, setPasswordView] = useState(true)
  const [checked, setChecked] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [país, setPaís] = useState("")
  const [select, setSelect] = useState("flag")
  const [email, setEmail] = useState("")
  const [type, setType] = useState("")
  const [recommendation, setRecommendation] = useState("")


  const navigate = useNavigate();
 
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [imageAvatar, setImageAvatar] = useState('');
  const [city, setCity] = useState("");
  const [districtAll, setDistrictAll] = useState([]);
  const [uf, setUf] = useState("");
  const [city2, setCity2] = useState("");
  const [uf2, setUf2] = useState("");
  const [cep, setCep] = useState("");
  const [relationship, setRelationship] = useState("");
  const [nickname, setNickname] = useState("")
  const [loadding, setLoadding] = useState(false);
  const [location, setLocation] = useState("Manual");
  const [textError, setTextError] = useState(false);

  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");

  const [latitude2, setLatitude2] = useState("");
  const [longitude2, setLongitude2] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [view, setView] = useState(false);


  const profile = "https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240"


  useEffect(() => {
      function getLocation() {
          return window.navigator.geolocation.getCurrentPosition(success, error);
           }

      function success(position) {
          const lat1  = position.coords.latitude;
          const long1 = position.coords.longitude;
      
          setLat(lat1);
          setLong(long1);
          console.log("lat1");
          console.log(lat1);
          console.log("long1");
          console.log(long1);

        }

            
    function error() {
      console.log('Unable to retrieve your location');
    }

        getLocation()
  },)




  function handleFile(e) {
     // console.log(e.target.files[0])

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

      if(city === "" && city2 === "" ) {
          toast.error("Defina sua cidade");
          return
      }

      if(email === "" || usernameNative === "" || type === ""  ) {
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
      setLoadding(true);
      console.log(loadding);
      const uuid = uuidv4();

      let newAvatarUrlFirebase = ref(storage, `images/avatar/${uuid}`);
      let uploadAvatar = await uploadBytes(newAvatarUrlFirebase, imageAvatar);
      let photoUrlAvatar = await getDownloadURL(uploadAvatar.ref);
          
      console.log(uploadAvatar.ref.name, photoUrlAvatar);

      
      handleCreateAccount(photoUrlAvatar)
    }


  }

  
  if(codigoPostal.length === 7) {
      handleSearchCepPortugal()
  } else {
      
  } 
  // if(uf !== "") {
  //   handleSearchDistrict()

  // } else {
      
  // } 

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


if(districtAll) {
districtAll.sort(function(a,b) {
    if(a.nome < b.nome ) {
        return -1
    } else {
        return true
    }
})
}


      async function handleSearchCepPortugal() {
          try {
              const res = await buscaCepPortugal.get(`${codigoPostal}`);
              console.log(res.data[0])
              setCity(res.data[0].Distrito)
              setUf("")
              setLatitude2(parseFloat(res.data[0].Latitude));
              setLongitude2(parseFloat(res.data[0].Longitude));
              setCodigoPostal("")
              return
          }catch{
              console.log("error")
              toast.error("Código Postal não encontrado. Por favor, digite sua Cidade e sua Província")
              setLocation(true)
              setTextError(true)
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

  function handleRelationship(e) {
      setRelationship(e.target.value)
  }


  function handleHabiliteLocation(e) {
      e.preventDefault();
      if(location === "Automatic") {
          setLocation("Manual")
          console.log("Manual")
      } else {
          setLocation("Automatic")
          console.log("Automatic")
      }
  }



  function ChangeMask(e) {
      const originalValue = unMask(e.target.value);
      const maskedValue = masker(originalValue, [
        "SS",
      ]);
  
      setUf(maskedValue)
    }
  function ChangeMask(e) {
      const originalValue = unMask(e.target.value);
      const maskedValue = masker(originalValue, [
        "SS",
      ]);
  
      setUf2(maskedValue)
    }
  function ChangeMaskCEP(e) {
      const originalValue = unMask(e.target.value);
      const maskedValue = masker(originalValue, [
        "99999-999",
      ]);
  
      setCep(maskedValue)
    }

    function ChangeMaskCEPPortugal(e) {
      const originalValue = unMask(e.target.value);
      const maskedValue = masker(originalValue, [
        "9999999",
      ]);
  
      setCodigoPostal(maskedValue)
    }

    function handleSelectView(e){
      e.preventDefault();
          if(view === false) {
              setView(true)
          } else {
              setView(false)
          }
    } 



  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
      if(localStorage.getItem("forpride") !== null) {
        navigate("/feed")
      }
  },[navigate])

  const letra = email.substring(0, 1)

  function handleCreateAccount(photoUrlAvatar) {
    const status = "pending"; // Test = 7 Dias -- Active = Palno Ativo/Pago -- Bloqued = Plano Bloqueado/ Não pago-expirado -- Banned 
    const role = "Membro";
    const online = false;


    const remove1Paranteses = newPhone === "" ? newPhonePortugal.replace('(', '') : newPhone.replace('(', '')
    const remove2Paranteses = remove1Paranteses.replace(')', '')
    const removeSpace = remove2Paranteses.replace(' ', '')
    const removeTrace = removeSpace.replace('-', '')
    const phone = removeTrace;

   if(newPhone === "" && newPhonePortugal === "") {
    toast.error("Favor preencher o telefone")
   }
   if(type === "") {
    toast.error("Favor selecionar o tipo de conta")
   }
   if(usernameNative === "") {
    toast.error("Favor preencher o nome de usuário")
   }
   if(passwordNative === "") {
    toast.error("Favor preencher a senha")
   }

    if(checked) {
      if(passwordConfirmNative === passwordNative) {
        toast.info("Salvando informações. Aguarde...")
          const username = usernameNative.replace(/( )+/g, "")
          const password = passwordNative.replace(/( )+/g, "");

          const idGenerate = uuidv4();
          const id = idGenerate.substring(0, 6);
          const linkProfile = "https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240"
          const avatar = photoUrlAvatar === "" || photoUrlAvatar === undefined || photoUrlAvatar === null ? linkProfile : photoUrlAvatar
          const cover = "https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/capa%20foursome2.png?alt=media&token=6124db20-1954-47d4-9444-73b3fee41ce0"
          const latitude= latitude2 === "" ? lat : latitude2
          const longitude= longitude2 === "" ? long : longitude2
          const code = ""
          const patron = "503465"

       createAccount({
              id, país, username: username.toLowerCase(), email: email.replace(/\s+/g, ''), phone, type, password, status, role,
              code, online, patron, avatar, cover, nickname, relationship, recommendation,
              cep: cep === "" ? codigoPostal : cep, city: city !== "" ? city : city2, uf: uf.toUpperCase() !== "" ? uf.toUpperCase() : uf2.toUpperCase() , latitude, longitude
              })
          
            console.log({
              id, país, username: username.toLowerCase(), email: email.replace(/\s+/g, ''), phone, type, password, status, role,
              code, online, patron, avatar, cover, nickname, relationship, recommendation,
              cep: cep === "" ? codigoPostal : cep, city: city !== "" ? city : city2, uf: uf.toUpperCase() !== "" ? uf.toUpperCase() : uf2.toUpperCase() , latitude, longitude
              })
          
          } else {
          toast.error("As senhas não combinam!")
        }
    } else {
      toast.error("Favor, confirmar a leitura do termo de uso")
    }
  }

  function handleChange(e) {
    setChecked(true)
  }

  function handlePasswordView() {
    if(passwordView === false) {
      setPasswordView(true)
    } else {
      setPasswordView(false)
    }
  }

  function handleSetectType(e) {
    setType(e.target.value)
}

  function handleSetectRecommendation(e) {
    setRecommendation(e.target.value)
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
    ]);

    setPhone(maskedValue)
  }
  function ChangeMaskPhonePortugal(e) {
    const originalValue = unMask(e.target.value);
    const maskedValue = masker(originalValue, [
      "999 99999-9999",
    ]);

    setPhonePortugal(maskedValue)
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

  function selectFlag(flag) {
    setPaís(flag)
    setSelect("account")
  }
  function handleSelectView(data) {
    setSelect(data);
    closeModal()
    console.log(data)
  }


  Modal.setAppElement('#root');
  return (
    <div className="container">
    <div className="content-Login">
      {select === "flag" ?
      <div className="Entrar">
        <div className="top">
          <img src={logoImg} alt="Logotipo forpride" />
          <h1>Escolha sua Nacionalidade</h1>
        </div>
        <div className="flags">
          <img src={Brasil} alt="Bandeira do Brasil" onClick={() => {selectFlag("Brasil")}}/>
          <img src={Portugal} alt="Bandeira de Portugal" onClick={() => {selectFlag("Portugal")}}/>
        </div>
      </div>
      : select === "account" ?
      <div className="EntrarBrasil">
        <div className="logo">
        <img src={logoImg} alt="Logo forpride" />
        <h2>Seja bem-vindo!</h2>
        <h3>Realize seu cadastro e aproveite tudo que preparamos.</h3>
        </div>
        <div className="form">
        <div className="title">

          
            <h3>CADASTRE-SE: 🇧🇷</h3>
          </div>
          <div className="titleInput">
          <p>Meu email:</p>
          </div>
          <input type="email" placeholder="E-mail" value={email.replace(/\s+/g, '')} onChange={(e) => setEmail(e.target.value)} required/>
          {email.includes('@') ? "" :
                            <div className="alert">
                                <h5>Seu Email deve conter o @</h5>
                            </div>
          }
          {letra === "" ? "": 
          letra === letra.toUpperCase()  ? 
           <div className="alert2">
           <h5>A primeira letra do seu e-mail está maiúscula. Isso está certo?</h5>
       </div>:
        email === email.toUpperCase()  ? 
        <div className="alert2">
        <h5>Seu e-mail contém letra maiúscula. Isso está certo?</h5>
    </div> :
                           ""
          }

          <div className="titleInput">
          <p>Tipo de conta:</p>
          </div>
          <select value={type} onChange={handleSetectType}>
                <option value="">Selecione</option>
                <option value="Homem">Homem </option>
                <option value="Mulher">Mulher </option>
                <option value="Casal">Casal </option>
                <option value="Trisal">Trisal </option>
                <option value="Transex">Transex </option>
                <option value="Travestis">Travestis </option>
            </select>

          <div className="titleInput">
          {
            país === "Brasil" ?
            <p>O nome de usuário deve ser todo junto, minúsculo e sem espaço.</p>
            : país === "Portugal" ?
            <p>O nome de utilizador deve ser todo junto, minúsculo e sem espaço.</p>
            : ""
          }
          </div>
          <input type="text" placeholder="Nome de usuário (Junto e sem espaço)" value={usernameNative.toLowerCase()} onChange={ChangeMask}/>
         
          <div className="titleInput">
          <p>Telefone:</p>
          </div>
          {
            país === "Brasil" ?
            <input type="text" value={newPhone} onChange={ChangeMaskPhone} placeholder="(XX)XXXXX-XXXX"/>
            : país === "Portugal" ?
            <input type="text" value={newPhonePortugal} onChange={ChangeMaskPhonePortugal} placeholder="XXX XXXXX-XXXX"/>
            : ""
          }

          <div className="titleInput">
          <p>Senha:</p>
          </div>
          <div className="inputPassword">
          <input type={passwordView === false ? "password" : "text" } placeholder="Senha" value={passwordNative} onChange={ChangeMaskPassword}/>
          <button className='password' onClick={handlePasswordView}>{passwordView === false ? <FiEye /> : <FiEyeOff /> } </button>
          </div>

          <div className="inputPassword">
          <input type={passwordView === false ? "password" : "text" } placeholder="Confirmar senha" value={passwordConfirmNative} onChange={ChangeMaskConfirmPassword}/>
          <button className='password' onClick={handlePasswordView}>{passwordView === false ? <FiEye /> : <FiEyeOff /> } </button>
          </div>

          {passwordNative !== passwordConfirmNative ?
          <div className="alert2">
           <h5>As senhas devem ser iguais</h5>
        </div>
        : ""
          }
          <div className="terms">
          <input type="checkbox" checked={checked} onChange={handleChange}/>
          <p>Li e concordo com os<b><a href="/lgpd" target="_blank">Termos de uso</a></b></p>
          </div>

          <div className="buttons">
          {/*  */}
          <button onClick={() => handleSelectView("information")}> Avançar </button>
          <button className='btn' onClick={() => {handleSelectView("flag")}}> Alterar país </button>
          </div>
        </div>

        
      </div>
       : select === "information" ?
       <>
             <div className="EntrarBrasil">
             <div className="top">
          <img src={logoImg} alt="Logotipo forpride" />
          <h2>Foto de Perfil</h2>
        </div>
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
                            <h5>- Foto real dos membros da conta</h5>
                            <h5>- A foto deve corresponder a conta criada:</h5>
                            <h5>Ex.: Conta de casal: Foto do casal, Conta mulher: Foto de mulher, Conta Trisal: Foto do trisal e etc</h5>
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
          <button onClick={() => handleSelectView("address")}> Avançar </button>
          <button className='btn' onClick={() => handleSelectView("account")}> Voltar </button>
          </div>

             </div>
             </div>


                          
                         
       </>
       : select === "address" ?
       <>
             <div className="EntrarBrasil">
             <div className="form">
             <div className="top">
          <img src={logoImg} alt="Logotipo forpride" />
          <h2>Cidade e Estado</h2>
        </div>

        {location === "Automatic" ?
                    <div className="location">
                            <br />
                            {/* <h5>Localização automática</h5> */}
                            {/* <button className="btn">{city2}</button>
                            <button className="btn">{uf2.toUpperCase()}</button> */}
                            {/* <input type="text" autocomplete="off" placeholder='Cidade' value={city2} onChange={(e) => setCity2(e.target.value)} required disabled/>
                            <input type="text" autocomplete="off" placeholder='UF (Sigla. Ex.: RJ)' value={uf2.toUpperCase()} onChange={ChangeMask}  required disabled/> */}

                            <br />
                            <br />
                            <br />

                        </div> 
                        :location === "Manual" ?
                        <>

                        {
                          país === "Brasil" ? 
                          <div className="location">
                          <br />
                          <br />
             <br />
                              <h5>Localização Manual</h5>
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
                      </div> 
                      : país === "Portugal" ?
                      <>
                       <div className="SearchCep">
                            <input type="text" placeholder='Digite seu Código Postal' value={codigoPostal} onChange={ChangeMaskCEPPortugal}/>
                            </div>
                            <div className="digiteCep">
                            <h5>Digite seu Código Postal, para buscar sua cidade</h5>
                            </div>

                            <div className="location">
                         <br />
                        <h5>Localização pelo Código Postal</h5>
                        <input type="text" autoComplete='off' placeholder='Cidade' value={city} onChange={(e) => setCity(e.target.value)} required disabled/>
                        <input type="text" autoComplete='off' placeholder='Província / Região' value={uf} onChange={(e) => setUf(e.target.value)}  required/>
                        </div>
                      </>
                      : ""

                        }
                           
                        </> : ""}  

                    <div className="data"> 

                        {/* {
                        <div className="digiteCep">
                        <button onClick={handleHabiliteLocation}>{location === "Automatic" ? "Buscar manualmente": "Voltar a localização automática"}</button>
                        </div>
                        }           */}

                    </div>
                    <br />
                    
                    <div className="buttons">
          <button onClick={() => handleSelectView("nickname")}> Avançar </button>
          <button className='btn' onClick={() => {handleSelectView("information")}}> Voltar </button>
          </div>
          <br />
             <br />
             <br />
          </div>
             </div>
       </>
       : select === "nickname" ?
       <>
                         <div className="EntrarBrasil">
                         <div className="top">
          <img src={logoImg} alt="Logotipo forpride" />
          <h2>Nome e relacionamento</h2>
        </div>
        <br />
             <br />
             <div className="form">

       <div className="dataUser">
                <input type="text" placeholder='Nome de Exibição' value={nickname} onChange={(e) => setNickname(e.target.value)} required/>
                            <select className={relationship === "" ? "" : "active"} value={relationship} onChange={handleRelationship} required>
                                <option value="">Status de Relacionamento</option>
                                <option value="Solteir@">Solteir@ </option>
                                <option value="Casad@">Casad@</option>
                                <option value="Enrolad@">Enrolad@</option>
                                <option value="Relacionamento Aberto">Relacionamento Aberto</option>
                            </select>
             </div>  
             <br />
             <br />
             <br />
             <br />

             <div className="titleInput">
          <p>Como conheceu a ForPride:</p>
          </div>
          <select value={recommendation} onChange={handleSetectRecommendation}>
                <option value="">Selecione</option>
                <option value="Instagram">Instagram </option>
                <option value="Facebook">Facebook </option>
                <option value="Promouter de Eventos">Promouter de Eventos </option>
                <option value="Google">Google </option>
                <option value="Indicação de Amigo">Indicação de Amigo </option>
            </select>
            <br />
             <br />
             <div className="buttons">
          <button onClick={openModal }> Próxima Etapa </button>
          <button className='btn' onClick={() => handleSelectView("address")}> Voltar </button>
          </div>
          <br />
             <br />
             <br />
             <br />
             <br />
             <br />
          </div>
          </div>
       </>
      :""
      }



      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}
            overlayClassName="react-modal-overlay"
            className="react-modal-content">
            <button type="button" className="react-modal-button" onClick={closeModal}>
            <IoCloseOutline /> 
            </button>
            <div className="content-modal">
            <h3>Este site é para maiores de 18 anos</h3>
        
            <div className="itensModalMessages">

            <h2>Você confirma que tem 18 anos ou mais?</h2>
            <div className="buttons">
            <button onClick={handleUploadAccount}><FiThumbsUp/>SIM</button>
            <button  onClick={closeModal} className="down"><FiThumbsDown/>NÃO</button>
            </div>
            </div>
            </div>
            </Modal>  
    </div>
    </div>
    
  )
}




export { Entrar }

       