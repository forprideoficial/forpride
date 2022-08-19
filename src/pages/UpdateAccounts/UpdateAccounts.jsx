import { FiUpload } from 'react-icons/fi';
import logoImg from '../../assets/images/logo.png';
import { storage } from '../../services/firebaseConnection';
import { ref, getDownloadURL, uploadBytes} from 'firebase/storage';
// import './updateAccounts.css'
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/Auth';
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-toastify';
import { mask as masker, unMask } from "remask";
import buscaCep from '../../services/api-buscaCep';
import apiGoogleReverse from '../../services/apiGoogleReverse';
import buscaCepPortugal from '../../services/api-buscaCepPortugal';


function UpdateAccounts() {
    const Local = localStorage.getItem("foursome");
    const user = JSON.parse(Local);
    const LocalInformations = localStorage.getItem("informations-foursome");
    const userInformations = JSON.parse(LocalInformations);
    const {updateAccount, logout} = useContext(AuthContext)
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [imageAvatar, setImageAvatar] = useState('');
    const [city2, setCity2] = useState("");
    const [uf2, setUf2] = useState("");
    const [city, setCity] = useState("");
    const [uf, setUf] = useState("");
    const [cityPortugal, setCityPortugal] = useState("");
    const [ufPortugal, setUfPortugal] = useState("");
    const [cep, setCep] = useState("");
    const [codigoPostal, setCodigoPostal] = useState("");
    const [loadding, setLoadding] = useState(false);
    const [location, setLocation] = useState(false);
    const [textError, setTextError] = useState(false);
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [latitude2, setLatitude2] = useState("");
    const [longitude2, setLongitude2] = useState("");
    const [edit, setEdit] = useState(false);
    const [país, setPaís] = useState(user.país);





    useEffect(() => {
        function getLocation() {
            return window.navigator.geolocation.getCurrentPosition(success, error);
             }

        function success(position) {
            const lat  = position.coords.latitude;
            const long = position.coords.longitude;
        
            setLatitude(lat);
            setLongitude(long);

            reverseGeolocalization(lat, long);
          }

          async function reverseGeolocalization(lat, long) {
            console.log(lat, long)
            const address = await apiGoogleReverse.get(`json?latlng=${lat},${long}&key=AIzaSyABASerjYyootb_nxj7evIFsZLOiqcnQm4`);
            // console.log(address.data.results[0])
            setCity2(address.data.results[0].address_components[3].long_name)
            setUf2(address.data.results[0].address_components[4].short_name) 
            return
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

    function handleLogout() {
        logout(user.id)
    }
    
    function handleEditInformations(e){
        e.preventDefault();

        setEdit(true)
    }
    
    async function handleUploadAccount(e) {
        e.preventDefault();

        if(país === "" || país === null || país === undefined) {
            toast.error("Favor escolha seu país");
            return
        }
        if(city === "" && city2 === "") {
            toast.error("Favor preencher o CEP");
            return
        }
        
        if(userInformations.avatar === null || userInformations.avatar === undefined ) {
       toast.info("Salvando as informações. Aguarde...")
                //Avatar
        setLoadding(true);
        console.log(loadding);
        const uuid = uuidv4();

        let newAvatarUrlFirebase = ref(storage, `images/avatar/${uuid}`);
        let uploadAvatar = await uploadBytes(newAvatarUrlFirebase, imageAvatar);
        let photoUrlAvatar = await getDownloadURL(uploadAvatar.ref);
            
        console.log(uploadAvatar.ref.name, photoUrlAvatar); 

        const avatar = photoUrlAvatar === "" || photoUrlAvatar === undefined || photoUrlAvatar === null ? userInformations.avatar : photoUrlAvatar
        const cover = photoUrlAvatar === "" || photoUrlAvatar === undefined || photoUrlAvatar === null ? userInformations.cover : photoUrlAvatar

        updateAccount({
            id: user.id,
             avatar: avatar,
             cover: cover,
             city: cep !== "" ? city :  codigoPostal !== "" ? cityPortugal : city2,
             uf: cep !== "" ? uf :  codigoPostal !== "" ? ufPortugal : uf2,
             relationship: userInformations.relationship,
             nickname: userInformations.nickname,
             cep: cep === "" ? codigoPostal : cep,
             latitude: latitude2 === "" ? latitude : latitude2,
             longitude: longitude2 === "" ? longitude : longitude2,
            username: user.username,
            role: user.role,
            status: user.status,
            type:   user.type,
            email:  user.email,
            phone:  user.phone,
            online: user.online,
            patron: user.patron,
            país: user.país === undefined || user.país === null ? país : user.país,
        });

    } else {
        if(city === "" && city2 === "") {
            toast.error("Favor preencher o CEP");
            return
        }
        const avatar =  userInformations.avatar
        const cover =  userInformations.cover
        updateAccount({
            id: user.id,
             avatar: avatar,
             cover: cover,
             city: cep !== "" ? city :  codigoPostal !== "" ? cityPortugal : city2,
             uf: cep !== "" ? uf :  codigoPostal !== "" ? ufPortugal : uf2,
             relationship: userInformations.relationship,
             nickname: userInformations.nickname,
             cep: cep === "" ? codigoPostal : cep,
             latitude: latitude2 === "" ? latitude : latitude2,
             longitude: longitude2 === "" ? longitude : longitude2,
            username: user.username,
            role: user.role,
            status: user.status,
            type:   user.type,
            email:  user.email,
            phone:  user.phone,
            online: user.online,
            patron: user.patron,
            país: user.país === undefined || user.país === null ? país : user.país,});
    }
           
 
        
    }

    
    if(cep.length === 9) {
        handleSearchCep()
    } else {
      
    }
    if(codigoPostal.length === 7) {
        handleSearchCepPortugal()
    } else {
        
    }

    async function handleSearchCep() {
            try {
                const res = await buscaCep.get(`${cep}/json`);
                setUf(res.data.uf)
                setCity(res.data.localidade)
                return
            }catch{
                console.log("error")
                toast.error("CEP não encontrado. Por favor, digite sua cidade e seu Estado(UF) - Sigla")
                setLocation(true)
                setTextError(true)
            }
            return
        }
    async function handleSearchCepPortugal() {
            try {
                const res = await buscaCepPortugal.get(`${codigoPostal}`);
                console.log(res.data[0])
                setCityPortugal(res.data[0].Distrito)
                setUfPortugal("")
                setLatitude2(parseFloat(res.data[0].Latitude));
                setLongitude2(parseFloat(res.data[0].Longitude));
                return
            }catch{
                console.log("error")
                toast.error("Código Postal não encontrado. Por favor, digite sua Cidade e sua Província")
                setLocation(true)
                setTextError(true)
            }
            return
        }





    function handlePaís(e) {
        setPaís(e.target.value)
        console.log(e.target.value)
    }


    function handleHabiliteLocation(e) {
        e.preventDefault();
        if(location === false) {
            setLocation(true)
        } else {
            setLocation(false)
        }
    }


    function ChangeMask(e) {
        const originalValue = unMask(e.target.value);
        const maskedValue = masker(originalValue, [
          "SS",
        ]);
    
        setUf(maskedValue)
      }
    function ChangeMask2(e) {
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

      console.log({city, city2, uf, uf2, ufPortugal, cityPortugal})

    return (
        <div className="container">
        <div className="content">
            <div className="updateAccount">
                <div className="title">
                    <img src={logoImg} alt="" />
                    <h2>Atualizando informações</h2>
                    </div>
                        <form onSubmit={handleUploadAccount}>
                            <p>Avatar</p>
                        <label className="label-avatar">
                            <span><FiUpload color="#f65" size={25} /></span>
                            <input type="file" accept="image/*" onChange={handleFile} required/><br />
                            <img src={avatarUrl === null ? userInformations.avatar : avatarUrl} alt="Avatar" height={100} width={100}/>
                        </label>

                        

                        <br />
                        {edit === false ? '' :
                        <div className="SearchCep">
                            {user.país === "Brasil" ?
                        <input type="text" placeholder='Digite seu cep' value={cep} onChange={ChangeMaskCEP}/>
                        :
                        <input type="text" placeholder='Digite seu Código Postal' value={codigoPostal} onChange={ChangeMaskCEPPortugal}/>
                            }
                        {/* <button onClick={handleSearchCep}>Buscar Cep</button> */}
                        </div>
                        }
                        {edit === false ? '' :
                        <div className="digiteCep">
                              {user.país === "Brasil" ?
                        <h5>Digite seu CEP, caso a cidade e estado abaixo estejam incorretos</h5>
                                 :
                        <h5>Digite seu Código Postal, caso a cidade abaixo esteja incorreta</h5>
                           }
                        </div>
                         }
                    <div className="data"> 

                    {edit === false ?
                    <div className="location">
                            <br />
                            <h5>Localização automática</h5>
                            <input disabled={edit === false ? 'disabled' : '' } type="text" autoComplete='off' placeholder='' value={uf2.toUpperCase()} onChange={ChangeMask2}  required/>
                            <input disabled={edit === false ? 'disabled' : '' } type="text" autoComplete='off' placeholder='' value={city2} onChange={(e) => setCity2(e.target.value)} required/>
                        </div>    
                        :
                        <div className="location">
                        <br />
                        <h5>Localização pelo cep</h5>
                        {cep !== "" ?
                        <input disabled={edit === false ? 'disabled' : '' } type="text" autoComplete='off' placeholder='UF (Sigla. Ex.: RJ)' value={uf.toUpperCase()} onChange={ChangeMask}  required/>
                        : codigoPostal !== "" ?
                      <input disabled={edit === false ? 'disabled' : '' } type="text" autoComplete='off' placeholder='Província' value={ufPortugal} onChange={(e) => setUfPortugal(e.target.value)}  required/>
                       : "" }
                       {cep !== "" ?
                        <input disabled={edit === false ? 'disabled' : '' } type="text"  placeholder='Cidade' value={city} onChange={(e) => setCity(e.target.value)} required/>
                        : codigoPostal !== "" ?
                      <input disabled={edit === false ? 'disabled' : '' } type="text" autoComplete='off' placeholder='Cidade' value={cityPortugal} onChange={(e) => setCityPortugal(e.target.value)} required/>
                      : "" }
                    </div> }



                        <div className="dataUser">
                            <select className={país === "" ? "" : "active"} value={país} onChange={handlePaís} required>
                                <option value="">Selecione seus país</option>
                                <option value="Brasil">Brasil</option>
                                <option value="Portugal">Portugal</option>
                            </select>
                            </div>             

                    </div>

                    <div className='confirmation'>
                        <div className='buttonsInformation'>
                        <button onClick={handleUploadAccount}> Tudo certo. Avançar!</button>
                        <button onClick={handleEditInformations}> Desejo Editar</button>
                        </div>
                    </div>
                        </form>
            </div>
            </div>
            </div>
    )
}

export {UpdateAccounts}