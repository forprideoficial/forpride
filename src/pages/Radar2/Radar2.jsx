import './radar2.css'
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

function Radar2() {
    const {logout, updateUserOnline, socketDataLocation, verityTimesPeiodTest} = useContext(AuthContext);

<<<<<<< HEAD
    const Local = localStorage.getItem("forpride");
=======
    const Local = localStorage.getItem("foursome");
>>>>>>> 92dc7d78bea45d0e00f9337c8b860be63edae8cd
    const userData = JSON.parse(Local);

    const [load, setLoad] = useState(false)
    const [loadOffline, setLoadOffline] = useState(false)
    const [range, setRange] = useState(0);
    const [distancia, setDistancia] = useState([]);
    const [userOffline, setUserOffline] = useState([]);
    const [type, setType] = useState("");
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
<<<<<<< HEAD
    const [ff, setFf] = useState(false)
=======
>>>>>>> 92dc7d78bea45d0e00f9337c8b860be63edae8cd

    const [minhaLatitude, setMinhaLatitude] = useState(0)
    const [minhaLongitude, setMinhaLongitude] = useState(0)

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
        console.log(lat100);
        console.log(long100);
<<<<<<< HEAD

        if(ff === true) {
            loadUsersONline(latInitial, longInitial);
            return
        } else if (ff === false) {
            loadUsersOffline(latInitial, longInitial); 
            return
        }
      }

      async function loadUsersONline(latInitial, longInitial) {
        await api.get(`/online/distance/${latInitial}/${longInitial}`).then((result) => {
            setDistancia(result.data)
            console.log("Online")
            console.log(result.data)
        }).catch((err) => {
            console.log(err)
        })
        }

        async function loadUsersOffline(latInitial, longInitial) {
        await api.get(`/accounts/distance/${latInitial}/${longInitial}`).then((result) => {
            setDistancia(result.data)
            console.log("Offline")
            console.log(result.data)
        }).catch((err) => {
            console.log(err)
        });
    }


=======
      }
>>>>>>> 92dc7d78bea45d0e00f9337c8b860be63edae8cd
        
  function error() {
    console.log('Unable to retrieve your location');
  }

      getLocation()
<<<<<<< HEAD
},[ff])
=======
},[])
>>>>>>> 92dc7d78bea45d0e00f9337c8b860be63edae8cd


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
        async function searchInformations() {
          const res =  await api.get(`informations/${id}`);
           // console.log(res.data)
            if(res.data === "" || res.data === undefined || res.data.length === 0 ) {
                logout(id)
            } else {
                console.log("Informações encontradas")
            } 
        }
        async function searchCharacteristcs() {
          const res =  await api.get(`characteristics/${id}`);
           // console.log(res.data)
            if(res.data === "" || res.data === undefined || res.data.length === 0 ) {
                logout(id)
            } else {
                console.log("Caracteristicas encontradas")
            } 
        }
        async function searchPreferences() {
          const res =  await api.get(`preferences/${id}`);
//console.log(res.data)
            if(res.data === "" || res.data === undefined || res.data.length === 0 ) {
                logout(id)
            } else {
                console.log("Preferencias encontradas")
                setMyInformations(true)
            } 
        }

        searchAccount()
        searchInformations()
        searchCharacteristcs()
        searchPreferences()
       }, []);


<<<<<<< HEAD
=======
    useEffect(() => {
        async function loadUsersONline() {
            console.log("online")
            console.log("minhaLatitude")
            console.log(latInitial)
            console.log("minhaLongitude")
            console.log(longInitial)
        await api.get(`/online/distance/${latInitial}/${longInitial}`).then((result) => {
            setDistancia(result.data)
            console.log("Online")
            console.log(result.data)
        }).catch((err) => {
            console.log(err)
        });
    
        }
        loadUsersONline();  
     }, [])


     useEffect(() => {   
        async function loadUsersOffline() {
            console.log("Offline")
            console.log("minhaLatitude")
            console.log(latInitial)
            console.log("minhaLongitude")
            console.log(longInitial)
        await api.get(`/accounts/distance/${latInitial}/${longInitial}`).then((result) => {
            setUserOffline(result.data)
            console.log("Offline")
            console.log(result.data)
        }).catch((err) => {
            console.log(err)
        });
    }
        loadUsersOffline();  
     }, [])


     const newUsers = distancia.concat(userOffline);

     console.log("newUsers")
     console.log(newUsers)
    

