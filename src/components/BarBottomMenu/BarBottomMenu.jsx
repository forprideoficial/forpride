import { useState, memo } from "react";
import { IoCalendarOutline, IoList, IoRadio,IoMailUnreadOutline, IoPersonOutline, IoCashOutline, IoSettingsOutline, IoPeopleOutline, IoMenuOutline, IoCameraOutline, IoArrowBackOutline,
    IoInformationCircleOutline, IoChatbubblesOutline, IoMailOutline, IoNewspaperOutline, IoBusinessOutline, IoMailOpenOutline, IoStatsChartOutline, IoCloseOutline } from "react-icons/io5"
import { useFetch } from "../../hooks/useFetch";
import { ButtonFeed } from "../ButtonsTollBar/ButtonFeed/ButtonFeed";
import './barBottomMenu.css'
import Modal from 'react-modal';
import { Post } from "../Post/Post";
import { Post2 } from "../Post2/Post2";

function BarBottomMenuComponenet() {
    const Local = localStorage.getItem("forpride");
    const userData = JSON.parse(Local);
    const [select, setSelect] = useState(false);
    const [isOpenModalPost, setIsOpenModalPost] = useState(false);



    const profile = "https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240"
const {data} = useFetch(`/online`);

    function handleOpenUsersOnline (e) {
        e.preventDefault()
       setSelect(true)
    }
    function handleOpenBar (e) {
        e.preventDefault()
       setSelect(false)
    }

    function handleOpenModalPost() {
        if(userData.status === "suspense") {
            window.open("/activeplain","_self");
            return
        }

        setIsOpenModalPost(true)
      }
    function handlePosts() {
        handleOpenModalPost();
      }
    
      function handleCloseModalPost() {
        setIsOpenModalPost(false)
      }


    Modal.setAppElement('#root');
    

    return (
        <div className="BarBottom">
            <div className="BarBottomBlock">
                  <div className="Buttons">

                  <ButtonFeed />
                    <div className="selectRemove2">
                
                    </div>
                {/* <a href="/invite" >
                 <button className="ButtonsUnicSelect" >
                        <IoMailOutline size={20}/>Convite
                    </button>
                    </a> */}
                    <div className="selectRemove">
                    <a href={userData.status === "suspense" ? `/activeplain`:`/invitelist`}>
                    <button className="ButtonsUnic" >
                        <IoMailOpenOutline size={20}/>
                       Enviados
                    </button>
                    </a>
                    </div>
                    
                    <a href="/profile" >
                    <button className="ButtonsUnic" >
                        <IoPersonOutline size={20}/>Perfil
                    </button>
                    </a>

                 <button className="ButtonsUnicBig" onClick={handleOpenModalPost}>
                        <IoCameraOutline size={20}/>Postar
                    </button>

                    <div className="selectRemove2">         
  
                    </div>
                    
                    <a href={userData.status === "suspense" ? `/activeplain`:`/recados`} >
                    <button className="ButtonsUnic" >
                        <IoMailUnreadOutline size={20}/>
                       Recados
                    </button>
                    </a>

                  
                    {/* <a href="/radar" >
                    <button className="ButtonsUnic" >
                        <IoRadio size={20}/>
                       Radar
                    </button>
                    </a>  */}
                     <a href={userData.status === "suspense" ? `/activeplain`:`/menu`}>
                    <button className="ButtonsUnic" >
                        <IoMenuOutline size={20}/>
                       Menu
                    </button>
                    </a>

                    <div className="selectRemove">
                    <a href={userData.status === "suspense" ? `/activeplain`:`/ranking`}>
                    <button className="ButtonsUnic" >
                        <IoStatsChartOutline size={20}/>
                       Ranking
                    </button>
                    </a>
                    </div>
                    {/*
                    <a href="/events" >
                    <button className="ButtonsUnic" >
                        <IoCalendarOutline size={20}/>
                       Eventos
                    </button>
                    </a>

                    <a href="/groups" >
                    <button className="ButtonsUnic" >
                        <IoPeopleOutline size={20}/>
                       Grupos
                    </button>
                    </a>

                    <a href="/foruns" >
                    <button className="ButtonsUnic" >
                        <IoList size={20}/>
                       Fóruns
                    </button>
                    </a> */}



                    {/* <a href="/locals" >
                    <button className="ButtonsUnic" >
                        <IoBusinessOutline size={20}/>Locais
                    </button>
                    </a> */}
                    {/* <a href="/settings" >
                    <button className="ButtonsUnic" >
                        <IoSettingsOutline size={20}/>Configs
                    </button>
                    </a> */}
                    {/* <a href="/plains" >
                    <button className="ButtonsUnic" >
                        <IoCashOutline size={20}/>Planos
                    </button>
                    </a> */}
                    {/* <a href="/infos" >
                    <button className="ButtonsUnic" >
                        <IoInformationCircleOutline size={20}/>Infos
                    </button>
                    </a> */}
                </div>

            </div>

                           {/* Modal Posts  */}
                           <Modal isOpen={isOpenModalPost} onRequestClose={handleCloseModalPost}
            overlayClassName="react-modal-overlay"
            className="react-modal-content">
            <button type="button" className="react-modal-button" onClick={handleCloseModalPost}>
            <IoCloseOutline /> 
            </button>
            <div className="content-modal">
            <div className="itensModalPost">
                {userData.status === "essencial" || userData.status === "suspense" ?
           <Post2 />
           :
           <Post />
                }
            </div>
            </div>
            </Modal>
            {/* FIM Modal Posts  */}

        </div>
    )
}

export const BarBottomMenu = memo(BarBottomMenuComponenet)