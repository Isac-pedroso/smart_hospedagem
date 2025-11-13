import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/home.css'
import { useEffect, useState } from 'react';
import { useModal } from '../../componentes/modal/ModalContext';
import { useNavigate } from 'react-router-dom';
import { AlertModal } from '../../componentes/modal/modals/modalsPadrao/AlertModal';
import { listarPousadas } from '../../services/pousadaService';



function Home() {
  interface Pousada{
    id: number | null,
    cnpj: string | null,
    nome_fantasia: string,
    razao_social: string | null,
    nome_responsavel: string | null
  }

  const [loading, setLoading] = useState<boolean>(false);
  const [pousadas, setPousadas] = useState<Pousada[]>([]);
  const { showModal } = useModal();
  const { hideModal } = useModal();
  const navigate = useNavigate();

  useEffect(() => {
    handleListarPousadas();
  }, []);

  const handleListarPousadas = async () => {

    const response = await listarPousadas();

    if (!response.success) {
      showModal(AlertModal, {
          titulo: "Mensagem sistema",
          mensagem: response.message,
          onConfirm: hideModal
        }
      )
      return false;
    }

    setPousadas(response.data);
  }

  return (
    <>
      {/* HERO */}
      <section className="hero d-flex align-items-center">
        <div className="hero-content text-center">
          <h1>Conecte-se à Natureza</h1>
          <p style={{color: "white"}}>Descubra as pousadas mais encantadoras do Brasil 🌺</p>
          <a href="#pousadas" className="btn btn-vermais">
            Ver Pousadas
          </a>
        </div>
      </section>

      {/* POUSADAS */}
      <section id="pousadas" className="pousadas container">
        <div className="text-center mb-5">
          <h2 className="fw-bold text-success">Nossas Pousadas</h2>
          <p className="text-muted">
            Hospede-se em locais paradisíacos e sinta o conforto da natureza.
          </p>
        </div>

        <div className="row g-4">

          {pousadas.map((pousada) => (
            <div className="col-md-4" key={pousada.id}>
              <div className="card">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                  className="card-img-top"
                  alt={pousada.nome_fantasia}
                />
                <div className="card-body">
                  <h5 className="card-title text-success">{pousada.nome_fantasia}</h5>
                  <p className="card-text">
                    Entre montanhas e trilhas, perfeita para relaxar e recarregar as energias.
                  </p>
                  <button className="btn btn-vermais" onClick={() => navigate(`/detalhesPousada/${pousada.id}`)}>Reservar</button>
                </div>
              </div>
            </div>
          ))}
          {/* Card 1 */}
          <div className="col-md-4">
            <div className="card">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                className="card-img-top"
                alt="Pousada das Palmeiras"
              />
              <div className="card-body">
                <h5 className="card-title text-success">Pousada das Palmeiras</h5>
                <p className="card-text">
                  Entre montanhas e trilhas, perfeita para relaxar e recarregar as energias.
                </p>
                <button className="btn btn-vermais">Reservar</button>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="col-md-4">
            <div className="card">
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
                className="card-img-top"
                alt="Pousada do Lago Verde"
              />
              <div className="card-body">
                <h5 className="card-title text-success">Pousada do Lago Verde</h5>
                <p className="card-text">
                  Vista deslumbrante e chalés aconchegantes rodeados por natureza viva.
                </p>
                <button className="btn btn-vermais">Reservar</button>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="col-md-4">
            <div className="card">
              <img
                src="https://images.unsplash.com/photo-1551888419-7f83d63db87d?auto=format&fit=crop&w=800&q=80"
                className="card-img-top"
                alt="Pousada Encanto da Serra"
              />
              <div className="card-body">
                <h5 className="card-title text-success">Pousada Encanto da Serra</h5>
                <p className="card-text">
                  Um refúgio natural para quem busca tranquilidade e um belo nascer do sol.
                </p>
                <button className="btn btn-vermais">Reservar</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="sobre">
        <div className="container text-center">
          <h2>Sobre a Smart Hospedagem</h2>
          <p className="mt-3">
            Nosso sistema conecta viajantes com as melhores pousadas do Brasil, promovendo experiências únicas, sustentáveis e em harmonia com a natureza.
          </p>
        </div>
      </section>
    </>
  )
}

export default Home
