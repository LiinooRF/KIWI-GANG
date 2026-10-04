  function Header() {  
return (
  <header>
    <nav className="navbar navbar-expand-lg navbar-dark navbar-kiwi">
      <div className="container-fluid">
        <a className="navbar-brand" href="index.html">🥝 KiwiExpress</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuNavbar" aria-controls="menuNavbar" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="menuNavbar">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><a className="nav-link" href="index.html">Inicio</a></li>
            <li className="nav-item"><a className="nav-link" href="seguimiento.html">Seguimiento</a></li>
            <li className="nav-item"><a className="nav-link" href="envio.html">Solicitar envío</a></li>
            <li className="nav-item"><a className="nav-link" href="nosotros.html">Nosotros</a></li>
            <li className="nav-item"><a className="nav-link" href="blogs.html">Blogs</a></li>
            <li className="nav-item"><a className="nav-link" href="contacto.html">Contacto</a></li>
            <li className="nav-item"><a className="nav-link" href="login.html">Iniciar sesión</a></li>
            <li className="nav-item"><a className="nav-link" href="registro.html">Registro</a></li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
)
}
export default Header;