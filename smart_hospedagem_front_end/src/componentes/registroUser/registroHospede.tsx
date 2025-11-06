import { useState } from "react";


interface Props {
    onSubmit: (data: any) => void,
}

interface FormData {
    cpf: string,
    email: string
    nome: string,
    dt_nascimento: string,
    senha: string,
    confirmarSenha: string
}
const RegistroHospede = ({ onSubmit }: Props) => {
    const [form, setForm] = useState<FormData>({
        cpf: "",
        email: "",
        nome: "",
        dt_nascimento: "",
        senha: "",
        confirmarSenha: ""
    })

    const handlerChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setForm((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(form)
    }

    const getInpuType = (campo: string) => {
        
        if(campo === "senha") return "password";
        if(campo === "confirmarSenha") return "password";
        if(campo === "dt_nascimento") return "date";

        return "text";
    };


    const getLabelForInput = (campo: string) => {

        if(campo === "confirmarSenha") return "Confirmar senha";
        if(campo === "dt_nascimento") return "Data de nascimento";

        return campo;
    }

    const getInputPlaceHolder = (campo: string) => {
        
        if(campo === "confirmarSenha") return "Confirmar senha";
        if(campo === "dt_nascimento") return "Data de nascimento";

        return campo;
    }


    return (
        <form onSubmit={handleSubmit}>
            {["cpf", "nome", "email", "senha", "confirmarSenha", "dt_nascimento"].map((campo) => (
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        {getLabelForInput(campo)}
                    </label>
                    <input
                        type={getInpuType(campo)}
                        className="form-control"
                        id={campo}
                        name={campo}
                        placeholder={getInputPlaceHolder(campo)}
                        value={form[campo as keyof typeof form]}
                        onChange={handlerChangeInput}
                    />
                </div>
            ))}
            <div className="d-grid">
                <button type="submit" className="btn btn-success">
                    Cadastrar
                </button>
            </div>
        </form>
    )
}

export default RegistroHospede;