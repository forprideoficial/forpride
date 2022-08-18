
import './chatSlim.css'
import { FaCircle } from 'react-icons/fa'
import { useFetch } from '../../hooks/useFetch';

function ChatSlim() {
    const Local = localStorage.getItem("forpride");
    const userData = JSON.parse(Local);

const {data} = useFetch(`/online`);

const online = data?.slice(0,20);
     
    return (
        <div className="content-chat">
            {/* <div className="list">
            {data?.map((user) => {
                return (
                    user.idAccount === userData.id ? "" :
                    <div className="chat-avatar" key={user.idAccount}>
                        <FaCircle />
                        <a href={user.idAccount === userData.id ? `/profile` : `/profile-friend/${user.idAccount}`}>
                        <img 
                        src={user.avatar}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // previne loop
                            currentTarget.src="https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240";
                        }}
                        />
                    </a>
                     </div>
                )
            })}
            </div> */}
                <div className="online">
                    <div className="text">
                    <h5><b>Online agora: </b></h5>
                    <h6><b> {data?.length}</b></h6>
                    </div>
                    <div className="text2">
                    <h5> <a href="/radar"> Ver no radar</a></h5>
                    </div>
                </div>
            <div className="list2">
            {online?.map((user) => {
                return (
                    user.idAccount === userData.id ? "" :
                    <div className="chat-avatar" key={user.idAccount}>
                        <a href={user.idAccount === userData.id ? `/profile` : `/profile-friend/${user.idAccount}`}>
                        <img 
                        src={user.avatar}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // previne loop
                            currentTarget.src="https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240";
                        }}
                        />
                    </a>
                     </div>
                )
            })}
            </div>
        </div>
    )
}

export {ChatSlim}