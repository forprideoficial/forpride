import './radar.css'
import { TopBar } from "../../components/TopBar/TopBar"
import { ToolbarLeftSlim } from "../../components/ToolBarLeftSlim/ToolbarLeftSlim"
import { useEffect, useState, useContext } from "react"
import { AuthContext } from "../../contexts/Auth"
import { BarBottomMenu } from "../../components/BarBottomMenu/BarBottomMenu"
import api from "../../services/api"
import { Link } from "react-router-dom"
import {IoCloseCircleOutline, IoLocationOutline, IoOptionsOutline, IoPersonOutline} from 'react-icons/io5'
import {FaCircle} from 'react-icons/fa'
import { FiArrowUpCircle } from 'react-icons/fi';
import apiGoogleReverse from '../../services/apiGoogleReverse'

function Radar() {
    const {logout, updateUserOnline, verityTimesPeiodTest} = useContext(AuthContext);

    const Local = localStorage.getItem("forpride");
    const userData = JSON.parse(Local);

    const [load, setLoad] = useState(false)
    const [loadOffline, setLoadOffline] = useState(false)
    const [range, setRange] = useState(0);
    const [distancia, setDistancia] = useState([]);
    const [userOffline, setUserOffline] = useState([]);
    const [type, setType] = useState("");
    const [sexualOption, setSexualOption] = useState("");
    const [emojiSelect, setEmojiSelect] = useState("");
    const [myType, setMyType] = useState(false);
    const [myEmojiSelect, setMyEmojiSelect] = useState("");
    const [style, setStyle] = useState("recolher");
    const [users, setUsers] = useState([]);
    const [myInformations, setMyInformations] = useState(false)
    const id = userData.id;
    const [qtd, setqtd] = useState(35)
    const [onlineUsers, setOnlineUsers] = useState(true)
    const [filtro, setFiltro] = useState("false")

    const [minhaLatitude, setMinhaLatitude] = useState("")
    const [minhaLongitude, setMinhaLongitude] = useState("")

    let latInitial = 0
    let longInitial = 0
    let cityActualOnine = ""
   
  useEffect(() => {
    function getLocation() {
        return window.navigator.geolocation.getCurrentPosition(success, error);
         }

    function success(position) {
        latInitial  = position.coords.latitude;
        longInitial = position.coords.longitude;
        const lat100  = position.coords.latitude;
        const long100 = position.coords.longitude;
    
        setMinhaLatitude(lat100);
        setMinhaLongitude(long100);
        console.log("lat100");
        console.log(lat100);
        console.log("long100");
        console.log(long100);
        console.log("latInitial");
        console.log(latInitial);
        console.log("longInitial");
        console.log(longInitial);

      }



          
  function error() {
    console.log('Unable to retrieve your location');
  }

      getLocation()
},[])


    useEffect(() => {
        async function searchAccount() {
          const res =  await api.get(`accounts/filter/${id}`);
            //console.log(res.data)
            if(res.data === "" || res.data === undefined || res.data.length === 0 ) {
                logout(id)
            } else {
                console.log("Conta encontrada")
            } 
        }
        searchAccount()
       }, []);


    useEffect(() => {
        async function loadUserOnlineOne() {
            const idAccount = userData.id;
            const res = await api.get(`/online/one/${idAccount}`);
            setUsers(res.data[0]);
        }
    
        loadUserOnlineOne()
    
        async function loadUsersONline() {
            const res = await api.get(`/online`);
            console.log("res.data ONLINE")
            console.log(res.data)

    
                const myLocation = res.data.filter((location) => (location.idAccount === userData.id)); 
                res.data.forEach((userLocation) => {
                   function getDistanceFromLatLonInKm(myLat, myLong, latFriend, longFriend, cityActualOnine) {
                       console.log(latInitial, longInitial)
                       console.log(cityActualOnine)
                       console.log(myLat, myLong, latFriend, longFriend)
                       var deg2rad = function (deg) { return deg * (Math.PI / 180); },
                           R = 6371,
                           dLat = deg2rad(latFriend - myLat),
                           dLng = deg2rad(myLong - longFriend),
                           a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                               + Math.cos(deg2rad(myLat))
                               * Math.cos(deg2rad(latFriend))
                               * Math.sin(dLng / 2) * Math.sin(dLng / 2),
                           c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                           console.log(((R * c *1000)/10).toFixed());
                           console.log("Teste de Distancia")
                           console.log((R * c*1000)/1000)
                   
                           const distanceCalc = (R * c).toString();
                           
                           if(distanceCalc.includes("00.")) {
                               number = (((R * c *1000)/1000).toFixed())
                           } else{
                               number = (((R * c *1000)/1000).toFixed())
                           }
    
                           const dados = {
                               distanceKm: parseInt(number),
                               id: userLocation.id,
                               idAccount: userLocation.idAccount,
                               avatar: userLocation.avatar,
                               nickname: userLocation.nickname,
                               city: userLocation.city,
                               equalCity: userLocation.equalCity, 
                               type:userLocation.sex,
                               sexualOption:userLocation.sexualOption,
                               plane: userLocation.plane,
                               emoji: userLocation.emoji,
                               song: userLocation.song,
                               invisible: userLocation.invisible,
                               online: true
                           }
                           setDistancia(oldDistancia => [...oldDistancia, dados])
                   }

                   getDistanceFromLatLonInKm(latInitial, longInitial, userLocation.lat, userLocation.long)
                   
                   
                   setLoad(true)
    
           })
    
        }
        loadUsersONline();  
     }, [userData.id])


     useEffect(() => {   
        async function loadUsersOffline() {
            const res = await api.get(`/accounts`);
            console.log("res.data OFFLINE")
            console.log(res.data)
    
                const myLocation = res.data.filter((accounts) => (accounts.id === userData.id));
                console.log(myLocation)

                    res.data.forEach((userAccounts) => {

                        if(userAccounts.latitude === "" || userAccounts.latitude === null || userAccounts.latitude === undefined) {
                            console.log("Sem localização!")
                            return;
                        }
    
                        function getDistanceFromLatLonInKm(myLat, myLong, latFriend, longFriend) {
                            console.log(latInitial, longInitial)
                            console.log(myLat, myLong, latFriend, longFriend)
                            var deg2rad = function (deg) { return deg * (Math.PI / 180); },
                                R = 6371,
                                dLat = deg2rad(latFriend - myLat),
                                dLng = deg2rad(myLong - longFriend),
                                a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                                    + Math.cos(deg2rad(myLat))
                                    * Math.cos(deg2rad(latFriend))
                                    * Math.sin(dLng / 2) * Math.sin(dLng / 2),
                                c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                                console.log(((R * c *1000)/10).toFixed());
                                console.log("Teste de Distancia")
                                console.log((R * c*1000)/1000)
                        
                                const distanceCalc = (R * c).toString();
                                
                                if(distanceCalc.includes("00.")) {
                                    number = (((R * c *1000)/1000).toFixed())
                                } else{
                                    number = (((R * c *1000)/1000).toFixed())
                                }

         
                                const dados = {
                                    distanceKm: parseInt(number),
                                    id: userAccounts.id,
                                    idAccount: userAccounts.id,
                                    avatar: userAccounts.avatar,
                                    nickname: userAccounts.nickname,
                                    city: userAccounts.city,
                                    equalCity: true, 
                                    type:userAccounts.sex,
                                    sexualOption:userAccounts.sexualOption,
                                    plane: "",
                                    emoji: "",
                                    song: "",
                                    invisible: false,
                                    online: false
                                }
                                console.log(distancia)
                                const filterUserOnline = distancia.filter((userFind) => userFind.idAccount === dados.idAccount )
                                console.log("filterUserOnline")
                                console.log(filterUserOnline)
                                if(filterUserOnline.length === 0) {                   
                                    console.log("Zerado")
                                    console.log(filterUserOnline)
                                    setDistancia(oldDistancia => [...oldDistancia, dados])
                                    return;
                                }
     
                        }
                        
                        getDistanceFromLatLonInKm(latInitial, longInitial, userAccounts.latitude, userAccounts.longitude )
                        setLoadOffline(true)
         
                })

    
        }
        loadUsersOffline();  
     }, [userData.id])
    

     if(userData.status === "test") {
        console.log("olá, mundo")
        verityTimesPeiodTest(userData.id);
       }

    function handleUpdateInformations(e) {
        e.preventDefault();
            const id = users.id;
            const idAccount = users.idAccount;
            const username = users.username;
            const type = users.sex;
            const sexualOption = users.sexualOption;
            const nickname = users.nickname;
            const avatar = users.avatar;
            const relationship = users.relationship;
            const lat = users.lat;
            const long = users.long;
            const city = users.city;
            const uf = users.uf;
            const actualCity = users.cityActual;
            const actualUf = users.ufActual;
            const equalCity = users.equalCity;
            const plane = users.plane;
            const emoji = myEmojiSelect;
            const song = users.song;
            const invisible = myType            


        updateUserOnline(
            id, idAccount, username, type, sexualOption ,nickname, avatar, relationship, lat, long, city, uf, actualCity, actualUf, equalCity, plane, emoji, song, invisible            
        )
      }
    function handleSelectStyle(e) {
        e.preventDefault();
        if(style === "recolher") {
            setStyle("selections")
        } else {
            setStyle("recolher")
        }
      }

    function handleSetectType(e) {
        setType(e.target.value)
      }
    function handleSetectSexualOption(e) {
        setSexualOption(e.target.value)
      }

    function handleSetectTEmoji(e) {
        setEmojiSelect(e.target.value)
      }
    function handleSetectMyType(e) {
        setMyType(e.target.value)
      }

    function handleSetectTMyEmoji(e) {
        setMyEmojiSelect(e.target.value)
      }
    
    var number ;

 console.log("User Offline")
 console.log(userOffline)

 //var allUsers = distancia.concat(userOffline);

 if(distancia) {
    distancia.sort(function(a,b) {
        if(a.distanceKm < b.distanceKm ) {
            return -1
        } else {
            return true
        }
    })
}

function handleInvitesView(e) {
    e.preventDefault();
    // setIndex(index + 35)
    setqtd(qtd + 35)
}
function handleAllOnlineUsers(e) {
    e.preventDefault();
    // setIndex(index + 35)
    setOnlineUsers("")
    console.log("")
}
function handleOnlineUsers(e) {
    e.preventDefault();
    // setIndex(index + 35)
    setOnlineUsers(true)
    console.log("Online")
}
function handleOfflineUsers(e) {
    e.preventDefault();
    // setIndex(index + 35)
    setOnlineUsers(false)
    console.log("Offline")
}

function handleSetFilter(data) {
    console.log(data)
    setFiltro(data);
}



function handleTop(e) {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}

const searchAll = distancia.filter((distanciaUser) => (distanciaUser.emoji === emojiSelect && distanciaUser.sex === type && distanciaUser.sexualOption === sexualOption && distanciaUser.distanceKm <= range && distanciaUser.online === onlineUsers ));

const searchDistance= distancia.filter((distanciaUser) => distanciaUser.distanceKm <= range);
const searchType= distancia.filter((distanciaUser) =>  distanciaUser.sex === type);
const searchSexualOption= distancia.filter((distanciaUser) =>  distanciaUser.sexualOption === sexualOption);
const searchEmoji= distancia.filter((distanciaUser) => distanciaUser.emoji === emojiSelect );
const filterOnline = distancia.filter((distanciaUser) => distanciaUser.online === onlineUsers);

const searchTypeRange = distancia.filter((distanciaUser) => (distanciaUser.sex === type && distanciaUser.distanceKm <= range));
const searchEmojiRange = distancia.filter((distanciaUser) => (distanciaUser.emoji === emojiSelect && distanciaUser.distanceKm <= range));
const filterOnlineRange = distancia.filter((distanciaUser) => distanciaUser.distanceKm <= range && distanciaUser.online === onlineUsers);
const filterSexualOptionRange = distancia.filter((distanciaUser) => distanciaUser.distanceKm <= range && distanciaUser.sexualOption === sexualOption);

const searchTypeOnline= distancia.filter((distanciaUser) =>  distanciaUser.sex === type && distanciaUser.online === onlineUsers);
const searchEmojiType = distancia.filter((distanciaUser) => (distanciaUser.sex === type && distanciaUser.emoji === emojiSelect) );
const searchTypeSexualOption= distancia.filter((distanciaUser) =>  distanciaUser.sex === type && distanciaUser.sexualOption === sexualOption);


const searchEmojiOnline= distancia.filter((distanciaUser) => distanciaUser.emoji === emojiSelect && distanciaUser.online === onlineUsers );
const searchEmojiSexualOption = distancia.filter((distanciaUser) => (distanciaUser.emoji === emojiSelect && distanciaUser.sexualOption === sexualOption) );
const searchOnlineSexualOption = distancia.filter((distanciaUser) => distanciaUser.sexualOption === sexualOption && distanciaUser.online === onlineUsers );



const RangeTypeEmoji = distancia.filter((distanciaUser) => (distanciaUser.emoji === emojiSelect && distanciaUser.sex === type && distanciaUser.distanceKm <= range ));
const RangeEmojiOnline = distancia.filter((distanciaUser) => (distanciaUser.emoji === emojiSelect && distanciaUser.distanceKm <= range && distanciaUser.online === onlineUsers ));
const RangeTypeOnline = distancia.filter((distanciaUser) => (distanciaUser.sex === type && distanciaUser.distanceKm <= range && distanciaUser.online === onlineUsers ));
const EmojiTypeOnline = distancia.filter((distanciaUser) => (distanciaUser.emoji === emojiSelect && distanciaUser.sex === type && distanciaUser.online === onlineUsers ));


console.log(filterOnline)

//console.log(myUserFilter)

const filter = (range > 0) && (emojiSelect === "") && (type === "") && (onlineUsers === "") ? searchDistance : 
                (range < 1) && (emojiSelect === "") && (type !== "") && (onlineUsers === "") ? searchType : 
                (range < 1) && (emojiSelect !== "") && (type === "" ) && (onlineUsers === "") ? searchEmoji : 
                (range < 1) && (emojiSelect === "") && (type === "") && (onlineUsers !== "") ? filterOnline : 

                (range > 0) && (emojiSelect === "") && (type !== "") && (onlineUsers === "") ? searchTypeRange :
                (range > 0) && (emojiSelect !== "") && (type === "" ) && (onlineUsers === "") ? searchEmojiRange : 
                (range > 0) && (emojiSelect === "") && (type === "") && (onlineUsers !== "") ? filterOnlineRange : 

                (range < 1) && (emojiSelect !== "") && (type !== "") && (onlineUsers === "") ? searchEmojiType : 
                (range < 1) && (emojiSelect === "") && (type !== "" ) && (onlineUsers !== "") ? searchTypeOnline : 

                (range < 1) && (emojiSelect !== "") && (type === "") && (onlineUsers !== "") ? searchEmojiOnline : 

                (range > 0) && (emojiSelect !== "") && (type !== "") && (onlineUsers === "") ? RangeTypeEmoji : 
                (range > 0) && (emojiSelect !== "") && (type === "") && (onlineUsers !== "") ? RangeEmojiOnline : 
                (range > 0) && (emojiSelect === "") && (type !== "") && (onlineUsers !== "") ? RangeTypeOnline : 
                (range < 1) && (emojiSelect !== "") && (type !== "") && (onlineUsers !== "") ? EmojiTypeOnline : 

                (range > 0) && (emojiSelect !== "") && (type !== "") && (onlineUsers === true) ? searchAll : 
                (range < 1) && (emojiSelect === "") && (type === "") && (onlineUsers === true) ? distancia : 
                distancia

                const limitData = filter?.slice(0, qtd)
                const limitData2 = filterOnline?.slice(0, qtd)

                if(!users) { 
                    return (
                        <div className="content">
                            <div className="main">
                                <div className="messageLoad">
                                <h4>Ative sua localização</h4>
                                </div>
                            </div>
                        </div>   
                    )
                }

                let text = "Carregando usuários do radar. Aguarde..."

                if(userOffline.length > 200) {
                    text = "Calculando distância..."
                } else if(userOffline.length > 300) {
                    text = "Carregando preferências..."
                } else if(userOffline.length > 400) {
                    text = "Verificando quem está perto..."
                } else if(userOffline.length > 500) {
                    text = "Cruzando interesses..."
                } else {
                    text = "Carregando usuários do radar. Aguarde..."
                }

                if(loadOffline === false) { 
                    return (
                    <div className="content">
                        <div className="main">
                            <div className="messageLoad">
                            <h4>{text}</h4>
                            </div>
                        </div>
                    </div>
                    )
                }

    return (
        <div className="content">
     <ToolbarLeftSlim />
     <BarBottomMenu />
            <div className="main">
                <TopBar />
                <div className="aside">
                    <div className="radar">
                            <div className="radar-selected">
                                <button className="selected">Radar</button>
                            </div>

                            {users !== "" || users !== null || users !== undefined ?
                           
                           <div className="mySelections">
                           <div className="text">
                           <h6>{users.invisible === false ? " Você está Visível" : "Você está invisível"}</h6>
                           <h6>{users.emoji === "musica" ? " Hoje você quer balada" :
                                   users.emoji === "emoji" ? "Hoje você quer maldade" :
                                   users.emoji === "viagem" ? "Hoje você quer conversar" : "Deseja escolher um Status?"}</h6>

                                   <button onClick={handleSelectStyle}>Alterar </button>
                           </div>
                           <div className={style === "selections" ? "selections" : "recolher"}>
                               
                       <select value={myType} onChange={handleSetectMyType}>
                           <option value="">Visibilidade</option>
                           <option value={false}>Disponível</option>
                           <option value={true}>Invisível</option>
                       </select>

                       <select value={myEmojiSelect} onChange={handleSetectTMyEmoji}>
                           <option value="">Qual seu status de hoje?</option>
                           <option value="viagem">Quero Conversar 💬</option>
                           <option value="emoji">Quero Maldade 😈</option>
                           <option value="musica">Partiu Balada 🎶</option>
                       </select>

                       <button onClick={handleUpdateInformations}>Atualizar</button>

                           </div>
                       </div>
                       : "Carregando suas informações"
}

{filtro === "false" ? "" :
<div className="filtroGeral">
                            <div className="radar-range">
                                <h4>0 Km</h4>
                                <input type="range" min={0} max={10000} value={range} onChange={(e) => setRange(e.target.value)}/>
                                <h4>{range} km</h4>
                                <br />
                                <br />
                                <br />
                            </div>
                            <div className="selectFilter">
                            <select className={emojiSelect === "" ? "" : "active"} value={emojiSelect} onChange={handleSetectTEmoji}>
                                <option value="">Quem deseja buscar hoje?</option>
                                <option value="viagem">Que querem Conversar 💬</option>
                                <option value="emoji">Que querem Maldade 😈</option>
                                <option value="musica">Que querem Balada 🎶</option>
                            </select>

                            <select className={type === "" ? "" : "active"} value={type} onChange={handleSetectType}>
                                <option value="">Tipo de conta</option>
                                <option value="Homem">Homem</option>
                                <option value="Mulher">Mulher</option>
                                <option value="Homem trans">Homem trans</option>
                                <option value="Mulher trans">Mulher trans</option>
                                <option value="Pessoa não binária">Pessoa não binária</option>
                            </select>
                            <select className={sexualOption === "" ? "" : "active"} value={sexualOption} onChange={handleSetectSexualOption}>
                                <option value="">Orientação Sexual</option>
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


                            <div className="onOff">
                                <button className={onlineUsers === "" ? "selected" : ""}  onClick={handleAllOnlineUsers}>Todos</button>
                                <button className={onlineUsers === true ? "selected" : ""}  onClick={handleOnlineUsers}>Online</button>
                                <button className={onlineUsers === false ? "selected" : ""} onClick={handleOfflineUsers}>Offline</button>
                            </div>
                            </div>
</div>
}

<div className="filterActive">
                {/* {filtro === "false" ?
            <button onClick={() => handleSetFilter("true")}> <IoOptionsOutline/></button>
                :
            <button onClick={() => handleSetFilter("false")}><IoCloseCircleOutline/></button>
                } */}
            </div>

                            
                            <div className="radar-all">
                                {limitData.map((user) => {
                                    return (
                               user.idAccount === userData.id ? "":
                               user.invisible === true ? "" :
                               <div className="radar-unic" key={user.id}>
                                   <div className="img">
                                   <a  href={user.idAccount === userData.id ? `/profile` : `/profile-friend/${user.idAccount}`} target="_blank">
                                   <img 
                        src={user.avatar}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // previne loop
                            currentTarget.src="https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240";
                        }}
                        />
                                   </a >
                                   <h4>{user.emoji === "musica" ? "🎶" : user.emoji === "emoji"? "😈" : user.emoji === "viagem" ? "💬" :""  }</h4>           
                                   <h5>{user.online === true ? <FaCircle /> : "" }</h5>
                                   </div>
                        <h6><b>{user.nickname}</b></h6>
                                   <h6><IoPersonOutline /> {user.sex} - {user.option}</h6>
                                   <h6><IoLocationOutline />{user.distanceKm === 0 ? "- 1Km" : ` ${user.distanceKm}Km`}</h6>
                                   <h6>{user.city}</h6>
                           </div>
                                    )
                                })}

                            </div>
                            <div className="button">
                            <button onClick={handleInvitesView}>Ver mais</button>
                            </div>
                <button className="top" onClick={handleTop}><FiArrowUpCircle /></button>

                    </div>
                </div>
     
            </div>
        </div>
    )
}

export { Radar }