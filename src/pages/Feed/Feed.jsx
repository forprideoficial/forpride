import { Post } from "../../components/Post/Post"
import { FeedPost } from "../../components/FeedPost/FeedPost"
import { ToolbarLeftSlim } from "../../components/ToolBarLeftSlim/ToolbarLeftSlim"
import { ChatSlim } from "../../components/ChatSlim/ChatSlim"
import { TopBar } from "../../components/TopBar/TopBar"
import './feed.css';
import { useCallback, useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/Auth"
import { BarBottomMenu } from "../../components/BarBottomMenu/BarBottomMenu"
import { ListEventsFeed } from "../../components/ListEventsFeed/ListEventsFeed"
import { useNavigate } from 'react-router-dom';
import api from "../../services/api"
import {FiArrowUpCircle} from 'react-icons/fi'
import { PostFeed } from "../../components/PostFeed/PostFeed"
import { ListGroupsUnic } from "../../components/ListGroups/ListGroups"
import { ListEventsUnic } from "../../components/ListEvents/ListEvents"
import { PostFeed2 } from "../../components/PostFeed2/PostFeed2"
import { toast } from "react-toastify"


function Feed() {
    const Local = localStorage.getItem("forpride");
    const user = JSON.parse(Local);
  
    const id = user.id
    const [myInformations, setMyInformations] = useState(false)
    const navigate = useNavigate();
    const {inactivityTime, logout, socketDataLocation, verityTimesPeiodTest} = useContext(AuthContext);

           inactivityTime();
           useEffect(() => {

            async function loadUsersOnline() {

                if(user.status === "pending") {
                    logout(user.id)
                    return
                }
                if(user.status === "blocked") {
                    logout(user.id)
                    return
                }

                // if(user.status === "suspense") {
                //     window.open("/activeplain","_self");
                //     return
                // }

                const res = await api.get(`/online/one/${user.id}`)
                 
               if(res.data.length > 0) {
                console.log("Usuário ja está online")
                return
              }
                 console.log("Cadastrando usuário")
                 socketDataLocation()
            }
 
               loadUsersOnline()
           }, [navigate, socketDataLocation, user.status, user.id]);


           useEffect(() => {
            async function searchAccount() {
              const res =  await api.get(`accounts/filter/${id}`);
                console.log(res.data)
                if(res.data === "" || res.data === undefined || res.data.length === 0 ) {
                    logout(id)
                } else if(res.data[0].status === "blocked") {
                    logout(id)
                } else{
                    console.log("Conta encontrada")
                } 
            }


            searchAccount()
           }, []);



           if(user.status === "Aproved") {
            console.log("olá, mundo")
            verufy(user.id)
           }

           async function verufy(id) {
            const paymentUser = await api.get(`/payments/${id}`)
            const periodTest = await api.get(`/periodtest/${id}`)

            if(paymentUser.data.length === 0 && periodTest.data.length === 0) {
                toast.error("deslogando...")
                logout(id);
                return;
            }

            if(paymentUser.data.length > 0) {
                toast.error("deslogando...")
                logout(id);
                return;
            }

            if(periodTest.data.length > 0) {
                verityTimesPeiodTest(user.id);
                return;
            }
           }

           
           const loadDateReadFeed = useCallback(async () => {
                     const idAccount = user.id
                     await api.get(`/datereadlogin/${idAccount}`)
                     .then( async (res) => {
                         if(res.data.length !== 0) {
                            const id = res.data[0].id
                            const data = {
                                DateReadLogin: new Date()
                            }
                    
                        await api.patch(`/datereadlogin/${id}`, data).then((res) => {
                            console.log("Data inicial alterada com sucesso!");
                            }).catch(error => {
                            console.log("Erro ao buscar dados" + error)
                        })
                             return;
                         } else {
                             const data = {
                                 idAccount: user.id,
                                 DateReadLogin: new Date() 
                             }
                             await api.post(`/datereadlogin`, data).then(() => {
                                 console.log("Data inicial definida com sucesso!")
                                 return;
                             }).catch(error => {
                         console.log("Erro ao buscar dados" + error)
                     })
                         }
                     }).catch(error => {
                         console.log("Erro ao buscar dados" + error)
                     })
                 
                 }, [user.id]) 
        
            useEffect(() => {
                loadDateReadFeed()
            }, [loadDateReadFeed ]);


           function handleTop(e) {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
        }


return (
        <div className="container">
            <div className="content">
                <div className="main">
                <TopBar />
                <div className="aside">
                    <div className="feed">
                    {/* <ListEventsFeed /> */}
                 <button className="topScroll" onClick={handleTop}><FiArrowUpCircle /></button>
                   {/* {myInformations === false ? "" : <Post />} */}
                    <ChatSlim />
                    {user.status === "essencial" || user.status === "suspense" ? 
                    <PostFeed2 />
                    :
                    <PostFeed />
                    }
                    <FeedPost /> 
                    </div>
                    <div className="blocksFeed">
                        <h3>Próximo Evento</h3>
                        <ListEventsUnic />
                        <br />
                        <h3>Grupo mais recente</h3>
                            <ListGroupsUnic />
                    </div>
                    </div>
                 <ToolbarLeftSlim />
                 <BarBottomMenu />
                 </div>
            </div>
        </div>
    )
}

export { Feed }