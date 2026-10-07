function Nosotros() {
  return (
    <div>
    <main>
      <section className="hero">
        <h1>Nosotros</h1>
        <p> Conoce mas sobre KiwiExpress y su equipo de desarrollo. </p>
      </section>
      
      <section className="hero">
        <div className="text-start">
          <h2> ¿Qué es KiwiExpress?</h2>
          <p> KiwiExpress es una empresa fundada en agosto de 2026 con el propósito de brindar servicios de paquetería, envío y seguimiento cómodos, rápidos y efectivos. </p>
          <p> Nuestro objetivo es facilitar la experiencia de nuestros clientes mediante una interfaz sencilla e intuitiva que incluye un sistema de seguimiento con entrega de información constante. </p>
          <p> Además, contamos con herramientas de gestión diseñadas para que administradores y repartidores puedan realizar sus tareas de manera organizada.</p>
        </div>

        <div className="mt-5 text-start">
          <h2> Nuestra misión </h2>
          <p> Queremos simplificar los procesos de envío y recepción de paquetes, ofreciendo una plataforma accesible que permita a nuestros clientes solicitar envíos, contactarse con nosotros y hacer seguimiento de sus paquetes de forma clara. </p>
          <p> Buscamos ofrecer un servicio confiable, transparente y eficiente. </p>
        </div>

        <div className="mt-5 text-start">
          <h2> Nuestro trayecto </h2>
          <iframe className="ratio ratio-16x9 minimumIframe" src="https://www.youtube.com/embed/kKnlROxBHi8?si=kpkYzJu9-8a-01kh" title="KiwiExpressExample-Test" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          <p>(Video de referencia, no corresponde al video oficial de KiwiExpress.)</p>

        </div>

        <div className="mt-5 text-start">
          <h2> Equipo de desarrollo</h2>
          <p> Nuestro equipo está conformado por 3 integrantes, involucrados en el desarrollo de los apartados funcionales, la documentación y el diseño de la página desde sus primeras etapas.</p>
          <p>Tomás Aliaga - Desarrollo · Documentación · Integración </p>
          <p>Ignacio Martínez - Desarrollo · Documentación · Responsividad </p>
          <p>Lino Requena - Gestión · Desarrollo · Diseño general · Integración </p>
        </div>
      </section>
  </main>
    </div>
  )
}

export default Nosotros;
