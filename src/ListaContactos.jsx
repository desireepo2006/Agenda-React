import PropTypes from 'prop-types';

function ListaContactos({ contactos }) {
  if (contactos.length === 0) {
    return <p style={{ color: 'var(--gris-texto)', textAlign: 'center' }}>No hay contactos aún.</p>;
  }

  return (
    <ul className="bento-lista">
      {contactos.map((contacto, index) => {
        // Generamos la inicial de manera limpia
        const inicial = contacto.nombre ? contacto.nombre.charAt(0).toUpperCase() : '👤';
        
        return (
          <li key={index} className="bento-contacto-item" style={{ animationDelay: `${index * 0.05}s` }}>
            <div className="contacto-inicial">
              {inicial}
            </div>
            <div className="contacto-info">
              <span className="contacto-nombre">{contacto.nombre} {contacto.apellido}</span>
              <span className="contacto-telefono">📱 {contacto.telefono}</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

ListaContactos.propTypes = {
  contactos: PropTypes.arrayOf(
    PropTypes.shape({
      nombre: PropTypes.string,
      apellido: PropTypes.string,
      telefono: PropTypes.string,
    })
  ).isRequired,
};

export default ListaContactos;