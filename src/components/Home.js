import React, { useState, useEffect, useCallback } from 'react';
import SeccionCategoria from './SeccionCategoria';
import Modal from './Modal';
import './Home.css';



function Home({ URL }) {
  const [videos, setVideos] = useState({
    frontend: [],
    backend: [],
    innovacion: [],
  });
  const [isModalOpen, setModalOpen] = useState(false);
  const [videoToEdit, setVideoToEdit] = useState(null);



  const fetchVideos = useCallback(async () => {
    try {
      const response = await fetch(URL);
      const data = await response.json();
      const categorizedVideos = {
        frontend: data.filter((video) => video.categoria === 'frontend'),
        backend: data.filter((video) => video.categoria === 'backend'),
        innovacion: data.filter((video) => video.categoria === 'innovacion'),
      };
      setVideos(categorizedVideos);
    } catch (error) {
      console.error('Error al obtener los videos:', error);
    }
  }, [URL]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  function handleEdit(videoId) {
    const allVideos = [...videos.frontend, ...videos.backend, ...videos.innovacion];
    const video = allVideos.find((v) => v.id === videoId);
    if (video) {
      setVideoToEdit(video);
      setModalOpen(true);
    }
  }

  const handleDelete = async (videoId) => {
    try {
      await fetch(`${URL}/${videoId}`, { method: 'DELETE' });
      fetchVideos();
    } catch (error) {
      console.error('Error al borrar el video:', error);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setVideoToEdit(null);
  };

  const saveChanges = async (updatedVideo) => {
    try {
      await fetch(`${URL}/${updatedVideo.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedVideo),
      });
      fetchVideos();
      closeModal();
    } catch (error) {
      console.error('Error al actualizar el video:', error);
    }
  };

  return (
    <div className="home">
      <SeccionCategoria
        className="frontend"
        titulo="FRONT END"
        videos={videos.frontend}
        onEdit={handleEdit}
        onDelete={handleDelete} />
      <SeccionCategoria
        className="backend"
        titulo="BACK END"
        videos={videos.backend}
        onEdit={handleEdit}
        onDelete={handleDelete} />
      <SeccionCategoria
        className="innovacion"
        titulo="INNOVACIÓN Y GESTIÓN"
        videos={videos.innovacion}
        onEdit={handleEdit}
        onDelete={handleDelete} />
      {isModalOpen && (
        <Modal video={videoToEdit} onSave={saveChanges} onClose={closeModal} />
      )}
    </div>
  );
}

export default Home;
