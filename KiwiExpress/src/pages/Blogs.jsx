import kiwi from "../assets/images/Kiwi.jpg";
import paquete from "../assets/images/Paquete.jpeg";
import {useState} from "react";
import { Link } from 'react-router-dom'
import { Nav } from 'react-bootstrap';
function Blogs() {
    const [respuesta, setRespuesta] = useState("");
    const [respuesta2, setRespuesta2] = useState("");
    const mensajeGracias = "¡Gracias por tu respuesta!"
    return (
    <div>
    <main className="flex-grow-1 w-100"> {/*--Necesario para abarcar todo el espacio vertical disponible de el flexbox del body y w-100 usa el 100% del width-->*/}
        <section className="hero">
          <h1>Blogs</h1>
          <p> Actualizaciones y novedades.</p>
        </section>

      <section>
        <div className="accordion" id="blogAccordion">
          <div className="accordion-item">
              <h2 className="accordion-header"/>

              <button
                  className="accordion-button collapsed"
                  type="button"

                  data-bs-toggle="collapse"
                  data-bs-target="#blog1"
              >
              
              <img src={kiwi} alt="Kiwi" width="200" height="70" className="rounded me-3"/>

                  <span className="tituloBlog">Lanzamiento de la Pagina!</span> {/*--Texto visible para clickear.*/}
              </button>
          </div>
          
          <div id="blog1" className="accordion-collapse collapse">
              <div className="accordion-body">
                  <article>
                      <header> {/* Se definen expresamente el titulo del articulo, quien lo escribió y cuando.-->*/}
                        <h3>Se lanza la primera versión de KiwiExpress </h3>
                          <p className="byline">Por <span className="author"> Equipo de Administración </span></p>
                          <p className="publish-date">Publicado: <time dateTime="2026-08-28"> 28 de Agosto, 2026 </time> </p>
                      </header>
                      {/* Parrafo introductorio--> */}
                      <p className="lead"> Nuestra Propuesta - Todo lo que necesitas para tus envíos, en un solo lugar.  </p>

                      <p> El objetivo de este espacio es comunicar información respecto a la página, nuestras sucursales, los envíos y los posibles cambios que estos podrían tener. </p>
                      <p> Este apartado será actualizado con frecuencia y será el principal medio de comunicación global con nuestros clientes.<br/> ¡Esperamos que KiwiExpress sea de su agrado! </p>

                    

                      <p> ¿Te fue de utilidad esta información? </p>
                      {/*Los botones ahora cambian el estado de respuesta. */}
                      <button className="btn btn-outline-secondary btn-sm me-1" onClick={() => setRespuesta(mensajeGracias)} >Sí</button>
                      <button className="btn btn-outline-secondary btn-sm " onClick={() => setRespuesta(mensajeGracias)} >No</button>
                        {respuesta && ( <p className="mt-3 text-muted">{respuesta} </p>)}

                  </article>
              </div>   
          </div>

          <div className="accordion-item mt-4">
              <h2 className="accordion-header"/>

              <button
                  className="accordion-button collapsed"
                  type="button"

                  data-bs-toggle="collapse"
                  data-bs-target="#blog2"
              >
              
              <img src={paquete} alt="Paquete" width="200" height="70" className="rounded me-3"/>

                  <span className="tituloBlog">¿Cómo funcionan los Servicios?</span> {/* Texto visible para clickear. */}
              </button>
          </div>

          <div id="blog2" className="accordion-collapse collapse">
                <div className="accordion-body">
                    <article>
                        <header> {/* Se definen expresamente el titulo del articulo, quien lo escribió y cuando.*/}
                          <h3>Funcionalidades de la Página </h3>
                            <p className="byline">Por <span className="author"> Equipo de Administración </span></p>
                            <p className="publish-date">Publicado: <time dateTime="2026-09-02"> 02 de Septiembre, 2026 </time> </p>
                        </header>
                        {/* Parrafo introductorio */}
                        <p className="lead"> Explora los distintos servicios que KiwiExpress ofrece.  </p>

                        <p> KiwiExpress cuenta con una variedad de acciones que se pueden realizar tanto de forma anónima como con una sesión iniciada. </p>
                        <p> Dentro de las acciones que se pueden realizar sin necesidad de una cuenta existen: 
                        <br/> - La opción de revisar los blogs. (Aquí!) 
                        <br/> - Ingresar a la página nosotros.
                        <br/> - Realizar un seguimiento de algún envío con su respectivo código.
                        <br/> - La posibilidad de crear una cuenta de cliente. <br/>
                        Dichas acciones se encuentran disponibles en la barra de navegación en la esquina superior derecha.
                        </p>

                        <p> Para poder solicitar un envío, proporcionar detalles de destinatario y generar un código de envío se requiere una cuenta en la página, la cual puede ser creada <u> <Nav.Link as={Link} to="/registro" className="d-inline p-0 text-primary">aqui</Nav.Link> </u> </p>
                        
                        <p> ¿Te fue de utilidad esta información? </p>
                        <button className="btn btn-outline-secondary btn-sm me-1" onClick={() => setRespuesta2(mensajeGracias)}>Sí</button>
                        <button className="btn btn-outline-secondary btn-sm" onClick={() => setRespuesta2(mensajeGracias)}>No</button>
                        {respuesta2 && ( <p className="mt-3 text-muted">{respuesta2} </p>)}
                    </article>
                </div>   
          </div>
        </div>

      </section>
  </main>
    </div >
  )
}

export default Blogs;
