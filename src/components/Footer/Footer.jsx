import './footer.css'

function Footer() {

    const date = new Date()
    return (
        <div className="footer">
            <div className="copy">
           <p>{date.getFullYear()} &copy; Foursome. Todos os direitos reservados</p>
            </div>

            <div className="developer">
                <p> Feito por <b> <a href="https://www.codingit.com.br/" target="_blank" rel="noreferrer">Coding.It</a></b></p>
            </div>
        </div>
    )
    
}

export {Footer}


