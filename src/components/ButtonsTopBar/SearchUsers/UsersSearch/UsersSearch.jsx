import { Link } from "react-router-dom";
import './usersSearch.css'


function UsersSearch({id, nickname, avatar, uf}) {
    const Local = localStorage.getItem("forpride");
    const userData = JSON.parse(Local);

    const profile = "https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240"

    return (
       <div className="item-search" key={id}>
           <div className="image">
           <Link to={userData.id === id ? `/profile` : `/profile-friend/${id}`}>
           {avatar === "" || avatar === undefined ? 
                                                <img 
                                                src={profile}
                                                onError={({ currentTarget }) => {
                                                    currentTarget.onerror = null; // previne loop
                                                    currentTarget.src="https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240";
                                                }}
                                                />
                        :
                        <img 
                        src={avatar}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // previne loop
                            currentTarget.src="https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240";
                        }}
                        />
                        }
           </Link>
           </div>
           <div className="name">
             <Link to={userData.id === id ? `/profile` : `/profile-friend/${id}`}>
             {nickname === "" || nickname === undefined ?
         <h4>Usuário deletado</h4>
        :
        <h4>{nickname} - {uf}</h4> }
           </Link>
           </div>
       </div>
    ) 
}


export { UsersSearch }