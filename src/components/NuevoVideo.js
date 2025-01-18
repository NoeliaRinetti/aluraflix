import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './NuevoVideo.css';

const NuevoVideo = ({ URL }) => {
  const [titulo, setTitulo] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('frontend');
  const [imagen, setImagen] = useState('');
  
  const [errores, setErrores] = useState({});
  const navigate = useNavigate();

  // Función para validar el formulario
  const validarFormulario = () => {
    const erroresTemp = {};
    let formularioValido = true;

    if (!titulo.trim()) {
      erroresTemp.titulo = 'El título es obligatorio';
      formularioValido = false;
    }
    if (!videoUrl.trim()) {
      erroresTemp.videoUrl = 'El enlace del video es obligatorio';
      formularioValido = false;
    } else if (!/^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/.+$/.test(videoUrl)) {
      erroresTemp.videoUrl = 'El enlace debe ser un video de YouTube';
      formularioValido = false;
    }
    if (!descripcion.trim()) {
      erroresTemp.descripcion = 'La descripción es obligatoria';
      formularioValido = false;
    }
    if (!imagen.trim()) {
      erroresTemp.imagen = 'El enlace de la imagen es obligatorio';
      formularioValido = false;
    }

    setErrores(erroresTemp);
    return formularioValido;
  };

 
  const limpiarCampos = () => {
    setTitulo('');
    setVideoUrl('');
    setDescripcion('');
    setCategoria('frontend');
    setImagen('');
    setErrores({});
  };


  const handleGuardar = async (e) => {
    e.preventDefault();

    if (validarFormulario()) {
      const nuevoVideo = {
        id: Date.now().toString(),
        titulo,
        categoria,
        descripcion,
        videoUrl,
        imagen,
      };

      try {
        await fetch(URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(nuevoVideo),
        });
        limpiarCampos();
        navigate('/');
      } catch (error) {
        console.error('Error al guardar el video:', error);
      }
    }
  };

  useEffect(() => {
    document.body.classList.add('hide-banner');
    return () => {
      document.body.classList.remove('hide-banner');
    };
  }, []);

  return (
    <div className="nuevo-video">
      <h2>Agregar Nuevo Video</h2>
      <form onSubmit={handleGuardar} className="nuevo-video__form">
        <label>
          Título del Video:
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder={errores.titulo || '¿Cuál es el título de este video?'}
            className={errores.titulo ? 'error' : ''}
          />
        </label>
        <label>
          URL del Video:
          <input
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder={errores.videoUrl || 'Ingrese el enlace del video'}
            className={errores.videoUrl ? 'error' : ''}
          />
        </label>
        <label>
          Descripción:
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder={errores.descripcion || '¿De qué se trata este video?'}
            className={errores.descripcion ? 'error' : ''}
          />
        </label>
        <label>
          Categoría (seleccione una categoría):
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="innovacion">Innovación y Gestión</option>
          </select>
        </label>
        <label>
          URL de la Imagen:
          <input
            type="text"
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
            placeholder={errores.imagen || 'Ingrese el enlace de la imagen'}
            className={errores.imagen ? 'error' : ''}
          />
        </label>
        <div className="nuevo-video__botones">
          <button type="submit" className="btn btn--guardar">Guardar</button>
          <button type="button" className="btn btn--limpiar" onClick={limpiarCampos}>Limpiar</button>
        </div>
      </form>
    </div>
  );
};

export default NuevoVideo;
