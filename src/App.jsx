import { useState, useEffect } from 'react';
import ListaContactos from './ListaContactos';
import AgregarContacto from './AgregarContacto';
import './Bento.css';

function Agenda() {
  const [contactos, setContactos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const obtenerContactos = async () => {
    try {
      setCargando(true);
      const respuesta = await fetch('http://www.raydelto.org/agenda.php');
      
      if (!respuesta.ok) {
        throw new Error('No se pudo obtener la información.');
      }
      
      const datos = await respuesta.json();
      setContactos(datos);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerContactos();
  }, []);

  return (
    <div className="bento-contenedor">
      {/* Caja 1: Título de la Aplicación */}
      <header className="bento-tarjeta bento-cabecera">
        <h1>Bento Agenda</h1>
        <p style={{ color: 'var(--gris-texto)', margin: 0 }}>Desiree 2025-1082</p>
      </header>

      {/* Caja 2: Tarjeta de Estadísticas (Acento Dorado) */}
      <div className="bento-tarjeta bento-stats">
        <span className="numero">{contactos.length}</span>
        <p style={{ margin: '5px 0 0 0', color: 'var(--gris-texto)', fontSize: '0.9rem', fontWeight: 'bold' }}>
          CONTACTOS TOTALES
        </p>
      </div>

      {/* Caja 3: Formulario para Agregar Contactos */}
      <div className="bento-tarjeta bento-formulario-seccion">
        <AgregarContacto alAgregarExitoso={obtenerContactos} />
      </div>

      {/* Caja 4: Listado de Contactos */}
      <div className="bento-tarjeta bento-lista-seccion">
        <h2 style={{ borderBottom: '1px solid var(--azul-borde)', paddingBottom: '10px', marginTop: 0, color: 'var(--turquesa)' }}>
          Contactos Guardados
        </h2>
        {cargando && <p style={{ color: 'var(--gris-texto)' }}>Cargando contactos...</p>}
        {error && (
          <div className="bento-status-msg error">
            <p>{error}</p>
            <button onClick={obtenerContactos} className="bento-btn" style={{ padding: '8px', fontSize: '0.8rem' }}>
              Reintentar
            </button>
          </div>
        )}
        {!cargando && !error && (
          <ListaContactos contactos={contactos} />
        )}
      </div>
    </div>
  );
}

export default Agenda;