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
    const [loading, setLoading] = useState(false);

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); 
        setLoading(true);
        try{
            await onSubmit(form);
        }finally{
            setLoading(false);
        }
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
                    <label style={{float: "left", marginRight: "10px"}} htmlFor={campo} className="form-label">
                        {getLabelForInput(campo)}
                    </label>
                    <p style={{color: "red", margin: "0px", padding: "0px", float: "left", width: "20px"}}>*</p>
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
                <button type="submit" className="btn btn-success" disabled={loading}>
                    {loading ? <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span></> : ("Cadastrar")}
                </button>
            </div>
        </form>
    )
}

export default RegistroHospede;