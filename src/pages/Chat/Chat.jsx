import { ChatSlim } from '../../components/ChatSlim/ChatSlim'
import { ToolbarLeftSlim } from '../../components/ToolBarLeftSlim/ToolbarLeftSlim'
import { TopBar } from '../../components/TopBar/TopBar'
import { DateFormatChat } from '../../components/DateFormatChat/DateFormatChat'
import './chat.css';
import { useState, useContext, useRef } from "react"
import { AuthContext } from "../../contexts/Auth"
import { Link, useParams } from 'react-router-dom'
import { socket } from '../../services/websocket'
import api from '../../services/api'
import { FiSend, FiPlus, FiVideo, FiImage } from 'react-icons/fi'
import { storage } from '../../services/firebaseConnection';
import { ref, getDownloadURL, uploadBytes} from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'
import {DeleteMessage} from '../../components/DeleteMessage/DeleteMessage'
import { BarBottomMenu } from '../../components/BarBottomMenu/BarBottomMenu';
import { useFetch } from '../../hooks/useFetch';
import { toast } from 'react-toastify';

   
function Chat() {
  const {room, idFriend} = useParams();
  const messageRef = useRef(null);


  const {inactivityTime, deleteConversation} = useContext(AuthContext);

  inactivityTime()
  
  const Local = localStorage.getItem("forpride");
  const user = JSON.parse(Local);

  console.log(`User: ${user.id}`)
  console.log(`Room: ${room}`)
  console.log(`IdFriend: ${idFriend}`)

  const [text, setText] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [imageAvatar, setImageAvatar] = useState('');
  const [videorUrl, setVideoUrl] = useState(null);
  const [videoAvatar, setVideoAvatar] = useState('');
  const [loadding, setLoadding] = useState(false);
  const [click, setClick] = useState(false);
  const [media, setMedia] = useState(false);

   const idRoom = room
  const {data} = useFetch(`/messages/${idRoom}`);

  socket.emit("select_room", {
    room,
    idAccount: user.id,
    idFriend: idFriend
  }, () => {

  })

  function handleFile(e) {
    console.log(e.target.files[0])

   if(e.target.files[0]){
       const image = e.target.files[0];

       if(image.type === 'image/jpeg' || image.type === 'image/jpg' || image.type === 'image/png') {
           setImageAvatar(image);
           setAvatarUrl(URL.createObjectURL(e.target.files[0]));
           console.log(avatarUrl);
           handleUploadAccount(image)
        } else {
            console.log('Tipo dearquivo não aceito. Envie uma imagem dos tipos: .jpg, .jpeg, .png');
            setImageAvatar(null);
            return null;
        }
    }


}
  function handleFileVideo(e) {
    console.log(e.target.files[0])

   if(e.target.files[0]){
       const video = e.target.files[0];

       if( 
          video.type === 'video/quicktime' || 
          video.type === 'video/mp4' || 
          video.type === 'video/MOV' || 
          video.type === 'video/wmv' || 
          video.type === 'video/flv' || 
          video.type === 'video/avi' || 
          video.type === 'video/avchd' || 
          video.type === 'video/webm' || 
          video.type === 'video/mkv' || 
          video.type === 'video/mpeg' || 
          video.type === 'video/mpeg4' || 
          video.type === 'video/mpeg-4' || 
          video.type === 'video/ogg' || 
          video.type === 'video/HEIF' || 
          video.type === 'video/HEVC'
          ) {
           setVideoAvatar(video);
           setVideoUrl(URL.createObjectURL(e.target.files[0]));
           console.log(videorUrl);
           handleUploadAccountVideo(video)
        } else {
            console.log('Tipo dearquivo não aceito. Envie uma imagem dos tipos: .jpg, .jpeg, .png');
            setVideoAvatar(null);
            return null;
        }
    }


}

function NotificationMessage() {
  const text = `Seu amigo ${user.id}, enviou uma nova mensagem`
    const data = {idAccount: user.id, idFriend, text}
    console.log(data)
    api.post("/notificationsmessage", data).then((res) => {
      console.log("notificação enviada com sucesso!")
    })
}

async function handleUploadAccount(img) {
  toast.info("Enviando a foto, aguarde...")
  setLoadding(true);
  console.log(loadding);
  const uuid = uuidv4();

  console.log(imageAvatar)
  let newAvatarUrlFirebase = ref(storage, `images/image-chat/${uuid}`);
  let uploadAvatar = await uploadBytes(newAvatarUrlFirebase, img);
  let photoUrlAvatar = await getDownloadURL(uploadAvatar.ref);
      
  console.log(uploadAvatar.ref.name, photoUrlAvatar);

  
  const data = {
    id: uuidv4(),
    room: room,
    idAccount: user.id,
    type: "photo",
    text,
    link: photoUrlAvatar,
    avatar: user.avatar,
    nickname: user.nickname,
    username: user.username,
    created_at: new Date()
  }
  console.log(data);


   socket.emit("message", data)
    setText("");
    setAvatarUrl(null);
    setImageAvatar('');
}

async function handleUploadAccountVideo(img) {
  toast.info("Enviando o video, aguarde...")
  setLoadding(true);
  console.log(loadding);
  const uuid = uuidv4();

  console.log(videoAvatar)
  let newAvatarUrlFirebase = ref(storage, `videos/video-chat/${uuid}`);
  let uploadAvatar = await uploadBytes(newAvatarUrlFirebase, img);
  let photoUrlAvatar = await getDownloadURL(uploadAvatar.ref);
      
  console.log(uploadAvatar.ref.name, photoUrlAvatar);

  
  const data = {
    id: uuidv4(),
    room: room,
    idAccount: user.id,
    type: "video",
    text,
    link: photoUrlAvatar,
    avatar: user.avatar,
    nickname: user.nickname,
    username: user.username,
    created_at: new Date()
  }
  console.log(data);


   socket.emit("message", data)

    setText("");
    setAvatarUrl(null);
    setVideoAvatar('');
}

  function handleNewMessage(e) {
    e.preventDefault();
;
    const data = {
      id: uuidv4(),
      room: room,
      idAccount: user.id,
      type: "text",
      text,
      link: "",
      avatar: user.avatar,
      nickname: user.nickname,
      username: user.username,
      created_at: new Date()
    }
    console.log(data);
    NotificationMessage()
    socket.emit("message", data)
    setText("")
  }
  
  socket.on("message", (data) => {
  })


function handlePressMessage() {
  if(click === false) {
    setClick(true)
    console.log(click)
  } else {
    setClick(false)
    console.log(click)
  }
}

function handleMedia() {
    if(media === false) {
      setMedia(true)
    } else {
      setMedia(false)
    }
}

function handleDeleteMessage(e) {
  e.preventDefault()
  const deletar = window.confirm("Deseja realmente deletar sua conta?");
  if(deletar === true) {
    deleteConversation(room)
  } 
}


  return (
    <div className="content">
      <ToolbarLeftSlim />
      {/* <BarBottomMenu /> */}
      <div className="chat">
        <TopBar />
        <div className="main-chat">
         <div className="section-chat">
             <div className="messages" ref={messageRef}>

               {data?.map((message) => {
                 return (
                  message.idAccount === user.id ?
                  <div className={message.idAccount === user.id ? "messages2" : "messages1"} key={message.id} >
                  <div className={message.idAccount === user.id ? "my-message" : "message-friend"} onClick={handlePressMessage}>
                  
                       <div className="data">
                       <Link to={message.idAccount === user.id ? `/profile` : `/profile-friend/${message.idAccount}`}>
                        <p>Eu - {message.idAccount}</p>
                        </Link>
                       <h5>{message.text}</h5>
                     {message.link !== "" ?
                     message.type === "photo" ?
                       <div className="image">
                            <img src={message.link} alt="" />
                      </div>
                      :
                       <div className="video-chat">
                              <video playsInline controls controlsList="nofullscreen nodownload">
                                <source playsInline src={message.link} type="video/mp4"/>
                                <source playsInline src={message.link} type="video/quicktime"/>
                                <source playsInline src={message.link} type="video/mov"/>
                                <source playsInline src={message.link}  type="video/ogg"/>
                                <source playsInline src={message.link}  type="video/webm"/>
                                <source playsInline src={message.link}  type="video/avi"/>
                              </video>
                      </div>
                      : ""}
                     <div className="date">
                     <DateFormatChat date={message.created_at} />
                       </div> 
                       {
                        click === false ? "" :
                    message.idAccount === user.id ? <DeleteMessage id={message.id} /> : ""
                       }
                       </div>
                       <div className="avatar">                     
                       <Link to={message.idAccount === user.id ? `/profile` : `/profile-friend/${message.idAccount}`}>             
                      <img src={message.avatar} alt="" />
                      </Link>  
                    </div>
                  </div>
                   </div>
                  :
                  <div className="messages1" key={message.id}>
                  <div className="message-friend">
                  <div className="avatar">     
                  <Link to={message.idAccount === user.id ? `/profile` : `/profile-friend/${message.idAccount}`}>             
                      <img src={message.avatar} alt="" />
                      </Link>   
                    </div>
                       <div className="data">
                       <Link to={message.idAccount === user.id ? `/profile` : `/profile-friend/${message.idAccount}`}>
                        <p>{message.nickname}</p>
                       </Link>
                       <h5>{message.text}</h5>
                     {message.link !== "" ?
                       message.type === "photo" ?
                       <div className="image">
                            <img src={message.link} alt="" />
                      </div>
                      :
                       <div className="video-chat">
                              <video playsInline controls controlsList="nofullscreen nodownload">
                                <source playsInline src={message.link} type="video/mp4"/>
                                <source playsInline src={message.link} type="video/quicktime"/>
                                <source playsInline src={message.link} type="video/mov"/>
                                <source playsInline src={message.link}  type="video/ogg"/>
                                <source playsInline src={message.link}  type="video/webm"/>
                                <source playsInline src={message.link}  type="video/avi"/>
                              </video>
                      </div>
                      : ""}
                                          <div className="date">
                                          <DateFormatChat date={message.created_at} />
                                            </div> 
                                            {
                        click === false ? "" :
                    message.idAccount === user.id ? <DeleteMessage id={message.id} /> : ""
                       }
                       </div>
                  </div>
                   </div>
                 
                 )
               })}

            </div>
            <div className="text">
              <div className="buttonMedia">
                <button className="button-media" onClick={handleMedia}><FiPlus /></button>
              </div>

               {media === false ? "" : 
               <>
              <label className="label-avatar">
                  <span><FiImage size={20} /></span>
                  <input type="file" accept="image/*" onChange={handleFile}/><br />                     
              </label>

              <label className="label-avatar">
                  <span><FiVideo size={20} /></span>
                  <input type="file" accept="video/*" onChange={handleFileVideo}/><br />                     
              </label>
              </>
              }

              {media === true ? "" :
                <textarea value={text} autoFocus  autoComplete='off' placeholder='Digite uma mensagem' onChange={(e) => setText(e.target.value)}></textarea>
              }
                <button className="button1" onClick={handleNewMessage} disabled={text === "" ? "disabled" : ""}>Enviar <FiSend /></button>
                <button className="button2" onClick={handleNewMessage} disabled={text === "" ? "disabled" : ""}><FiSend /></button>
                {media === false ? "" : 
                <button className="button3" onClick={handleDeleteMessage}>Deletar Conversa</button>
               }
            </div>
            <br />

         </div>
        </div>
      </div>
    </div>
  )
}

export { Chat }