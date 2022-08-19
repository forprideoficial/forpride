import { FeedPostUnic } from "../../components/FeedPostUnic/FeedPostUnic"
import { ToolbarLeftSlim } from "../../components/ToolBarLeftSlim/ToolbarLeftSlim"
import { TopBar } from "../../components/TopBar/TopBar"
// import './postIndividual.css';
import { useContext, useEffect } from "react"
import { AuthContext } from "../../contexts/Auth"
import { BarBottomMenu } from "../../components/BarBottomMenu/BarBottomMenu"
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'


function PostIndividual() {
    const {id} = useParams();
    const Local = localStorage.getItem("forpride");
    const user = JSON.parse(Local);


    const navigate = useNavigate();
           const {inactivityTime} = useContext(AuthContext);

           inactivityTime()

           useEffect(() => {
               if(user.status === "blocked") {
                navigate("/profile");
               }
           }, [navigate, user.status])

return (
        <div className="container">
            <div className="content">
                <div className="main">
                <TopBar />
                <div className="aside">
                    <div className="PostIndividual">
                    <FeedPostUnic id={id}/> 
                    </div>
                </div>
                 <ToolbarLeftSlim />
                 <BarBottomMenu />
                 </div>
            </div>
        </div>
    )
}

export { PostIndividual }