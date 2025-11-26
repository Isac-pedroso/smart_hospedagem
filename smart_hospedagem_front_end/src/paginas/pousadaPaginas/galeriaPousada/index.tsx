import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./estiloGaleriaPousada.css";

// Tipo para cada foto na galeria
interface Foto {
    id: number;
    descricao: string;
    caminhoFoto: string;
}

const GaleriaPousada = () => {
    const [descricao, setDescricao] = useState<string>('');
    const [foto, setFoto] = useState<File | null>(null);
    const [galeria, setGaleria] = useState<Foto[]>([
        {
            id: 1,
            descricao: 'Imagem 1 - Vista do mar',
            caminhoFoto: 'https://via.placeholder.com/150/0000FF/808080?Text=Foto1',
        },
        {
            id: 2,
            descricao: 'Imagem 2 - Vista da piscina',
            caminhoFoto: 'https://via.placeholder.com/150/FF0000/FFFFFF?Text=Foto2',
        },
        {
            id: 3,
            descricao: 'Imagem 3 - Quarto da pousada',
            caminhoFoto: 'https://via.placeholder.com/150/FFFF00/000000?Text=Foto3',
        }
    ]);

    // Função para lidar com a mudança no campo de descrição
    const handleDescricaoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescricao(e.target.value);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFoto(e.target.files[0]);
        } else {
            setFoto(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Valida se a descrição e a foto estão preenchidos
        if (descricao && foto) {
            const newFoto = {
                id: galeria.length + 1,
                descricao,
                caminhoFoto: URL.createObjectURL(foto),
            };

            setGaleria([...galeria, newFoto]);
            setDescricao('');
            setFoto(null); 
        } else {
            alert('Por favor, preencha todos os campos!');
        }
    };

    return (
        <div className="container my-5">
            {/* Formulário de Cadastro de Foto */}
            <h2>Gerenciamento de Galeria de Fotos</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="descricao" className="form-label">Descrição da Foto</label>
                    <input
                        type="text"
                        className="form-control"
                        id="descricao"
                        value={descricao}
                        onChange={handleDescricaoChange}
                        placeholder="Digite uma descrição para a foto"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="foto" className="form-label">Selecione uma Foto</label>
                    <input
                        type="file"
                        className="form-control"
                        id="foto"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3">Cadastrar Foto</button>
            </form>

            {/* Tabela de Galeria de Fotos */}
            <h3 className="mt-5">Fotos Cadastradas</h3>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Descrição</th>
                        <th>Foto</th>
                    </tr>
                </thead>
                <tbody>
                    {galeria.length > 0 ? (
                        galeria.map((foto) => (
                            <tr key={foto.id}>
                                <td>{foto.id}</td>
                                <td>{foto.descricao}</td>
                                <td>
                                    <img src={foto.caminhoFoto} alt={foto.descricao} />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center">Nenhuma foto cadastrada ainda.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default GaleriaPousada;
