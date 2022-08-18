import "./settingsDataAccess.css"

function SettingsDataAccess() {

    const Local = localStorage.getItem("forpride");
    const user = JSON.parse(Local)

    return (
        <div className="settingsDataAccess">
            <form action="">
                <input type="email" value={user.email} placeholder="E-mail"/>
                <input type="phone" value={user.phone} placeholder="Telefone"/>
                <select value={user.type} onChange={""}>
                                <option value="">Tipo de conta</option>
                                <option value="Homem">Homem </option>
                                <option value="Mulher">Mulher</option>
                                <option value="Casal">Casal</option>
                                <option value="Trisal">Trisal</option>
                                <option value="Transex">Transex</option>
                                <option value="Travestis">Travestis</option>
                            </select>
                <button>Atualizar</button>
            </form>
            <form action="">
                <input type="password" placeholder="Senha atual"/>
                <input type="password" placeholder="Nova Senha"/>
                <input type="password" placeholder="Confirmar Nova Senha"/>
                <button>Alterar senha</button>
            </form>
        </div>
    )
}

export { SettingsDataAccess }