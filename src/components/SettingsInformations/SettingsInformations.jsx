import "./settingsInformations.css"
import { FiUpload } from "react-icons/fi";
import buscaCep from "../../services/api-buscaCep";
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/Auth';
import { v4 as uuidv4} from 'uuid'
import { storage } from '../../services/firebaseConnection';
import { ref, getDownloadURL, uploadBytes} from 'firebase/storage';
import {toast} from 'react-toastify';
import buscaDistrito from "../../services/api-buscaDistrito";
import buscaCepPortugal from "../../services/api-buscaCepPortugal";
import { mask as masker, unMask } from "remask";
import apiGoogleReverse from "../../services/apiGoogleReverse";

function SettingsInformations() {
    const {NewUpdateInformationsAccount} = useContext(AuthContext)

    const Local = localStorage.getItem("forpride");
    const user = JSON.parse(Local);



    const [avatarUrl, setAvatarUrl] = useState(null);
    const [coverUrl, setCoverUrl] = useState(null);
    const [imageAvatar, setImageAvatar] = useState('');
    const [imageCover, setImageCover] = useState('');
    const [city, setCity] = useState("");
    const [district, setDistrict] = useState("");
    const [districtAll, setDistrictAll] = useState([]);
    const [uf, setUf] = useState("");
    const [codigoPostal, setCodigoPostal] = useState("");
    const [relationship, setRelationship] = useState(user.relationship);
    const [nickname, setNickname] = useState("")
    const [loadding, setLoadding] = useState(false);
    const [textError, setTextError] = useState(false);
    const [latitude2, setLatitude2] = useState("");
    const [longitude2, setLongitude2] = useState("");
    const [city2, setCity2] = useState("");
    const [uf2, setUf2] = useState("");
    const [lat, setLat] = useState("");
    const [long, setLong] = useState("");

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
  
            reverseGeolocalization(lat1, long1);
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
    
    
    function handleFileCover(e) {
        console.log(e.target.files[0])
        console.log(loadding);

       if(e.target.files[0]){
           const image = e.target.files[0];

           if(image.type === 'image/jpeg' || image.type === 'image/jpg' || image.type === 'image/png') {
            setImageCover(image);
               setCoverUrl(URL.createObjectURL(e.target.files[0]));
               console.log(coverUrl)
           } else {
               console.log('Tipo dearquivo não aceito. Envie uma imagem dos tipos: .jpg, .jpeg, .png');
               setImageCover(null);
               return null;
           }
       }
    }

    async function handleUploadAccount(e) {
        e.preventDefault();
        toast.info("Atualizando informações. Aguarde...")

        //Avatar
        setLoadding(true);
        console.log(imageAvatar)
        


            console.log(loadding);
            const uuid = uuidv4();
    
            let newAvatarUrlFirebase = ref(storage, `images/avatar/${uuid}`);
            let uploadAvatar = await uploadBytes(newAvatarUrlFirebase, imageAvatar);
            let photoUrlAvatar = await getDownloadURL(uploadAvatar.ref);
                
            console.log(uploadAvatar.ref.name, photoUrlAvatar);


        

        // Cover
        console.log(imageCover)
        

        const uuid2 = uuidv4();

        let newCoverUrlFirebase = ref(storage, `images/cover/${uuid2}`);
        let upload = await uploadBytes(newCoverUrlFirebase, imageCover);
        let photoUrl = await getDownloadURL(upload.ref);

        console.log(upload.ref.name, photoUrl);
    

        
        //Salvando no banco de dados
        NewUpdateInformationsAccount({id: user.id,
            idAccount: user.idAccount,
            avatar: user.avatar,
            cover: user.cover,
            city: city === "" ? user.city : city,
            uf: uf === "" ? user.uf : uf,
            relationship: relationship === "" ? user.relationship : relationship ,
            nickname: nickname === "" ? user.nickname : nickname,
            idPatrono: user.patron,
            username: user.username,
            created_at: user.created_at
        });
        console.log(loadding);
        setLoadding(false);
        
    }


    async function handleUploadAvatar(e) {
        e.preventDefault();
        toast.info("Atualizando informações. Aguarde...")
        
        //Avatar
        setLoadding(true);
        console.log(imageAvatar)

            console.log(loadding);
            const uuid = uuidv4();
    
            let newAvatarUrlFirebase = ref(storage, `images/avatar/${uuid}`);
            let uploadAvatar = await uploadBytes(newAvatarUrlFirebase, imageAvatar);
            let photoUrlAvatar = await getDownloadURL(uploadAvatar.ref);
                
            console.log(uploadAvatar.ref.name, photoUrlAvatar);
        
        //Salvando no banco de dados
        NewUpdateInformationsAccount({id: user.id,
            idAccount: user.idAccount,
            avatar: photoUrlAvatar === "" ? user.avatar : photoUrlAvatar,
            cover: user.cover,
            city: city === "" ? user.city : city,
            uf: uf === "" ? user.uf : uf,
            relationship: relationship === "" ? user.relationship : relationship ,
            nickname: nickname === "" ? user.nickname : nickname,
            idPatrono: user.patron,
            username: user.username,
            created_at: user.created_at,
        });
        console.log(loadding);
        setLoadding(false);
        
    }

    async function handleUploadCover(e) {
        e.preventDefault();
        toast.info("Atualizando informações. Aguarde...")
        //Avatar
        setLoadding(true);
         // Cover
         console.log(imageCover)
        

         const uuid2 = uuidv4();
 
         let newCoverUrlFirebase = ref(storage, `images/cover/${uuid2}`);
         let upload = await uploadBytes(newCoverUrlFirebase, imageCover);
         let photoUrl = await getDownloadURL(upload.ref);
 
         console.log(upload.ref.name, photoUrl);
        
        //Salvando no banco de dados
        NewUpdateInformationsAccount({id: user.id,
            idAccount: user.idAccount,
            avatar: user.avatar,
            cover: photoUrl === "" ? user.cover : photoUrl,
            city: city === "" ? user.city : city,
            uf: uf === "" ? user.uf : uf,
            relationship: relationship === "" ? user.relationship : relationship ,
            nickname: nickname === "" ? user.nickname : nickname,
            idPatrono: user.patron,
            username: user.username,
            created_at: user.created_at,
        });
        console.log(loadding);
        setLoadding(false);
        
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

    
    if(districtAll) {
        districtAll.sort(function(a,b) {
            if(a.nome < b.nome ) {
                return -1
            } else {
                return true
            }
        })
        }
        
        if(codigoPostal.length === 7) {
            handleSearchCepPortugal()
        } else {
            
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


    function ChangeMaskCEPPortugal(e) {
        const originalValue = unMask(e.target.value);
        const maskedValue = masker(originalValue, [
          "9999999",
        ]);
    
        setCodigoPostal(maskedValue)
      }


    return (
        <div className="settingsInformation">
        <form action="">
    <label className="label-avatar">
                    <span><FiUpload color="#f65" size={25} /></span>
                    <input type="file" accept="image/*" onChange={handleFile}/><br />
                    <img src={avatarUrl === null ? user.avatar : avatarUrl } alt="Avatar" height={100} width={100}/>
                </label>

                <button onClick={handleUploadAvatar}>Atualizar Avatar</button>

                <br />
                <br />
                {user.país === "Brasil" ? 
                <div className="SearchCep">
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
                :
                <div className="SearchCep">
                <input type="text" placeholder='Digite seu Código Postal' value={codigoPostal} onChange={ChangeMaskCEPPortugal} />
                <br />
                <input type="text" autoComplete='off' placeholder='Cidade' value={city} onChange={(e) => setCity(e.target.value)} required disabled/>
                        <input type="text" autoComplete='off' placeholder='Província / Região' value={uf} onChange={(e) => setUf(e.target.value)}  required/>
                </div>
                }



            <div className="data">                      
                    <input type="text" placeholder={user.uf} value={uf} onChange={(e) => setUf(e.target.value)} disabled/>
                    <input type="text" placeholder={user.city} value={city} onChange={(e) => setCity(e.target.value)} disabled/>
                    <input type="text" placeholder={user.nickname} value={nickname} onChange={(e) => setNickname(e.target.value)}/>
                    <select value={relationship} onChange={handleRelationship}>
                        <option value="">Status de Relacionamento</option>
                        <option value="Solteir@">Solteir@ </option>
                        <option value="Casad@">Casad@</option>
                        <option value="Enrolad@">Enrolad@</option>
                        <option value="Relacionamento Aberto">Relacionamento Aberto</option>
                    </select>

            </div>
                <button onClick={handleUploadAccount}>Atualizar</button>

                <br />
                <br />

            <label className="label-cover">
                    <span><FiUpload color="#f65" size={25} /></span>
                    <input type="file" accept="image/*" onChange={handleFileCover}/><br />
                    <img src={coverUrl === null ? user.cover : coverUrl } alt="Avatar"/>
                </label>
              
                <button onClick={handleUploadCover}>Atualizar Capa</button>
    </form>
    </div>
    )
}

export { SettingsInformations }