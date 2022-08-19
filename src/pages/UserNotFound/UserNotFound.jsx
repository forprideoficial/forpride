import { BarBottomMenu } from "../../components/BarBottomMenu/BarBottomMenu";
import { ToolbarLeftSlim } from "../../components/ToolBarLeftSlim/ToolbarLeftSlim";
import { TopBar } from "../../components/TopBar/TopBar";
// import "./userNotFound.css"

function UserNotFound() {
    const profile = "https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240"
    return (
        <div className="UserNotFound">
            <TopBar />
            <div className="user">
                <div className="top">
                <img src={profile} alt="Profile image" />
                <h3>Usuário Não Encontrado</h3>
                </div>
                <h4>Este usuário não está mais em nossa base de dados ou não possúi um cadastro completo.</h4>

                <a href="/feed">Voltar ao Feed</a>
            </div>
            <ToolbarLeftSlim />
            <BarBottomMenu />
        </div>
    )
}

export {UserNotFound}