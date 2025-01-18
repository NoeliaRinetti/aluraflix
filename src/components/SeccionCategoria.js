import React from 'react';
import './SeccionCategoria.css';
import IconoBorrar from '../assets/images/IconoBorrar.png'
import IconoEditar from '../assets/images/IconoEditar.png'

const SeccionCategoria = ({ className, titulo, videos, onEdit, onDelete }) => {
  const convertirUrlEmbed = (url) => {
    if (!url) {
      console.error("URL inválida o indefinida:", url);
      return ""; 
    }

    if (url.includes('embed')) return url;

    const videoId = url.split('v=')[1]?.split('&')[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };


  return (
    <section className={`categoria ${className}`}>
      <h2 className="categoria__titulo">{titulo}</h2>
      <div className="categoria__videos">
        {videos.map((video) => (
    <div key={video.id} className="categoria__video">
      <iframe
        src={convertirUrlEmbed(video.videoUrl)}
        title={video.titulo}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      
      <div className="categoria__botones">
              <button onClick={() => onEdit(video.id)} alt="editar video"className="btn btn--editar"><img src={IconoEditar} alt="Editar" className="btn__icon" />
          Editar
        </button>
              <button onClick={() => onDelete(video.id)} alt="borrar video" className="btn btn--borrar"><img src={IconoBorrar} alt="Borrar" className="btn__icon" /> 
          Borrar
        </button>
      </div>
    </div>
        ))}
      </div>
    </section>
  );
};

export default SeccionCategoria;
