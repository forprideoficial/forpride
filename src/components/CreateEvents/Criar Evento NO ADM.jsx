import "./createEvents.css"
import { FiSearch, FiUpload } from "react-icons/fi";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/Auth";
import { storage } from '../../services/firebaseConnection';
import { ref, getDownloadURL, uploadBytes} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import buscaCep from '../../services/api-buscaCep';
import {toast} from 'react-toastify';
import buscaDistrito from "../../services/api-buscaDistrito";



function CreateEvents() {
    const {createEvents}= useContext(AuthContext);
    const Local = localStorage.getItem("forpride");
    const user = JSON.parse(Local)
    
    const cover2 = "https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/capa%20foursome2.png?alt=media&token=6124db20-1954-47d4-9444-73b3fee41ce0"
    const avatar2 = "https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240"
    const avatar = "https://pic.onlinewebfonts.com/svg/img_562621.png"


    const [avatarUrl, setAvatarUrl] = useState(null);
    const [coverUrl, setCoverUrl] = useState(null);
    const [imageAvatar, setImageAvatar] = useState("");
    const [imageCover, setImageCover] = useState("");
    
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [theme, setTheme] = useState("");
    const [date, setDate] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [district, setDistrict] = useState("");
    const [districtAll, setDistrictAll] = useState([]);
    const [uf, setUf] = useState("");
    const [reference, setReferencee] = useState("");
    const [complement, setComplement] = useState("");
    const [cep, setCep] = useState("");
    const [number, setNumber] = useState("")



    function handleFile(e) {
        console.log(e.target.files[0])

       if(e.target.files[0]){
           const image = e.target.files[0];
           if(image.type === 'image/jpeg' || image.type === 'image/jpg' || image.type === 'image/png') {
               setImageAvatar(image);
               setAvatarUrl(URL.createObjectURL(e.target.files[0]));
            } else {
                window.alert('Tipo dearquivo não aceito. Envie uma imagem dos tipos: .jpg, .jpeg, .png');
                setImageAvatar(null);
                return null;
            }
        }
    }
    
    
    function handleFileCover(e) {
        console.log(e.target.files[0])

       if(e.target.files[0]){
           const image = e.target.files[0];
           if(image.type === 'image/jpeg' || image.type === 'image/jpg' || image.type === 'image/png') {
            setImageCover(image);
               setCoverUrl(URL.createObjectURL(e.target.files[0]));
           } else {
              window.alert('Tipo dearquivo não aceito. Envie uma imagem dos tipos: .jpg, .jpeg, .png');
               setImageCover(null);
               return null;
           }
       }
    }

    async function handleCreateEvent(e) {
        e.preventDefault();
        //Avatar
        const uuid = uuidv4();
        let newAvatarUrlFirebase = ref(storage, `images/folderEvents/${uuid}`);
        let uploadAvatar = await uploadBytes(newAvatarUrlFirebase, imageAvatar);
        let avatar = await getDownloadURL(uploadAvatar.ref);        

        // Cover
        const uuid2 = uuidv4();
        let newCoverUrlFirebase = ref(storage, `images/coverEvents/${uuid2}`);
        let upload = await uploadBytes(newCoverUrlFirebase, imageCover);
        let  cover1 = await getDownloadURL(upload.ref);

            let idAccount = user.id;
            let username = user.username;
            let avatarUser = user.avatar;
            let nickname = user.nickname;
            let status = "pending"
        
            const cover = cover1 === "" || cover1  === undefined || cover1  === null ? cover2 : cover1
 

        createEvents(
        avatar, name, description, date, street, district, city, uf, complement, reference, number, theme, cover, status, idAccount, username, avatarUser, nickname
        )

        setInterval(function () { 
            toast.success("Evento criado com sucesso! Aguarde a aprovação dos moderadores!")
            window.open("/events","_self")
         }, 5000);

        toast.success("Criando Evento...")
        
    }


    async function handleSearchCep(e) {
        e.preventDefault();
        try {
            const res = await buscaCep.get(`${cep}/json`);
            setUf(res.data.uf)
            setCity(res.data.localidade)
            setDistrict(res.data.bairro);
            setStreet(res.data.logradouro);
        }catch{
            console.log("ERRO IN CEP")
        }
    }

   

    function handleTheme(e) {
        setTheme(e.target.value)
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

    function handleSetectCity(e) {
        setCity(e.target.value)
        console.log(e.target.value)
      }

      function handleSetectUf(e) {
        setUf(e.target.value)
        console.log(e.target.value)
      }


    return (
        <div className="createEvent">
        <form action="">
            <h5><b>Folder do Evento (Tamanho: 500px x 500px)</b></h5>
    <label className="label-avatar">
                    <span><FiUpload color="#f65" size={25} /></span>
                    <input type="file" accept="image/*" onChange={handleFile}/><br />
                    <img src={avatarUrl === null ? avatar : avatarUrl } alt="Avatar" height={100} width={100}/>
                </label>

            <div className="data">                      
                    <input type="text" placeholder='Nome Evento' value={name} onChange={(e) => setName(e.target.value)}/>
                    <input type="text" placeholder='Descrição' value={description} onChange={(e) => setDescription(e.target.value)}/>
                    <input type="date" placeholder='Descrição' value={date} onChange={(e) => setDate(e.target.value)}/>
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
                              {/* <input type="text" placeholder='UF - Ex.: RJ' value={uf} onChange={(e) => setUf(e.target.value)} required /> */}
                              <button className="uf" onClick={handleSearchDistrict}>Buscar Cidades</button>
                              <select value={city} onChange={handleSetectCity}>       
                              {districtAll?.map((district) => {
                                      return (
                                          <option key={district.id} value={district.nome}>{district.nome}</option>
                                      )
                                  })}
                              </select>
                </div>
                {/* <input type="text" placeholder='Rua' value={street} onChange={(e) => setStreet(e.target.value)}/>
                <input type="text" placeholder='Bairro' value={district} onChange={(e) => setDistrict(e.target.value)}/>
                <input type="number" placeholder='Número' value={number} onChange={(e) => setNumber(e.target.value)}/>
                <input type="text" placeholder='Cidade' value={city} onChange={(e) => setCity(e.target.value)}/>
                <input type="text" placeholder='Estado' value={uf} onChange={(e) => setUf(e.target.value)}/>
                <input type="text" placeholder='Complemento' value={complement} onChange={(e) => setComplement(e.target.value)}/>
                <input type="text" placeholder='Ponto de Referênca' value={reference} onChange={(e) => setReferencee(e.target.value)}/> */}
                <br />
                  
                    <select value={theme} onChange={handleTheme}>
                        <option value="">Tema do evento</option>
                        <option value="Balada">Balada </option>
                        <option value="Palada sertaneja">Palada sertaneja</option>
                        <option value="Pagode">Pagode</option>
                        <option value="Festa privativa">Festa privativa</option>
                        <option value="Festa no Sítio">Festa no Sítio</option>
                    </select>

            </div>
            <br />
            <h5><b>Capa da página do Evento. Slider no feed ( Tamanho: 1000px largura x 200px altura )</b></h5>
            <label className="label-cover">
                    <span><FiUpload color="#f65" size={25} /></span>
                    <input type="file" accept="image/*" onChange={handleFileCover}/><br />
                    <img src={coverUrl === null ? cover2 : coverUrl } alt="Avatar"/>
                </label>

                <button onClick={handleCreateEvent}>Criar Evento</button>
    </form>
    </div>
    )
}

export {CreateEvents}