import React, { useState } from "react";
import type { Galeria } from "../../models/Galeria";

function Galeria() {
  const [fotos, setFotos] = useState<Galeria[]>([]);

  const [novaFoto, setNovaFoto] = useState({
    titulo: "",
    descricao: "",
    url: "",
  });

  const handleChange = (e: any) => {
    setNovaFoto({ ...novaFoto, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    if (!novaFoto.titulo || !novaFoto.descricao || !novaFoto.url) return;

    const nova = { ...novaFoto, id: Date.now() };
    setFotos([...fotos, nova]);

    // reset
    setNovaFoto({ titulo: "", descricao: "", url: "" });
  };

  const handleDelete = (id: number | null) => {
    setFotos(fotos.filter((foto) => foto.id !== id));
  };

  return (
    <>

      {/* Container principal */}
      <div className="container py-5">
        {/* Cadastro */}
        <div className="row justify-content-center mb-5">
          <div className="col-md-8">
            <div className="card shadow-lg border-0 rounded-3">
              <div className="card-body p-4">
                <h4 className="fw-bold text-success mb-4">Cadastrar Nova Imagem</h4>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Título</label>
                    <input
                      type="text"
                      name="titulo"
                      className="form-control"
                      placeholder="Ex: Vista da praia"
                      value={novaFoto.titulo}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Descrição</label>
                    <textarea
                      name="descricao"
                      className="form-control"
                      rows="2"
                      placeholder="Breve descrição da foto"
                      value={novaFoto.descricao}
                      onChange={handleChange}
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
                      value={novaFoto.url}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="text-center">
                    <button type="submit" className="btn btn-success px-5">
                      Cadastrar
                    </button>
                  </div>
                </form>
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
          {fotos.map((foto) => (
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
                      onClick={() => handleDelete(foto.id)}
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {fotos.length === 0 && (
            <p className="text-center text-muted">Nenhuma foto cadastrada.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Galeria;
