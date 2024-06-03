import { Link } from "react-router-dom"

export const Blank = () => {
    return (
        <main
            className="flex-1 flex items-center justify-center text-rotion-400"
        >
            Selecione ou crie um ducumento
            
            <Link to={"/document"}>
                Acessar documento
            </Link>
        </main>
    )
}
