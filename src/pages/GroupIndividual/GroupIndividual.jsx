import { ToolbarLeftSlim } from '../../components/ToolBarLeftSlim/ToolbarLeftSlim'
import { TopBar } from '../../components/TopBar/TopBar'
import {FiHome, FiMoreVertical, FiUser} from 'react-icons/fi'
import './groupIndividual.css'

import { useEffect, useState, useContext } from "react"
import { AuthContext } from "../../contexts/Auth"
import api from '../../services/api'
import { ChatSlim } from '../../components/ChatSlim/ChatSlim'
import { useParams } from 'react-router-dom'
import { PostGroup } from '../../components/PostGroup/PostGroup'
import { FeedPostGroup } from '../../components/FeedPostGroup/FeedPostGroup'
import { BarBottomMenu } from '../../components/BarBottomMenu/BarBottomMenu'
import { PostTextGroup } from '../../components/PostTextGroup/PostTextGroup'


function GroupIndividual() {
  const {id} = useParams();
  console.log(id)

  const {inactivityTime} = useContext(AuthContext);

  inactivityTime()

  const [feed, setFeed] = useState("feed");
  const [friend, setFriend] = useState("");

  const [avatar, setAvatar] = useState();
    const [cover, setCover] = useState();
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [idGroup, setIdGroup] = useState();
    const [members, setMembers] = useState([])
    const [nickname, setNickname] = useState("");
    const [username, setUsername] = useState("");
    const [avatarUser, setAvatarUser] = useState("");



  useEffect(() => {
    async function loadGroups(){
        await api.get(`/groups/${id}`).then((result) => {
            console.log(result.data[0]);
                setAvatar(result.data[0].avatar);
                setCover(result.data[0].cover);
                setName(result.data[0].name);
                setDescription(result.data[0].description);
                setIdGroup(result.data[0].id);
                setUsername(result.data[0].username);
                setNickname(result.data[0].nickname);
                setAvatarUser(result.data[0].avatarUser);
        })
    }

    async function loadMembers(){
      const idGroup = id
      await api.get(`/members/${idGroup}`).then((result) => {
          console.log(result.data);
          setMembers(result.data)

      })
  }

  loadMembers()
    loadGroups()
}, [id, ]);


     function handleFeed() {
        setFeed("feed")
        setFriend("")

    }
    function handleMembers() {
      setFeed("")
      setFriend("friend")

    }
  
const member = members.slice(0,6);
console.log(member)
   
  return (
      <div className="container">
    <div className="content-Group">
      <ToolbarLeftSlim />
      <BarBottomMenu />
      <div className="Group">
        <TopBar />
        <div className="main">
         <div className="section">
          <div className="cover">
  
              <img src={ cover} alt="" />
          </div>
            <div className="Group-tool">
                <div className="user">
                 <div className="user-img">
                   <img src={avatar} alt="" />
                   </div>
                  <h4> <b>{name}</b></h4>
                </div>
                <div className="tools">
                  <button className={feed === "" ? "" : "select"} onClick={handleFeed}><FiHome size={16}/> Home</button>
                  <button className={friend === "" ? "" : "select"} onClick={handleMembers}><FiUser size={16}/> Membros</button>
                  <button  className='settings'><FiMoreVertical size={16}/></button>
                </div>
            </div>
          <div className="sections">
              <div className="infos">
              <div className="info">
              <div className="name">
                   <h3>Sobre o grupo</h3>
                   <div className='bar'></div>
                   <h5>{description}</h5>
                   <br />
                   <h3>Criado por</h3>
                   <div className='bar'></div>
                   <div className="creator">
                     <div className="image">
                       <img src={avatarUser} alt="" />
                     </div>
                     <h4>{nickname}</h4>
                     <h5>{username}</h5>
                   </div>
                   <br />
                   <h3>Membros</h3>
                   <div className='bar'></div>
                   <div className="imageMembers">
                   {member.map((avatar) => {
                      return (
                          <div className="image" key={avatar.id}>
                            <img src={avatar.avatar} alt=""/>
                          </div>
                          )
                        })}
                        </div>

            </div>
            </div>
            </div>
                     <div className="feed">
                  {feed === "feed" ?
                  <>
                    <PostTextGroup nameGroup={name} idGroup={idGroup}/>
                    <br /><br />
                    <FeedPostGroup idGroup={id} />
                  </>
                  :
                 
                  "Nada para mostrar"
                  
                }
                </div>

                  
                </div>
               
                    </div>
            </div>
         </div>
        </div>
      </div>

  )
}

export { GroupIndividual }