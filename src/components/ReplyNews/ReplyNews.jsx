import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { FiUpload } from 'react-icons/fi';
import { storage } from '../../services/firebaseConnection';
import { ref, getDownloadURL, uploadBytes} from 'firebase/storage';
import { toast } from "react-toastify";
import { v4 as uuidv4} from 'uuid'
import "./replyNews.css"
import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth";

function ReplyNews({id, reply}) {
    const Local = localStorage.getItem("forpride");
    const user = JSON.parse(Local);

    const {newReplyRecado} = useContext(AuthContext)

    console.log(id)

    const [text, setText] = useState("")
    const {data} = useFetch(`/newsreply/${id}`)
 
    const profile = "https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240"
    
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [imageAvatar, setImageAvatar] = useState(''); 


    if(data) {
        console.log(data)
    }

    async function handleFile(e) {
        console.log(e.target.files[0])
        
        if(e.target.files[0]){
            const image = e.target.files[0];
            
            if(image.type === 'image/jpeg' ||
            image.type === 'image/jpg' ||
            image.type === 'image/png'
            ) {
                setImageAvatar(image);
               setAvatarUrl(URL.createObjectURL(e.target.files[0]));
               console.log(avatarUrl);
               toast.success('Imagem carregada com sucesso. Publique sua postagem!');
            } else {
                console.log('Tipo dearquivo não aceito. Envie uma imagem dos tipos: .jpg, .jpeg, .png');
                setImageAvatar("");
                return null;
            }
        }
    }

    async function handleNewReply(e) {
        e.preventDefault();

        if(avatarUrl === null ) {
            handleReply("")
            return;
        }

       toast.info("Salvando as informações. Aguarde...")
                //Avatar
        const uuid = uuidv4();
  
        let newAvatarUrlFirebase = ref(storage, `images/avatar/${uuid}`);
        let uploadAvatar = await uploadBytes(newAvatarUrlFirebase, imageAvatar);
        let photoUrlAvatar = await getDownloadURL(uploadAvatar.ref);
            
        console.log(uploadAvatar.ref.name, photoUrlAvatar);
    
        handleReply(photoUrlAvatar)
  
    }
  

    function handleReply(media) {
        newReplyRecado({
           idNews: id,
            idAccount: user.id,
            text: text,
            link: media,
            username: user.username,
            nickname: user.nickname
        })
    }

    
    return (
        <div className="ReplyNews">

            {data?.map((replyNew) => {
                return (
                    <div className="replyNewsUnic" key={replyNew.id}>
                        <h5><b>{replyNew.nickname}</b></h5>
                        <h5>{replyNew.text}</h5>
                        
                        {replyNew.link === "" ? "" :
                        <img src={replyNew.link} alt={replyNew.title} />
                        }
                    </div>
                )
            })}


            <div className="reply">
                <textarea name="" id="" cols="30" rows="6" placeholder="Digite sua resposta" value={text} onChange={(e) => setText(e.target.value)}>  
                </textarea>
                <label className="label-avatar">
                            <span><FiUpload color="#f65" size={25} /></span>
                            <input type="file" accept="image/*" onChange={handleFile}/><br />
                            <img src={avatarUrl === null ? profile : avatarUrl} alt="Avatar" height={100} width={100}/>
                        </label>
            </div>
                <button onClick={handleNewReply}>Responder</button>

        </div>
    )
}

export {ReplyNews}