import { useState } from "react";
import InputMask from "react-input-mask";

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

        if (campo === "senha") return "password";
        if (campo === "confirmarSenha") return "password";
        if (campo === "dt_nascimento") return "date";

        return "text";
    };


    const getLabelForInput = (campo: string) => {

        switch (campo) {
            case "cpf":
                return "CPF";
            case "nome":
                return "Nome completo";
            case "email":
                return "E-mail";
            case "senha":
                return "Senha";
            case "confirmarSenha":
                return "Confirmar senha";
            case "dt_nascimento":
                return "Data de nascimento";
            default:
                return campo;
        }
    }

    const campos: (keyof FormData)[] = ["cpf", "nome", "email", "senha", "confirmarSenha", "dt_nascimento"];


    return (
        <form onSubmit={handleSubmit}>
            {campos.map((campo) => (
                <div className="mb-3" key={campo}>
                    <label htmlFor={campo} className="form-label">
                        {getLabelForInput(campo)}
                    </label>
                    {campo === "cpf" ?
                        <InputMask
                            mask={"999.999.999-99"}
                            value={form[campo]}
                            name={campo}
                            id={campo}
                            className="form-control"
                            type={getInpuType(campo)}
                            onChange={handlerChangeInput}
                            placeholder="000.000.000-00"
                        >
                        </InputMask>
                        :
                        <input
                            type={getInpuType(campo)}
                            className="form-control"
                            id={campo}
                            name={campo}
                            placeholder={getLabelForInput(campo)}
                            value={form[campo]}
                            onChange={handlerChangeInput}
                        />}
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