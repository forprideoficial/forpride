import { ToolbarLeftSlim } from '../../components/ToolBarLeftSlim/ToolbarLeftSlim'
import { TopBar } from '../../components/TopBar/TopBar'
import {FiHome, FiImage, FiVideo, FiUser, FiHeart} from 'react-icons/fi'
import {IoShieldCheckmark} from 'react-icons/io5'
// import './profile.css'
import { Post } from '../../components/Post/Post'
import { Photos } from '../../components/Photos/Photos'
import { Video } from '../../components/Video/Video'
import { ListFriends } from '../../components/ListFriends/ListFriends'
import {useEffect, useState } from 'react'
import api from '../../services/api'
import { FeedPostIndividual } from '../../components/FeedPostIndividual/FeedPostIndividual'
import { InformationsUser } from '../../components/InformationsUser/InformationsUser'
import { ListFollowing } from '../../components/ListFollowing/ListFollowing'
import { ListFollowers } from '../../components/ListFollowers/ListFollowers'
import { BarBottomMenu } from '../../components/BarBottomMenu/BarBottomMenu'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/Auth'
import { PostFeed2 } from '../../components/PostFeed2/PostFeed2'
import { PostFeed } from '../../components/PostFeed/PostFeed'
import { FaCrown } from 'react-icons/fa'