>>>>>>> 92dc7d78bea45d0e00f9337c8b860be63edae8cd
     if(latInitial === 0 && longInitial === 0) {
         socketDataLocation();
     }

     if(userData.status === "test") {
        console.log("olá, mundo")
        verityTimesPeiodTest(userData.id);
       }

    function handleUpdateInformations(e) {
        e.preventDefault();
            const id = users.id;
            const idAccount = users.idAccount;
            const username = users.username;
            const type = users.type;
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
            id, idAccount, username, type ,nickname, avatar, relationship, lat, long, city, uf, actualCity, actualUf, equalCity, plane, emoji, song, invisible            
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

    function handleSetectTEmoji(e) {
        setEmojiSelect(e.target.value)
      }
    function handleSetectMyType(e) {
        setMyType(e.target.value)
      }

    function handleSetectTMyEmoji(e) {
        setMyEmojiSelect(e.target.value)
      }
<<<<<<< HEAD
    function handleSelectFF(e) {
        setFf(e.target.value)
      }
    
 if(distancia) {
    distancia.sort(function(a,b) {
=======
    
 if(newUsers) {
    newUsers.sort(function(a,b) {
>>>>>>> 92dc7d78bea45d0e00f9337c8b860be63edae8cd
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

<<<<<<< HEAD
const searchAll = distancia.filter((distanciaUser) => (distanciaUser.emoji === emojiSelect && distanciaUser.type === type && distanciaUser.distanceKm <= range && distanciaUser.online === onlineUsers ));

const searchDistance= distancia.filter((distanciaUser) => distanciaUser.distanceKm <= range);
const searchType= distancia.filter((distanciaUser) =>  distanciaUser.type === type);
const searchEmoji= distancia.filter((distanciaUser) => distanciaUser.emoji === emojiSelect );
const filterOnline = distancia.filter((distanciaUser) => distanciaUser.online === onlineUsers);

const searchTypeRange = distancia.filter((distanciaUser) => (distanciaUser.type === type && distanciaUser.distanceKm <= range));
const searchEmojiRange = distancia.filter((distanciaUser) => (distanciaUser.emoji === emojiSelect && distanciaUser.distanceKm <= range));
const filterOnlineRange = distancia.filter((distanciaUser) => distanciaUser.distanceKm <= range && distanciaUser.online === onlineUsers);

const searchEmojiType = distancia.filter((distanciaUser) => (distanciaUser.emoji === emojiSelect && distanciaUser.type === type) );
const searchTypeOnline= distancia.filter((distanciaUser) =>  distanciaUser.type === type && distanciaUser.online === onlineUsers);

const RangeTypeEmoji = distancia.filter((distanciaUser) => (distanciaUser.emoji === emojiSelect && distanciaUser.type === type && distanciaUser.distanceKm <= range ));
const RangeEmojiOnline = distancia.filter((distanciaUser) => (distanciaUser.emoji === emojiSelect && distanciaUser.distanceKm <= range && distanciaUser.online === onlineUsers ));
const RangeTypeOnline = distancia.filter((distanciaUser) => (distanciaUser.type === type && distanciaUser.distanceKm <= range && distanciaUser.online === onlineUsers ));
const EmojiTypeOnline = distancia.filter((distanciaUser) => (distanciaUser.emoji === emojiSelect && distanciaUser.type === type && distanciaUser.online === onlineUsers ));

const searchEmojiOnline= distancia.filter((distanciaUser) => distanciaUser.emoji === emojiSelect && distanciaUser.online === onlineUsers );
=======
const searchAll = newUsers.filter((distanciaUser) => (distanciaUser.emoji === emojiSelect && distanciaUser.type === type && distanciaUser.distanceKm <= range && distanciaUser.online === onlineUsers ));

const searchDistance= newUsers.filter((distanciaUser) => distanciaUser.distanceKm <= range);
const searchType= newUsers.filter((distanciaUser) =>  distanciaUser.type === type);
const searchEmoji= newUsers.filter((distanciaUser) => distanciaUser.emoji === emojiSelect );
const filterOnline = newUsers.filter((distanciaUser) => distanciaUser.online === onlineUsers);

const searchTypeRange = newUsers.filter((distanciaUser) => (distanciaUser.type === type && distanciaUser.distanceKm <= range));
const searchEmojiRange = newUsers.filter((distanciaUser) => (distanciaUser.emoji === emojiSelect && distanciaUser.distanceKm <= range));
const filterOnlineRange = newUsers.filter((distanciaUser) => distanciaUser.distanceKm <= range && distanciaUser.online === onlineUsers);

const searchEmojiType = newUsers.filter((distanciaUser) => (distanciaUser.emoji === emojiSelect && distanciaUser.type === type) );
const searchTypeOnline= newUsers.filter((distanciaUser) =>  distanciaUser.type === type && distanciaUser.online === onlineUsers);

const RangeTypeEmoji = newUsers.filter((distanciaUser) => (distanciaUser.emoji === emojiSelect && distanciaUser.type === type && distanciaUser.distanceKm <= range ));
const RangeEmojiOnline = newUsers.filter((distanciaUser) => (distanciaUser.emoji === emojiSelect && distanciaUser.distanceKm <= range && distanciaUser.online === onlineUsers ));
const RangeTypeOnline = newUsers.filter((distanciaUser) => (distanciaUser.type === type && distanciaUser.distanceKm <= range && distanciaUser.online === onlineUsers ));
const EmojiTypeOnline = newUsers.filter((distanciaUser) => (distanciaUser.emoji === emojiSelect && distanciaUser.type === type && distanciaUser.online === onlineUsers ));

const searchEmojiOnline= newUsers.filter((distanciaUser) => distanciaUser.emoji === emojiSelect && distanciaUser.online === onlineUsers );
>>>>>>> 92dc7d78bea45d0e00f9337c8b860be63edae8cd

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

    return (
        <div className="content">
     <ToolbarLeftSlim />
     <BarBottomMenu />
<<<<<<< HEAD
            <div className="main2">
                <TopBar />
                <div className="aside2">
                    <div className="radar2">
                            <div className="radar2-selected">
=======
            <div className="main">
                <TopBar />
                <div className="aside">
                    <div className="radar">
                            <div className="radar-selected">
>>>>>>> 92dc7d78bea45d0e00f9337c8b860be63edae8cd
                                <button className="selected">Radar</button>
                            </div>

                            {users !== "" || users !== null || users !== undefined ?
                           
                           <div className="mySelections">
                           <div className="text">
                           <h6>{users.invisible === false ? " Você está Visível" : "Você está invisível"}</h6>
                           <h6>{users.emoji === "musica" ? " Hoje você quer balada" :
                                   users.emoji === "emoji" ? "Hoje você quer sexo" :
                                   users.emoji === "viagem" ? "Você está aqui de viagem" : "Deseja escolher um Status?"}</h6>

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
                           <option value="viagem">De viagem ✈️</option>
                           <option value="emoji">Quero Sexo 😈</option>
                           <option value="musica">Partiu Balada 🎶</option>
                       </select>

                       <button onClick={handleUpdateInformations}>Atualizar</button>

                           </div>
                       </div>
                       : "Carregando suas informações"
}

{filtro === "false" ? "" :
<div className="filtroGeral">
<<<<<<< HEAD
                            <div className="radar2-range">
=======
                            <div className="radar-range">
>>>>>>> 92dc7d78bea45d0e00f9337c8b860be63edae8cd
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
                                <option value="viagem">De viagem ✈️</option>
                                <option value="emoji">Que querem Sexo 😈</option>
                                <option value="musica">Que querem Balada 🎶</option>
                            </select>

                            <select className={type === "" ? "" : "active"} value={type} onChange={handleSetectType}>
                                <option value="">Tipo de conta</option>
                                <option value="Homem">Homem </option>
                                <option value="Mulher">Mulher </option>
                                <option value="Casal">Casal </option>
                                <option value="Trisal">Trisal </option>
                                <option value="Transex">Transex </option>
                                <option value="Travestis">Travestis </option>
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
                {filtro === "false" ?
            <button onClick={() => handleSetFilter("true")}> <IoOptionsOutline/></button>
                :
            <button onClick={() => handleSetFilter("false")}><IoCloseCircleOutline/></button>
                }
            </div>

                            
<<<<<<< HEAD
                            <div className="radar2-all">
=======
                            <div className="radar-all">
>>>>>>> 92dc7d78bea45d0e00f9337c8b860be63edae8cd
                                {limitData.map((user) => {
                                    return (
                               user.idAccount === userData.id ? "":
                               user.invisible === true ? "" :
<<<<<<< HEAD
                               <div className="radar2-unic" key={user.id}>
=======
                               <div className="radar-unic" key={user.id}>
>>>>>>> 92dc7d78bea45d0e00f9337c8b860be63edae8cd
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
                                   <h4>{user.emoji === "musica" ? "🎶" : user.emoji === "emoji"? "😈" : user.emoji === "viagem" ? "✈️" :""  }</h4>           
                                   <h5>{user.online === true ? <FaCircle /> : "" }</h5>
                                   </div>
                        <h6><b>{user.nickname}</b></h6>
                                   <h6><IoPersonOutline /> {user.type}</h6>
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

export { Radar2 }