import { useState } from 'react';
import PropTypes from 'prop-types';

function AgregarContacto({ alAgregarExitoso }) {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);
  const [mensajeExito, setMensajeExito] = useState(false);

  const manejarEnvio = async (e) => {
    e.preventDefault();
    if (!nombre.trim() || !apellido.trim() || !telefono.trim()) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    try {
      setGuardando(true);
      setError(null);
      setMensajeExito(false);

      const nuevoContacto = {
        nombre: nombre.trim(),
        apellido: apellido.trim(),
        telefono: telefono.trim()
      };

      const respuesta = await fetch('http://www.raydelto.org/agenda.php', {
        method: 'POST',
        body: JSON.stringify(nuevoContacto)
      });

      if (!respuesta.ok) {
        throw new Error('Error al registrar contacto.');
      }

      setNombre('');
      setApellido('');
      setTelefono('');
      setMensajeExito(true);

      if (alAgregarExitoso) {
        alAgregarExitoso();
      }

      setTimeout(() => setMensajeExito(false), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setGuardando(false);
    }
  };

  return (
    <form onSubmit={manejarEnvio} className="bento-form">
      <h2 style={{ marginTop: 0, color: 'var(--turquesa)', fontSize: '1.4rem' }}>Nuevo Contacto</h2>
      
      <div className="bento-input-group">
        <label>Nombre</label>
        <input
          type="text"
          className="bento-input"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          disabled={guardando}
          placeholder="Ej. Juan"
        />
      </div>

      <div className="bento-input-group">
        <label>Apellido</label>
        <input
          type="text"
          className="bento-input"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          disabled={guardando}
          placeholder="Ej. Pérez"
        />
      </div>

      <div className="bento-input-group">
        <label>Teléfono</label>
        <input
          type="text"
          className="bento-input"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          disabled={guardando}
          placeholder="Ej. 809-555-5555"
        />
      </div>

      {error && <div className="bento-status-msg error">{error}</div>}
      {mensajeExito && <div className="bento-status-msg exito">¡Contacto guardado!</div>}

      <button type="submit" disabled={guardando} className="bento-btn">
        {guardando ? 'Guardando...' : 'Añadir a la Agenda'}
      </button>
    </form>
  );
}

AgregarContacto.propTypes = {
  alAgregarExitoso: PropTypes.func
};

export default AgregarContacto;