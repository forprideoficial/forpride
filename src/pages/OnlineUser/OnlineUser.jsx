import './onlineUser.css'
import logo from '../../assets/images/logo.png';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/Auth';
import { FaCircle } from 'react-icons/fa';
import { IoLogOutOutline, IoNewspaperOutline} from 'react-icons/io5';
import { useState } from 'react';
import apiGoogleReverse from '../../services/apiGoogleReverse';
import api from '../../services/api';
import { socket } from '../../services/websocket';
import { toast } from 'react-toastify';

function OnlineUser() {
    const Local = localStorage.getItem("forpride");
    const user = JSON.parse(Local);
    const {logout} = useContext(AuthContext);
    
    const [invisible, setInvisible] = useState(false);
    const [plane, setPlane] = useState("");
    const [emoji, setEmoji] = useState("");
    const [song, setSong] = useState("");
    const [city, setCity] = useState("");
    const [uf, setUf] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    useEffect(() => {
        async function onlineUserUnic() {
            const res = await api.get(`/online/one/${user.id}`)
                
            if(res.data.length > 0) {
                window.open("/feed","_self");
                return
            }
        }

        onlineUserUnic() 
    },[user.id])


    useEffect(() => {
        function getLocation() {
            return window.navigator.geolocation.getCurrentPosition(success, error);
             }
  
        function success(position) {
            const lat1  = position.coords.latitude;
            const long1 = position.coords.longitude;
        
            setLatitude(lat1);
            setLongitude(long1);
            console.log("lat1");
            console.log(lat1);
            console.log("long1");
            console.log(long1);
            
            reverseGeolocalization(lat1, long1)
          }

          async function reverseGeolocalization(lat, long) {
        const address = await apiGoogleReverse.get(`json?latlng=${lat},${long}&key=AIzaSyCZllXD0czNd_oeF0u_o9LUVJ2bCd1K4p8`);
        console.log(address.data.results[0].address_components[3].long_name)
        setCity(address.data.results[0].address_components[3].long_name)
        setUf(address.data.results[0].address_components[4].short_name) 
     }

              
      function error() {
        console.log('Unable to retrieve your location');
      }
  
          getLocation()
    },)
  

    function Tologout(e) {
        e.preventDefault();
        logout(user.id)
    }

    function handleSelectVisible() {
        if(invisible === true) {
            setInvisible(false);
        } else {
            setInvisible(true); 
        }
    }
    function handleSelectEmojiPlane() {
            setPlane("viagem");  
            setEmoji("");  
            setSong("");  
    }
    function handleSelectEmojiSexo() {
        setPlane("");  
        setEmoji("emoji");  
        setSong(""); 
    }
    function handleSelectEmojiParty() {
        setPlane("");  
        setEmoji("");  
        setSong("musica"); 
    }
    function handleSelectEmpty() {
        setPlane("");  
        setEmoji("");  
        setSong(""); 
    }


    async function handleUserOnline(e) {
        e.preventDefault();
        if(invisible === false && latitude === "") {
            toast.info("Prof favor. Ative sua localização.");
            return
        }
        console.log({idAccount: user.id, username:user.username, type: user.sex, sexualOption:user.sexualOption, nickname:user.nickname, avatar:user.avatar,
                    relationship:user.relationship, lat: latitude.toString(), long: longitude.toString(),
                     city: city, uf: uf, actualCity: "", actualUf: "", equalCity: "", plane, emoji, song, invisible})
        const data = ({idAccount: user.id, username:user.username, type: user.sex, sexualOption:user.sexualOption, nickname:user.nickname, avatar:user.avatar,
                    relationship:user.relationship, lat: latitude.toString(), long: longitude.toString(),
                     city: city, uf: uf, actualCity: "", actualUf: "", equalCity: "", plane, emoji, song, invisible})

                     socket.on("connection", () => {
                        console.log("Conexão estabelecida")
                    })
                     await api.post("/online", data).then(() => {
                        window.open("/feed", "_self")
                    })

    }


    return (
        <div className="content-OnlineUser">
            <div className="OnlineUser">
                <div className="title">
                <br />
                    <img src={logo} alt="" />
                    <br />
                    <h3>Olá {user.nickname === null || user.nickname === undefined ? user.username : user.nickname}</h3>
                    <br />
                    <br />
                    <h4>Como você deseja entrar hoje?</h4>
                    <h4><FaCircle color={invisible === false ? "green":"gray"}/></h4>
                    <select value={invisible} onChange={handleSelectVisible}>
                        <option value="false">Disponível (Online) </option>
                        <option value="true">Indisponível (Offline) </option>
                    </select>
                    <br />
                    <br />
                    <h4>Deseja escolher um status?</h4>
                    <div className="buttons">
                <button className={plane !== ""  ? "select" : ""} onClick={handleSelectEmojiPlane}>Quero Conversar 💬</button>
                <button className={emoji !== ""  ? "select" : ""}  onClick={handleSelectEmojiSexo}>Quero Maldade 😈</button>
                <button className={song !== ""  ? "select" : ""}  onClick={handleSelectEmojiParty}>Partiu Balada 🎶</button>
                <button className={song === "" && emoji === "" && plane === "" ? "select" : ""}  onClick={handleSelectEmpty}>Nenhum</button>
                    </div>
                     </div> 
                    <br />
                    <br />
                <br />
                    <br />
                    <div className="buttons2">
                <button className="feed" onClick={handleUserOnline}><IoNewspaperOutline/> Feed </button>
                <button onClick={Tologout}><IoLogOutOutline/> Sair </button>
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
            </div>
        </div>
    )
}

export {OnlineUser}