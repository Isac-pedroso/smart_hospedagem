import type React from "react";
import { useState } from "react";
import InputMask from "react-input-mask";

interface Props {
    onSubmit: (data: any) => void;
}

interface FormData {
    cnpj: string,
    nome_fantasia: string,
    razao_social: string,
    nome_responsavel: string,
    senha: string,
    confirmarSenha: string
}

const RegistroPousada = ({ onSubmit }: Props) => {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState<FormData>({
        cnpj: "",
        nome_fantasia: "",
        razao_social: "",
        nome_responsavel: "",
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
        try {
            await onSubmit(form);
        } finally {
            setLoading(false);
        }
    }

    const getContentInput = (campo: string) => {

        if (campo == "nome_fantasia") return { type: "text", label: "Nome fantasia" };
        if (campo == "razao_social") return { type: "text", label: "Razão social" };
        if (campo == "nome_responsavel") return { type: "text", label: "Nome responsavel" };
        if (campo == "senha") return { type: "password", label: "Senha" };
        if (campo == "confirmarSenha") return { type: "password", label: "Confirmar senha" };

        return { type: campo, label: campo };
    }

    const campos: (keyof FormData)[] = ["cnpj", "nome_fantasia", "razao_social", "nome_responsavel", "senha", "confirmarSenha"];

    return (
        <>
            <form onSubmit={handleSubmit}>
                {campos.map((campo) => (
                    <div className="mb-3" key={campo}>
                        <label style={{ float: "left", marginRight: "10px" }} htmlFor={campo} className="form-label">
                            {getContentInput(campo)?.label}
                        </label>
                        <p style={{ color: "red", margin: "0px", padding: "0px", float: "left", width: "20px" }}>*</p>
                        {campo === "cnpj" ?
                            <InputMask
                                mask={"99.999.999/9999-99"}
                                value={form[campo]}
                                name={campo}
                                id={campo}
                                className="form-control"
                                type={getContentInput(campo)?.type}
                                onChange={handlerChangeInput}
                                placeholder="00.000.000/0000-00"
                            >
                            </InputMask>
                            :
                            <input
                                type={getContentInput(campo)?.type}
                                className="form-control"
                                id={campo}
                                name={campo}
                                placeholder={getContentInput(campo)?.label}
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
        </>
    )
}

export default RegistroPousada;