import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/home.css'

function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero text-center d-flex align-items-center" style={{paddingTop: '200px'}}>
        <div className="container">
          <h1 className="display-4 fw-bold">Bem-vindo à Pousada Paraíso Natural</h1>
          <p className="lead">
            Um lugar onde o conforto encontra a natureza deslumbrante.
          </p>
          <a href="#galeria" className="btn btn-success btn-lg mt-3">
            Explorar
          </a>
        </div>
      </section>

      {/* Galeria de fotos */}
      <main>
        <div className="container my-5" id="galeria">
          <div className="text-center mb-5">
            <h2 className="fw-bold text-success">Nossa Galeria</h2>
            <p className="text-muted">
              Um pouco da beleza que você vai encontrar aqui
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-4 col-sm-6">
              <div className="gallery-item">
                <img
                  src="https://picsum.photos/600/400?random=1"
                  className="img-fluid rounded shadow"
                  alt="Vista da pousada"
                />
              </div>
            </div>
            <div className="col-md-4 col-sm-6">
              <div className="gallery-item">
                <img
                  src="https://picsum.photos/600/400?random=2"
                  className="img-fluid rounded shadow"
                  alt="Quartos confortáveis"
                />
              </div>
            </div>
            <div className="col-md-4 col-sm-6">
              <div className="gallery-item">
                <img
                  src="https://picsum.photos/600/400?random=3"
                  className="img-fluid rounded shadow"
                  alt="Área da piscina"
                />
              </div>
            </div>
            <div className="col-md-4 col-sm-6">
              <div className="gallery-item">
                <img
                  src="https://picsum.photos/600/400?random=4"
                  className="img-fluid rounded shadow"
                  alt="Restaurante da pousada"
                />
              </div>
            </div>
            <div className="col-md-4 col-sm-6">
              <div className="gallery-item">
                <img
                  src="https://picsum.photos/600/400?random=5"
                  className="img-fluid rounded shadow"
                  alt="Natureza ao redor"
                />
              </div>
            </div>
            <div className="col-md-4 col-sm-6">
              <div className="gallery-item">
                <img
                  src="https://picsum.photos/600/400?random=6"
                  className="img-fluid rounded shadow"
                  alt="Trilha ecológica"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Seção Quartos */}
      <section className="bg-light py-5" id="quartos">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold text-primary">Nossos Quartos</h2>
            <p className="text-muted">
              Conforto e aconchego para tornar sua estadia inesquecível
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="card shadow border-0 h-100">
                <img
                  src="https://picsum.photos/600/400?random=11"
                  className="card-img-top"
                  alt="Quarto Standard"
                />
                <div className="card-body">
                  <h5 className="card-title">Quarto Standard</h5>
                  <p className="card-text">
                    Ideal para quem busca conforto com excelente custo-benefício.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow border-0 h-100">
                <img
                  src="https://picsum.photos/600/400?random=12"
                  className="card-img-top"
                  alt="Quarto Luxo"
                />
                <div className="card-body">
                  <h5 className="card-title">Quarto Luxo</h5>
                  <p className="card-text">
                    Espaçoso, elegante e com uma vista incrível para a natureza.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow border-0 h-100">
                <img
                  src="https://picsum.photos/600/400?random=13"
                  className="card-img-top"
                  alt="Suíte Master"
                />
                <div className="card-body">
                  <h5 className="card-title">Suíte Master</h5>
                  <p className="card-text">
                    Luxo completo: jacuzzi privativa, varanda e decoração
                    exclusiva.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Alerta sobre disponibilidade */}
          <div className="alert alert-info text-center mt-5 shadow-sm" role="alert">
            <h5 className="fw-bold">Quer saber mais?</h5>
            <p className="mb-2">
              Acesse nossa aba de <strong>Quartos Disponíveis</strong> para ver
              horários e reservas em tempo real.
            </p>
            <a href="/login" className="btn btn-outline-primary">
              Fazer login para acessar disponibilidade
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