function Profile() {
  const Local = localStorage.getItem("forpride");
  const user = JSON.parse(Local);

  const {deleteAccount, inactivityTime, verityTimesPeiodTest, logout } = useContext(AuthContext);

  inactivityTime()


  
  const coverImg = "https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/capa%20foursome2.png?alt=media&token=6124db20-1954-47d4-9444-73b3fee41ce0"
  const avatar = "https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240"
  
  const [feed, setFeed] = useState("feed");
  const [friend, setFriend] = useState("");
  const [photo, setPhoto] = useState("");
  const [video, setVideo] = useState("");
  const [group, setGroup] = useState("");
  const [forum, setForum] = useState("");
  const [myFriends, setMyFriends] = useState([]);
  const [myFollowers, setMyFollowers] = useState([]);
  const [friends, setFriends] = useState("friends");
  const [following, setFollowing] = useState("following");
  const [followers, setFollowers] = useState("");
  const [width, setWidth] = useState("")
  const [myInformations, setMyInformations] = useState(false)
  const id = user.id

  useEffect(() => {
      async function searchAccount() {
        const res =  await api.get(`accounts/filter/${id}`);
          console.log(res.data)
          if(res.data === "" || res.data === undefined || res.data.length === 0 ) {
              logout(id)
          } else {
              console.log("Conta encontrada")
              setMyInformations(true)
          } 
      }

      searchAccount()
     }, []);

useEffect(() => {
  function widthView() {
    //resolução navegador
console.log(window.screen.width+'x'+window.screen.height);

//resolução 'real' navegador
setWidth((window.innerWidth > 0) ? window.innerWidth : window.screen.width);
}

widthView()
},[])

      useEffect(() => {
      async function loadFriends() {
        const idAccount = user.id;
        const result = await api.get(`/friends/${idAccount}`);
       setMyFriends(result.data)
      }

      loadFriends()

    }, [user.id]);


      useEffect(() => {
      async function loadFollowers() {
        const idAccount = user.id;
        const result = await api.get(`/followers/filter/${idAccount}`);
          setMyFollowers(result.data)
      }

      loadFollowers()

    }, [user.id]);



    if(user.status === "test") {
      console.log("olá, mundo")
      verityTimesPeiodTest(user.id);
     }

      function handleDeleteAccount(e) {
        e.preventDefault()
        const deletar = window.confirm("Deseja realmente deletar sua conta?");
        if(deletar === true) {
        deleteAccount(user.id)
        } 

      }

     function handleFeed() {
        setFeed("feed")
        setFriend("")
        setPhoto("")
        setVideo("")
        setGroup("")
        setForum("")

    }

    function handleFriend() {
      setFeed("")
      setFriend("friend")
      setPhoto("")
      setVideo("")
      setGroup("")
      setForum("")
    }

    function handlePhoto() {
      setFeed("")
      setFriend("")
      setPhoto("photo")
      setVideo("")
      setGroup("")
      setForum("")
    }

    function handleVideo() {
      setFeed("")
      setFriend("")
      setPhoto("")
      setVideo("video")
      setGroup("")
      setForum("")
    }

    function handleForum() {
      setFeed("")
      setFriend("")
      setPhoto("")
      setVideo("")
      setGroup("")
      setForum("forum")
    }

    function handleFriends() {
      setFriends("friends");
    }

    function handleFollowing() {
      setFollowing("following");
      setFollowers("");
    }

    function handleFollowers() {
      setFollowing("");
      setFollowers("followers");
    }



    const friendAproveds = myFriends.filter(friend => (friend.status === 'aproved'))
    const followersMy = myFollowers.filter(friend => (friend.idFriend === user.id))
    const followingMy = myFollowers.filter(friend => (friend.idAccount === user.id))




  return (
      <div className="container">
    <div className="content-profile">
      <ToolbarLeftSlim />
      <BarBottomMenu />
      {myInformations === false ? "" :
      <div className="profile">
        <TopBar />
        <div className="main">
         <div className="section">
          <div className="cover">
          <img 
                        src={user.cover}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // previne loop
                            currentTarget.src={coverImg};
                        }}
                        />
          </div>
            <div className="profile-tool">
                <div className="user">
                 <div className="user-img">
                   <img 
                        src={user.avatar}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // previne loop
                            currentTarget.src="https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240";
                        }}
                        />
                   </div>
                    <h3> {user.status === "premium" || user.status === "lifetime" ? <FaCrown /> : ""} <b>{user !== null ? `${user.nickname} ${user.país === "Brasil" ? "🇧🇷" : user.país === "Portugal" ? "🇵🇹" : ""} ` :"User Test"}</b>{user.role !== "Membro" ? <IoShieldCheckmark />: ""}</h3>
                     </div>
                <div className="tools">
                  <button className={feed === "" ? "" : "select"} onClick={handleFeed}><FiHome size={16}/> Home</button>
                  <button className={friend === "" ? "" : "select"} onClick={handleFriend}><FiUser size={16}/> Amigos</button>
                  <button className={forum === "" ? "" : "select"} onClick={handleForum}><FiHeart size={16}/> Seguir</button>
                  <button className={photo === "" ? "" : "select"} onClick={handlePhoto}><FiImage size={16}/> Fotos</button>
                  <button className={video === "" ? "" : "select"} onClick={handleVideo}><FiVideo size={16}/> Vídeos</button>
                  <button  className='deleteAccount' onClick={handleDeleteAccount}> Deletar Conta</button>
                </div>


            </div>
          <div className="sections">
                   {width <= 900 && feed !== "feed" ? "":
                   <InformationsUser />
          }
                     <div className="feed">
                  {feed === "feed" ?
                  <>
                                      {user.status === "essencial" || user.status === "suspense" ? 
                    <PostFeed2 />
                    :
                    <PostFeed />
                    }
                    <FeedPostIndividual idAccount={user.id} />
                  </>
                  :
                  friend === "friend" ?
                  <div className="friends">
                  <div className="buttonsFriends">
                    {/* <button className={friends === "" ? "" : "select"} onClick={handleFriends}>Amigos</button> */}
                  </div> 


                  <div className="listFriendsMap">
                  {friends === "friends" ?
                  friendAproveds.map((friends) => {
                    return (
                      <ListFriends id={friends.idFriend === user.id ? friends.idAccount : friends.idFriend} idRegister={friends.id}/>
                      )
                    })
                  :
                  "Nada para mostrar"
                  
                }
                </div>

                  
                </div>
                  :
                  photo === "photo" ?
                  <Photos idAccount={user.id} type={"post-photo"} />
                  :
                  video === "video" ?
                   <Video idAccount={user.id} type={"post-video"} />
                   :
                   group === "group" ?
                   "Nenhum grupo aqui"
                   :
                   forum === "forum" ?

                   <div className="friends">
                   <div className="buttonsFriends">
                     <button className={followers === "" ? "" : "select"} onClick={handleFollowers}>Seguidores</button>
                     <button className={following === "" ? "" : "select"} onClick={handleFollowing}>Seguindo</button>
                   </div> 
 
                   <div className="listFriendsMap">
                   {
                   following === "following" ?
                   followingMy.map((following) => {
                    return (
                      <ListFollowing idAccount={following.idAccou === user.id ? following.idAccount : following.idFriend} idRegister={following.id}/>
                    )
                  })
                  :
                  followers === "followers" ?
                    
                      followersMy.map((followers) => {
                        return (
                          <ListFollowers id={followers.idFriend === user.id ? followers.idAccount : followers.idFriend} />
            
                        )
                      })
                    
                   
                    : 
                   "Nada para mostrar"
                   
                 }
 </div>
                   
                 </div>
                  
                   :
                  ""
                  } 
                    </div>
            </div>
         </div>
        </div>
      </div>
      }
    </div>
    </div>
  )
}

export { Profile }