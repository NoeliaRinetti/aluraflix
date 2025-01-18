import React, { useState } from 'react';
import './Modal.css';

const Modal = ({ video, onSave, onClose }) => {
  const [editedVideo, setEditedVideo] = useState(video);
  const [categoria, setCategoria] = useState(video.categoria || '');
  const [imagen, setImagen] = useState(video.imagen || '');
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedVideo({ ...editedVideo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación
    const errors = {};
    if (!editedVideo.titulo) errors.titulo = 'El título es obligatorio';
    if (!editedVideo.videoUrl) errors.videoUrl = 'La URL del video es obligatoria';
    if (!editedVideo.descripcion) errors.descripcion = 'La descripción es obligatoria';
    if (!categoria) errors.categoria = 'La categoría es obligatoria';
    if (!imagen) errors.imagen = 'La URL de la imagen es obligatoria';

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      onSave({ ...editedVideo, categoria, imagen });
    }
  };

  const handleClear = () => {
    setEditedVideo({ titulo: '', videoUrl: '', descripcion: '' });
    setCategoria('');
    setImagen('');
    setFormErrors({});
  };

  return (
    <div className="modal">
      <div className="modal__content">
        <button className="modal__close" onClick={onClose} alt= "cerrar ventana de edición">
          ✖
        </button>
        <h2>EDITAR CARD:</h2>
        <form onSubmit={handleSubmit} className="modal__form">
          <label>
            Título:
            <input
              type="text"
              name="titulo"
              value={editedVideo.titulo}
              onChange={handleChange}
              placeholder={formErrors.titulo || "Título"}
            />
          </label>
          <label>
            URL del Video:
            <input
              type="text"
              name="videoUrl"
              value={editedVideo.videoUrl}
              onChange={handleChange}
              placeholder={formErrors.videoUrl || "URL del Video"}
            />
          </label>
          <label>
            Descripción:
            <textarea
              name="descripcion"
              value={editedVideo.descripcion}
              onChange={handleChange}
              placeholder={formErrors.descripcion || "Descripción"}
            ></textarea>
          </label>
          <label>
            Categoría:
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="">Selecciona una categoría</option>
              <option value="frontend">Front End</option>
              <option value="backend">Back End</option>
              <option value="innovacion">Innovación y Gestión</option>
            </select>
            {formErrors.categoria && <span className="error">{formErrors.categoria}</span>}
          </label>
          <label>
            URL de la Imagen:
            <input
              type="text"
              value={imagen}
              onChange={(e) => setImagen(e.target.value)}
              placeholder={formErrors.imagen || "URL de la Imagen"}
            />
          </label>
          <div className="modal__buttons">
            <button type="submit" className="btn btn--guardar" alt= "guardar cambios">
              Guardar
            </button>
            <button
              type="button"
              className="btn btn--cancelar"
              onClick={handleClear}
              alt= "limpiar campos"
            >
              Limpiar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;

