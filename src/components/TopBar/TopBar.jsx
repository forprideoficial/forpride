import logoFoursomemini from '../../assets/images/logo.png';
import logoFoursome from '../../assets/images/logosimples.png';
import { IoMailOutline, IoLogOutOutline, IoMail} from 'react-icons/io5';
import './topBar.css';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/Auth';
import ReactTooltip from 'react-tooltip';


import { SearchUsers } from '../ButtonsTopBar/SearchUsers/SearchUsers';
import { SolicitationsFriend } from '../ButtonsTopBar/SolicitationsFriend/SolicitationsFriend';
import { Notifications } from '../ButtonsTopBar/Notifications/Notifications';
import { MyMessages } from '../ButtonsTopBar/MyMessages/MyMessages';

function TopBar() {
    const {logout} = useContext(AuthContext);
    const Local = localStorage.getItem("forpride");
    const user = JSON.parse(Local);

    const avatarImg = "https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240"

    function Tologout(e) {
        e.preventDefault();
        logout(user.id)
    }



     return (
        <div className="topBar">
            <div className="logo">
                <a href="/feed">
                <img src={logoFoursome} alt="" />
                </a>
            </div>
            <div className="logo2">
                  <a href="/feed">
                <img src={logoFoursomemini} alt="" />
                </a>
            </div>

            <SearchUsers />
  
            <div className="links">


                <SolicitationsFriend />
                <Notifications /> 


                <a href={user.status === "suspense" ? `/activeplain`:`/invite`}>
                <div className="linkSelect" data-tip data-for='Convidar'>
                    <IoMail />
                </div>
                </ a>
                <ReactTooltip id='Convidar' place="bottom" type="dark" effect="solid">
                     <span>Convidar</span>
                </ReactTooltip>



                <MyMessages />


                <div className="link" data-tip data-for='Sair'>
                    <IoLogOutOutline onClick={Tologout} />
                </div>

                <div className="account">
                    <a href="/profile">
                        <div className="avatar">
                    <img src={user !== null ? user.avatar : avatarImg} alt="" />
                    </div>
                    </a>
                    <a href="/profile">
                    <h4>@{user !== null ? user.username : "Usuário não encontrado"}</h4>
                    </a>
                </div>
                
            </div>
           

        </div>


    )
}

export {TopBar}