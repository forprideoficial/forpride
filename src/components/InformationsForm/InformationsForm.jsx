import { FiRefreshCcw, FiUpload } from 'react-icons/fi';
import logoImg from '../../assets/images/logo.png';
import { storage } from '../../services/firebaseConnection';
import { ref, getDownloadURL, uploadBytes} from 'firebase/storage';
import './informationsForm.css'
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/Auth';
import { v4 as uuidv4 } from 'uuid'
import buscaCep from '../../services/api-buscaCep';
import { toast } from 'react-toastify';
import { mask as masker, unMask } from "remask";
import apiGoogleReverse from '../../services/apiGoogleReverse';
import buscaCepPortugal from '../../services/api-buscaCepPortugal';
import { FaStreetView } from 'react-icons/fa';
import buscaDistrito from '../../services/api-buscaDistrito';


function InformationsForm() {
    const Local = localStorage.getItem("forpride");
    const user = JSON.parse(Local);
    const {createInformationsAccount, logout} = useContext(AuthContext)
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [imageAvatar, setImageAvatar] = useState('');
    const [city, setCity] = useState("");
    const [district, setDistrict] = useState("");
    const [districtAll, setDistrictAll] = useState([]);
    const [uf, setUf] = useState("");
    const [ufSelect, setUfSelect] = useState("");
    const [city2, setCity2] = useState("");
    const [uf2, setUf2] = useState("");
    const [cep, setCep] = useState("");
    const [relationship, setRelationship] = useState("");
    const [nickname, setNickname] = useState("")
    const [loadding, setLoadding] = useState(false);
    const [location, setLocation] = useState("");
    const [textError, setTextError] = useState(false);

    const [latitude, setLatitude] = useState(false);
    const [longitude, setLongitude] = useState(false);

    const [país, setPaís] = useState(user.país);
    const [latitude2, setLatitude2] = useState("");
    const [longitude2, setLongitude2] = useState("");
    const [cityPortugal, setCityPortugal] = useState("");
    const [ufPortugal, setUfPortugal] = useState("");
    const [codigoPostal, setCodigoPostal] = useState("");
    const [view, setView] = useState(false);


    const profile = "https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240"


    useEffect(() => {
        function getLocation() {
            return window.navigator.geolocation.getCurrentPosition(success, error);
             }

        function success(position) {
            const lat  = position.coords.latitude;
            const long = position.coords.longitude;
        
            setLatitude(lat);
            setLongitude(long);
            console.log("lat");
            console.log(lat);
            console.log("long");
            console.log(long);

            reverseGeolocalization(lat, long);
          }

          async function reverseGeolocalization(lat, long) {
            console.log(lat, long)
            const address = await apiGoogleReverse.get(`json?latlng=${lat},${long}&key=AIzaSyCZllXD0czNd_oeF0u_o9LUVJ2bCd1K4p8`);
           console.log(address.data.results[0])
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

    function handleLogout() {
        logout(user.id)
    }
    
    
    async function handleUploadAccount(e) {
        e.preventDefault();

                
        if(avatarUrl === null ) {
            toast.error("Favor adicionar foto de perfil");
            return
        }

        if(city === "" || city === null || city2 === "" || city2 === null ) {
            toast.error("Busque seu CEP para preencher Cidade e Estado");
            return
        }
        
        if(nickname === "" || relationship === "" ) {
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

        


        const linkProfile = "https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240"
        const avatar = photoUrlAvatar === "" || photoUrlAvatar === undefined || photoUrlAvatar === null ? linkProfile : photoUrlAvatar

        const linkCover = "https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/capa%20foursome2.png?alt=media&token=6124db20-1954-47d4-9444-73b3fee41ce0"
        
        const id = uuidv4();
        //Salvando no banco de dados
        createInformationsAccount({id, idAccount: user.id, avatar: avatar, cover: linkCover,
            city: city !== "" ? city : city2,
            uf: uf !== "" ? uf.toUpperCase() : uf2,
       relationship, nickname,
       cep: cep === "" ? codigoPostal : cep,
       latitude: latitude2 === "" ? latitude : latitude2,
       longitude: longitude2 === "" ? longitude : longitude2,
       país: user.país,
       username: user.username, role: user.role, status: user.status, type: user.type, email: user.email, phone: user.phone, online: user.online, patron: user.patron, recommendation: user.recommendation});

        console.log({id, idAccount: user.id, avatar: avatar, cover: linkCover,
            city: city !== "" ? city : city2,
            uf: uf !== "" ? uf.toUpperCase() : uf2,
           relationship, nickname,
           cep: cep === "" ? codigoPostal : cep,
           latitude: latitude2 === "" ? latitude : latitude2,
           longitude: longitude2 === "" ? longitude : longitude2,
           país: user.país,
           username: user.username, role: user.role, status: user.status, type: user.type, email: user.email, phone: user.phone, online: user.online, patron: user.patron});
           
    } else {
        toast.error("Ainda há, campos em branco. Favor revisar");
        return
    }
        
    }

    
    // if(cep.length === 9) {
    //     handleSearchCep()
    // } else {
      
    // }
    // if(ufSelect.length === 2) {
    //     handleSearchDistrict();
    //     return
    // } else {
      
    // }
    if(codigoPostal.length === 7) {
        handleSearchCepPortugal()
    } else {
        
    } 

    // async function handleSearchCep() {
    //         try {
    //             const res = await buscaCep.get(`${cep}/json`);
    //             console.log(res.data);
    //             console.log(res.data.uf);
    //             setUf(res.data.uf)
    //             setCity(res.data.localidade)
    //             return
    //         }catch{
    //             console.log("error")
    //             setLocation("Brasil")
    //             setTextError(true)
    //         }

    //     }
    async function handleSearchDistrict() {
                await buscaDistrito.get(`${uf}/distritos`).then((res) => { 
                    console.log(res.data)
                    setDistrictAll(res.data)
                    console.log(res.data[0].municipio.nome);
                    return;
                }).catch((err) => {
                    console.log(err)
                })
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
                return
            }catch{
                console.log("error")
                setLocation("Portugal")
                setTextError(true)
            }
            return
        }

        function handleSetectCity(e) {
            setCity(e.target.value)
            console.log(e.target.value)
          }


    function handleRelationship(e) {
        setRelationship(e.target.value)
    }


    function handleHabiliteLocation(e) {
        e.preventDefault();
        if(location === "" && user.país === "Brasil") {
            setLocation("Brasil")
        } else if(location === "" && user.país === "Portugal") {
            setLocation("Portugal")
        }
    }
    function handleHabiliteLocation2(e) {
        e.preventDefault();
        if(location === "Brasil" || location === "Portugal") {
            setLocation("")
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

console.log(districtAll)
    return (
            <div className="complete-informations">
                <div className="title">
                    <img src={logoImg} alt="" />
                    <h2>Informações Complementares</h2>
                    </div>
                        <form >
                            {view === false ?
                            <>
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
                            <h5>- Foto de parte do corpo ou do rosto ( Não é obrigatório foto de rosto)</h5>
                            <br />
                            <h5> <b>Não adicionar fotos de:</b> </h5>
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

                        <div className='confirmation'>
                        <div className='buttonsInformation'>
                        <button onClick={handleSelectView}> Avançar</button>
                        </div>
                    </div>


                            </> :
                            view === true ?
                            <>
                                        {location === "Portugal" ?
                    <>
                        <div className="SearchCep">
                        <input type="text" placeholder='Digite seu Código Postal' value={codigoPostal} onChange={ChangeMaskCEPPortugal}/>
                        </div>
                        <div className="digiteCep">
                        <h5>Digite seu Código Postal, para buscar sua cidade</h5>
                        </div>
                    </>
                    : ""}

                    <div className="data"> 

                 
                    {location === "" ?
                    <div className="location">
                            <br />
                            <h5>Localização automática</h5>
                            <input type="text" placeholder='Cidade' value={city2} onChange={(e) => setCity2(e.target.value)} required disabled/>
                            <input type="text" placeholder='UF (Sigla. Ex.: RJ)' value={uf2} onChange={ChangeMask}  required disabled/>
                        </div>  : ""}  

                        

                        {location === "Brasil" ?       
                    <>
                     <div className="location">
                        <br />
                        
                            <h5>Localização Manual</h5>
                            <input type="text" placeholder='UF - Ex.: RJ' value={uf} onChange={(e) => setUf(e.target.value)} required />
                            <button className="uf" onClick={() => handleSearchDistrict()}>Buscar Cidades</button>
                            <select value={city} onChange={handleSetectCity}>       
                            {districtAll?.map((district) => {
                                    return (
                                        <option key={district.id} value={district.nome}>{district.nome}</option>
                                    )
                                })}
                            </select>
                    </div> 
                    </>
                    : location === "Portugal" ?
                    <>
                    {
                        codigoPostal.length < 7 ? "" :
                        <>
                         <div className="location">
                         <br />
                        <h5>Localização pelo Código Postal</h5>
                        <input type="text" autoComplete='off' placeholder='Cidade' value={city} onChange={(e) => setCity(e.target.value)} required disabled/>
                        <input type="text" autoComplete='off' placeholder='Província' value={uf} onChange={(e) => setUf(e.target.value)}  required disabled/>
                        </div>
                        </>
                    }
                    </>
                    : ""} 

                        {
                            location === "" ?
                        <div className="digiteCep">
                        <button onClick={handleHabiliteLocation}>{user.país === "Brasil" ? "Cidade/UF incorretos ou vazios? Clique aqui"
                                                                    : user.país === "Portugal" ? "Cidade incorreta ou vazia? Clique aqui" : ""}</button>
                        </div>
                        :
                        <div className="digiteCep">
                        <button onClick={handleHabiliteLocation2}>Voltar a localização automática</button>
                        </div>

                        }



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

                    </div>

                    <div className='confirmation'>
                        <div className='buttonsInformation'>
                        <button onClick={handleSelectView}> Voltar</button>
                        <button onClick={handleUploadAccount}> Salvar e avançar</button>
                        </div>
                    </div>
                            </>
                        : ""
                            }




            
                        </form>
            </div>
    )
}

export {InformationsForm}