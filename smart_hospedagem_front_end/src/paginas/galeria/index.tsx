import React, { useEffect, useState } from "react";
import { Galeria } from "../../models/Galeria";

import GaleriaService from "../../services/GaleriaService";
import AxiosConfiguracao from "../../api/axiosConfig";
import { useAuth } from "../../contexts/AuthContext";


const GaleriaCrud: React.FC = () => {

  const { user } = useAuth();
  
  const api = new AxiosConfiguracao("http://localhost:8080");
  const galeriaService = new GaleriaService(api); 

  const [galerias, setGalerias] = useState<Galeria[]>([]);
  
  const [titulo, setTitulo] = useState<string | null>("");
  const [descricao, setDescricao] = useState<string | null>("");
  const [url, setUrl] = useState<string | null>("");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean | null>(false)

  useEffect(()=>{
    handleGetFotosUsuario();
  }, [])

  useEffect(()=>{
    handleGetFotosUsuario();
  }, [user])


  const handleSubmit = async () => {
    try{
      const usuario = user?.id;
      const galeria = new Galeria({id: null, usuario: usuario,titulo: titulo || "", descricao: descricao || "", url: url || ""})
      console.log(galeria);
      await galeriaService.cadastrar(galeria)
      
      await handleGetFotosUsuario();
      
      setTitulo("");
      setDescricao("");
      setUrl("");
    }catch(error){
      console.error(error)
      setError("Ocorreu um problema ao cadastrar esta foto para sua galeria!");
    }finally{
      setLoading(false);
    }
  }

  const handleGetFotosUsuario = async () => {
    try{
      if(!user?.id) return;

      const fotos = await galeriaService.listarPorUsuario(user.id);
      console.log(fotos);

      setGalerias(fotos);

      console.log(galerias)
    }catch(error){
      console.error(error);
      setError("Ocorreu um problema ao listar as foto para sua galeria!");
    }finally{
      setLoading(false);
    }
  }

  return (
    <>
      <div
            
            style={{
                background: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e') no-repeat center center/cover",
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}
        >
      {/* Container principal */}
        <div className="container py-5">
          {/* Cadastro */}
          <div className="row justify-content-center mb-5">
            <div className="col-md-8">
              <div className="card shadow-lg border-0 rounded-3">
                <div className="card-body p-4">
                  <h4 className="fw-bold text-success mb-4">Cadastrar Nova Imagem</h4>
                  
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Título</label>
                      <input
                        type="text"
                        name="titulo"
                        className="form-control"
                        placeholder="Ex: Vista da praia"
                        onChange={e => setTitulo(e.target.value)}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">Descrição</label>
                      <textarea
                        name="descricao"
                        className="form-control"
                        placeholder="Breve descrição da foto"
                        onChange={e => setDescricao(e.target.value)}
                        required
                      ></textarea>
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">URL da Imagem</label>
                      <input
                        type="url"
                        name="url"
                        className="form-control"
                        placeholder="https://exemplo.com/imagem.jpg"
                        onChange={e => setUrl(e.target.value)}
                        required
                      />
                    </div>

                    <div className="text-center">
                      <button type="submit" className="btn btn-success px-5" onClick={handleSubmit}>
                        Cadastrar
                      </button>
                    </div>
                </div>
              </div>
            </div>
          </div>

          {/* Galeria */}
          <div className="text-center mb-4">
            <h2 className="fw-bold text-success">Galeria de Fotos</h2>
            <p className="text-muted">Gerencie as imagens já cadastradas</p>
          </div>

          <div className="row g-4">
            {galerias.map((foto) => (
              <div className="col-md-4" key={foto.id}>
                <div className="card shadow-sm border-0 h-100">
                  <img
                    src={foto.url}
                    className="card-img-top"
                    alt={foto.titulo}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{foto.titulo}</h5>
                    <p className="card-text text-muted">{foto.descricao}</p>
                    <div className="d-flex justify-content-between">
                      <button className="btn btn-sm btn-outline-primary">
                        Editar
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {galerias.length === 0 && (
              <p className="text-center text-muted">Nenhuma foto cadastrada.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default GaleriaCrud;
