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
import { IoCalendarOutline } from "react-icons/io5";

function SettingsInformations() {
    const {updateAccount, updateAvatarCover} = useContext(AuthContext)

    const Local = localStorage.getItem("forpride");
    const user = JSON.parse(Local);



    const [avatarUrl, setAvatarUrl] = useState(null);
    const [coverUrl, setCoverUrl] = useState(null);
    const [imageAvatar, setImageAvatar] = useState('');
    const [imageCover, setImageCover] = useState('');
    const [city, setCity] = useState(user.city);
    const [uf, setUf] = useState(user.uf);
    const [district, setDistrict] = useState("");
    const [districtAll, setDistrictAll] = useState([]);
    const [codigoPostal, setCodigoPostal] = useState("");
    const [relationship, setRelationship] = useState(user.relationship);
    const [nickname, setNickname] = useState(user.nickname)
    const [loadding, setLoadding] = useState(false);
    const [textError, setTextError] = useState(false);
    const [latitude2, setLatitude2] = useState("");
    const [longitude2, setLongitude2] = useState("");
    const [lat, setLat] = useState("");
    const [long, setLong] = useState("");
    const [preferenceOption, setPreferenceOption] = useState(user.preferenceOption);
    const [preference, setPreference] = useState(user.preference);
    const [birthDateUser, setBirthDateUser] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [phone, setPhone] = useState("");
    const [day, setDay] = useState(user.birthDate.substring(user.birthDate.length -2));
    const [month, setMonth] = useState(user.birthDate.slice(5,-3));
    const [year, setYear] = useState(user.birthDate.substring(0,4));
    const [sex, setSex] = useState(user.sex);
    const [sexualOption, setSexualOption] = useState(user.sexualOption);
    const [checked, setChecked] = useState(false);
    const [checkedSex, setCheckedSex] = useState(user.viweSex);
    const [checkedOptionSexual, setCheckedOptionSexual] = useState(user.viewSexualOption);
    const [maxAge, setMaxAge] = useState(user.maxAge);
    const [minAge, setMinAge] = useState(user.maxAge);
    const [editAddress, setEditAddress] = useState(false);
    const [pa??s, setPa??s] = useState(user.pa??s);
    const [age, setAge] = useState("");
    const [sign, setSign] = useState(user.sign);
    const [cep, setCep] = useState(user.cep);

    

    const nascimento = new Date(`${year}-${month}-${day}`)
    console.log(nascimento);
    const hoje = new Date();
    let idadeAtual = 0;
    
    if(birthDateUser !== "") {
        idadeAtual = Math.floor(Math.ceil(Math.abs(nascimento.getTime() - hoje.getTime()) / (1000 * 3600 * 24)) / 365.25) ;
        console.log(idadeAtual);
    }

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
        console.log(e.target.files[0])

       if(e.target.files[0]){
           const image = e.target.files[0];

           if(image.type === 'image/jpeg' || image.type === 'image/jpg' || image.type === 'image/png') {
               setImageAvatar(image);
               setAvatarUrl(URL.createObjectURL(e.target.files[0]));
               console.log(avatarUrl);
            } else {
                console.log('Tipo dearquivo n??o aceito. Envie uma imagem dos tipos: .jpg, .jpeg, .png');
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
               console.log('Tipo dearquivo n??o aceito. Envie uma imagem dos tipos: .jpg, .jpeg, .png');
               setImageCover(null);
               return null;
           }
       }
    }

    async function handleUploadAvatar(e) {
        e.preventDefault();
        toast.info("Enviando imagem. Aguarde...")

        //Avatar
        setLoadding(true);
        console.log(imageAvatar)
        let photoUrlAvatar
        if(imageAvatar !== "") {

          console.log(loadding);
          const uuid = uuidv4();
  
          let newAvatarUrlFirebase = ref(storage, `images/avatar/${uuid}`);
          let uploadAvatar = await uploadBytes(newAvatarUrlFirebase, imageAvatar);
          photoUrlAvatar = await getDownloadURL(uploadAvatar.ref);
              
          console.log(uploadAvatar.ref.name, photoUrlAvatar);
        }
        
        let photoUrl
        // Cover
        console.log(imageCover)
        if(imageCover !== "") {
          const uuid2 = uuidv4();
  
          let newCoverUrlFirebase = ref(storage, `images/cover/${uuid2}`);
          let upload = await uploadBytes(newCoverUrlFirebase, imageCover);
          photoUrl = await getDownloadURL(upload.ref);
  
          console.log(upload.ref.name, photoUrl);
        }


      const avatar = photoUrlAvatar === "" ? user.avatar : photoUrlAvatar
      const cover = photoUrl === "" ? user.cover : photoUrl
        //Salvando no banco de dados
        updateImageAvatarCover(avatar, cover)
        console.log(loadding);
        setLoadding(false);
        
    }

    function updateImageAvatarCover(avatar, cover) {
        console.log({id: user.id,
          avatar: avatar === undefined ? user.avatar : avatar,
          cover: cover === undefined ? user.cover : cover,
        })
        updateAvatarCover({id: user.id,
          avatar: avatar === undefined ? user.avatar : avatar,
          cover: cover === undefined ? user.cover : cover,
        })
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

function handleUpdateAccount(e) {
    e.preventDefault();

    const avatar = user.avatar;
    const cover = user.cover;
    const phone = user.phone;
    const birthDate = `${year}-${month}-${day}`
    const age = idadeAtual === 0 || idadeAtual === NaN ? user.age : idadeAtual


    console.log({id: user.id,
        pa??s, viweSex: checkedSex, sex, age,
        sexualOption, 
        viewSexualOption: checkedOptionSexual, 
        preference, 
        preferenceOption,
        birthDate, sign, phone, 
        nickname, avatar, cover, relationship, city, uf, cep, maxAge, minAge
    });
     updateAccount({id: user.id,
         pa??s, viweSex: checkedSex, sex, age,
         sexualOption, 
         viewSexualOption: checkedOptionSexual, 
         preference, 
         preferenceOption,
         birthDate, sign, phone, 
         nickname, avatar, cover, relationship, city, uf, cep, maxAge, minAge
     });
  }



    async function handleSearchDistrict(e) {
        e.preventDefault();
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
                      toast.error("C??digo Postal n??o encontrado. Por favor, digite sua Cidade e sua Prov??ncia")
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

      function handleSetectCity(e) {
        setCity(e.target.value)
        console.log(e.target.value)
      }
      function handleSetectUf(e) {
        setUf(e.target.value)
        console.log(e.target.value)
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

    function ChangeMaskCEPPortugal(e) {
        const originalValue = unMask(e.target.value);
        const maskedValue = masker(originalValue, [
          "9999999",
        ]);
    
        setCodigoPostal(maskedValue)
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
                return
            }catch{
                console.log("error")
                toast.error("C??digo Postal n??o encontrado. Por favor, digite sua Cidade e sua Prov??ncia")
                setTextError(true)
            }
            return
        }

        function handlePreference(e) {
            setPreference(e.target.value)
          }
          function handlePreferenceSexualOption(e) {
            setPreferenceOption(e.target.value)
          }
         
          
          function handleSelectMaxAge(e) {
            setMaxAge(e.target.value)
          }
          function handleSelectMinAge(e) {
            setMinAge(e.target.value)
          }
          

          function handleEditAdress(e) {
            e.preventDefault()
            if(editAddress === false ) {
                setEditAddress(true)
            } else {
                setEditAddress(false)

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
        


    return (
        <div className="settingsInformation">
<div className="form">
    <label className="label-avatar">
                    <span><FiUpload color="#f65" size={25} /></span>
                    <input type="file" accept="image/*" onChange={handleFile}/><br />
                    <img src={avatarUrl === null ? user.avatar : avatarUrl } alt="Avatar" height={100} width={100}/>
                </label>

                <label className="label-cover">
                    <span><FiUpload color="#f65" size={25} /></span>
                    <input type="file" accept="image/*" onChange={handleFileCover}/><br />
                    <img src={coverUrl === null ? user.cover : coverUrl } alt="Avatar"/>
                </label>

                <button onClick={handleUploadAvatar}>Atualizar Avatar e capa</button>

                <br />
                <br />


                <div className="data">  
            <div className="text">
                    <h4>Eu sou</h4>
                </div>   
                <select className={sex === "" ? "empyt" : ""} value={sex} onChange={handlePreference} required>
                <option value="">Selecione</option>
                <option value="Homem">Homem</option>
                <option value="Mulher">Mulher</option>
                <option value="Homem trans">Homem trans</option>
                <option value="Mulher trans">Mulher trans</option>
                <option value="Pessoa n??o bin??ria">Pessoa n??o bin??ria</option>
            </select>        
            <div className="terms">
          <p>Mostrar no meu perfil</p>
          <input type="checkbox" checked={checkedSex} onChange={handleChangeSex}/>
          <br/>
          </div>         
                <select className={sexualOption === "" ? "empyt" : ""} value={sexualOption} onChange={handlePreferenceSexualOption} required>
                <option value="">Selecione</option>
                <option value="Gay">Gay</option>
                <option value="L??sbica">L??sbica</option>
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
          <p>Mostrar no meu perfil</p>
          <input type="checkbox" checked={checkedOptionSexual} onChange={handleChangeOptionSexual}/>
          </div>

            </div>





<div className="data">
        <div className="text">
                    <h4>Nome de Exibi????o</h4>
        </div>
        <input type="text" placeholder={user.nickname} value={nickname} onChange={(e) => setNickname(e.target.value)}/>
</div>
<div className="data">
        <div className="text">
                    <h4>Relacionamento</h4>
        </div>
        <select value={relationship} onChange={handleRelationship}>
                        <option value="">Status de Relacionamento</option>
                        <option value="Solteir@">Solteir@ </option>
                        <option value="Casad@">Casad@</option>
                        <option value="Enrolad@">Enrolad@</option>
                        <option value="Relacionamento Aberto">Relacionamento Aberto</option>
                    </select>
</div>

        <div className="data">
              <div className="text">
                    <h5>SIGNO</h5>    
                        </div>
                            <select className={sign === "" ? "empyt" : ""} required value={sign} onChange={handleSelectSign}>
                                <option value="">Selecione</option>
                                <option value="??ries">??ries </option>
                                <option value="Touro">Touro </option>
                                <option value="G??meos">G??meos</option>
                                <option value="C??ncer">C??ncer</option>
                                <option value="Le??o">Le??o</option>
                                <option value="Virgem">Virgem</option>
                                <option value="Libra">Libra</option>
                                <option value="Escorpi??o">Escorpi??o</option>
                                <option value="Sagit??rio">Sagit??rio</option>
                                <option value="Capric??rnio">Capric??rnio</option>
                                <option value="Aqu??rio">Aqu??rio</option>
                                <option value="Peixes">Peixes</option>
               </select>
        </div>



            <div className="data">
            <div className="text">
                    <h4>Dados de endere??o</h4>
                </div>                   
                    <input type="text" placeholder={user.uf} value={uf} onChange={(e) => setUf(e.target.value)} disabled/>
                    <input type="text" placeholder={user.city} value={city} onChange={(e) => setCity(e.target.value)} disabled/>
            <button className="uf" onClick={handleEditAdress}>Alterar Endere??o</button>
            </div>

            {editAddress === false ? "" :
            <div className="data"> 
                {user.pa??s === "Brasil" ? 
               <>
                             <select value={uf} onChange={handleSetectUf}> 
                                      <option value="">Escolha seu estado</option>
                                      <option value="AC">Acre</option>
                                      <option value="AL">Alagoas</option>
                                      <option value="AP">Amap??</option>
                                      <option value="AM">Amazonas</option>
                                      <option value="BA">Bahia</option>
                                      <option value="CE">Cear??</option>
                                      <option value="DF">Distrito Federal</option>
                                      <option value="ES">Esp??rito Santo</option>
                                      <option value="GO">Goi??s</option>
                                      <option value="MA">Maranh??o</option>
                                      <option value="MT">Mato Grosso</option>
                                      <option value="MS">Mato Grosso do Sul</option>
                                      <option value="MG">Minas Gerais</option>
                                      <option value="PA">Par??</option>
                                      <option value="PB">Para??ba</option>
                                      <option value="PR">Paran??</option>
                                      <option value="PE">Pernambuco</option>
                                      <option value="PI">Piau??</option>
                                      <option value="RJ">Rio de Janeiro</option>
                                      <option value="RN">Rio Grande do Norte</option>
                                      <option value="RS">Rio Grande do Sul</option>
                                      <option value="RO">Rond??nia</option>
                                      <option value="RR">Roraima</option>
                                      <option value="SC">Santa Catarina</option>
                                      <option value="SP">S??o Paulo</option>
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
                              </select></>
                : 
                <>
                <div className="text">
                <h5></h5>
                </div>
                <input type="text" placeholder='Digite seu C??digo Postal' value={codigoPostal} onChange={ChangeMaskCEPPortugal}/>
                      <input type="text" autoComplete='off' placeholder='Cidade' value={city} onChange={(e) => setCity(e.target.value)} required/>
                      <input type="text" autoComplete='off' placeholder='Prov??ncia / Vila / Regi??o' value={uf} onChange={(e) => setUf(e.target.value)}  required/>
                        </>
                }
                </div>
             }


            <div className="data">  
            <div className="text">
                    <h4>Prefer??ncias</h4>
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
                <option value="Pessoa n??o bin??ria">Pessoa n??o bin??ria</option>
            </select>                 
                <select className={preferenceOption === "" ? "empyt" : ""} value={preferenceOption} onChange={handlePreferenceSexualOption} required>
                <option value="">Selecione</option>
                <option value="Gay">Gay</option>
                <option value="L??sbica">L??sbica</option>
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
             <br />
            <div className="text">
                    <h5>Selecione a idade m??xima e idade m??nima:</h5>
                </div> 
            <div className="inputsAge"> 
            <select value={minAge} onChange={handleSelectMinAge} required>
                      <option>Idade M??nima</option>
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
                      <option>Idade M??xima</option>
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
          </div>

          <div className="data2">
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
                      <option>M??s</option>
                      <option value="01">Janeiro</option>
                      <option value="02">Fevereiro</option>
                      <option value="03">Mar??o</option>
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
          <div className="text">
            <h5>Sua idade: {idadeAtual}</h5>
          </div>
          </div>

                <button onClick={handleUpdateAccount}>Atualizar dados</button>

                <br />
                <br />

       </div>
    </div>
    )
}

export { SettingsInformations }